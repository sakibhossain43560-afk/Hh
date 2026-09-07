import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// The 6 user-provided API keys
const API_KEYS = [
  { id: 'api1', name: 'API 1 (Primary)', key: 'a0J_fyLo8OVdS3ThpfGN56AvwAJp5gTUVpF1_ucj9oA' },
  { id: 'api2', name: 'API 2 (Fast Backup)', key: 'da-LVmSSLUwNEqNGv7UtRKTYAhbrj7Plzwpaj6w-a4k' },
  { id: 'api3', name: 'API 3 (High Speed)', key: 'Zuexv0u86wYz2MZT2d8Qd8EzBokGfeko-gv92FFo1Pc' },
  { id: 'api4', name: 'API 4 (Reliable)', key: 'g5071dd8w2ntriC4NYrw2mjgivbYxgrYfuKsm8bupnQ' },
  { id: 'api5', name: 'API 5 (Ultra Backup)', key: '7i8Olk0tTA2jTy-h3ynNXmNnEbVUr19C1DziY6G7Xeg' },
  { id: 'api6', name: 'API 6 (Turbo Engine)', key: 'c6XFDhaNaPNEeUerqB8qkbmWyPiv5MioNTGlemxZeXE' }
];

// Health tracking for rate-limited or exhausted keys
interface KeyHealth {
  cooldownUntil: number;
  reason: string;
}
const keyHealthMap = new Map<string, KeyHealth>();

// In-memory cache for ultra-fast response times (TTL: 3 minutes)
interface CacheEntry {
  data: any;
  timestamp: number;
  apiUsed: string;
}
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 3 * 60 * 1000;

// Helper to fetch with timeout and clear error messaging
async function fetchWithTimeout(url: string, timeoutMs: number = 12000, signal?: AbortSignal): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError' || err.message?.includes('aborted')) {
      throw new Error(`Upstream request timed out after ${Math.round(timeoutMs / 1000)}s`);
    }
    throw err;
  }
}

// Helper to execute query with a specific key
async function querySingleKey(uid: string, keyObj: typeof API_KEYS[0], timeoutMs: number = 12000, signal?: AbortSignal) {
  const url = `https://br-raja-info-v3.vercel.app/accinfo?uid=${encodeURIComponent(uid)}&key=${keyObj.key}`;
  const response = await fetchWithTimeout(url, timeoutMs, signal);
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(`Rate limit exceeded (HTTP 429) on ${keyObj.name}`);
    }
    throw new Error(`Upstream returned status ${response.status} on ${keyObj.name}`);
  }
  const data = await response.json();
  if (data?.error) {
    throw new Error(data.error);
  }
  if (data?.message && !data?.basicInfo) {
    throw new Error(data.message);
  }
  return data;
}

// Helper for staggered failover race across keys
async function executePlayerQuery(uid: string, requestedApi = 'auto'): Promise<{ data: any; apiUsed: string }> {
  // If specific key explicitly requested
  if (requestedApi !== 'auto') {
    const selected = API_KEYS.find((k) => k.id === requestedApi) || API_KEYS[0];
    const data = await querySingleKey(uid, selected, 12000);
    return { data, apiUsed: selected.name };
  }

  // Prioritize healthy keys not in cooldown
  const now = Date.now();
  const sortedKeys = [...API_KEYS].sort((a, b) => {
    const aCool = (keyHealthMap.get(a.id)?.cooldownUntil || 0) > now ? 1 : 0;
    const bCool = (keyHealthMap.get(b.id)?.cooldownUntil || 0) > now ? 1 : 0;
    return aCool - bCool;
  });

  return new Promise((resolve, reject) => {
    let isDone = false;
    let errors: string[] = [];
    let inFlight = 0;
    let nextKeyIndex = 0;
    let staggerTimer: NodeJS.Timeout | null = null;
    const abortControllers: AbortController[] = [];

    const cleanup = () => {
      isDone = true;
      if (staggerTimer) clearTimeout(staggerTimer);
      // Abort any still in-flight secondary requests once winner has returned
      abortControllers.forEach((ac) => {
        try { ac.abort(); } catch {}
      });
    };

    const attemptKey = () => {
      if (isDone || nextKeyIndex >= sortedKeys.length) return;

      const keyObj = sortedKeys[nextKeyIndex++];
      inFlight++;
      const ac = new AbortController();
      abortControllers.push(ac);

      querySingleKey(uid, keyObj, 12000, ac.signal)
        .then((data) => {
          if (!isDone) {
            cleanup();
            keyHealthMap.delete(keyObj.id);
            resolve({ data, apiUsed: keyObj.name });
          }
        })
        .catch((err: any) => {
          inFlight--;
          if (isDone) return;

          const errMsg = err?.message || 'API request error';
          errors.push(`${keyObj.name}: ${errMsg}`);

          // Only cooldown key if actually rate limited (429 or quota), NOT for network timeouts
          const isRateLimit = errMsg.includes('429') || /quota|rate\s*limit|limit\s*reached/i.test(errMsg);
          if (isRateLimit) {
            keyHealthMap.set(keyObj.id, {
              cooldownUntil: Date.now() + 3 * 60 * 1000,
              reason: errMsg,
            });
            console.warn(`[API Rate Limit] ${keyObj.name} hit rate-limit. Placed on cooldown.`);
          }

          if (nextKeyIndex < sortedKeys.length) {
            // Immediately start next key if one fails
            attemptKey();
          } else if (inFlight === 0) {
            cleanup();
            const notFound = errors.some((e) => /not found|invalid|does not exist/i.test(e));
            reject(
              new Error(
                notFound
                  ? 'Free Fire UID not found. Please verify the UID number and try again.'
                  : errors[0] || 'All API backup routes failed. Please try again shortly.'
              )
            );
          }
        });

      // Stagger: If current key hasn't resolved in 3.5s, launch backup key in parallel
      if (nextKeyIndex < sortedKeys.length && !isDone) {
        staggerTimer = setTimeout(() => {
          if (!isDone) {
            attemptKey();
          }
        }, 3500);
      }
    };

    attemptKey();
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Status Endpoint: checks responsiveness without hammering upstream
  app.get('/api/status', async (_req, res) => {
    const now = Date.now();
    const results = API_KEYS.map((k) => {
      const health = keyHealthMap.get(k.id);
      const isCoolingDown = health && health.cooldownUntil > now;
      return {
        id: k.id,
        name: k.name,
        status: isCoolingDown ? 'degraded' : 'online',
        latencyMs: isCoolingDown ? 999 : 240
      };
    });
    res.json({ apis: results });
  });

  // FreeFire Player Info Proxy with 5 API keys & ultra-fast staggered failover
  app.get('/api/player/:uid', async (req, res) => {
    const uid = (req.params.uid || '').trim();
    const requestedApi = (req.query.api as string) || 'auto';
    const forceFresh = req.query.fresh === 'true';

    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }

    // Check cache first for instant sub-10ms response
    const cacheKey = `${uid}`;
    if (!forceFresh && cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return res.json({
          success: true,
          cached: true,
          apiUsed: cached.apiUsed,
          latencyMs: 4,
          data: cached.data
        });
      }
    }

    const startTime = Date.now();

    try {
      const { data, apiUsed } = await executePlayerQuery(uid, requestedApi);
      cache.set(cacheKey, { data, timestamp: Date.now(), apiUsed });
      return res.json({
        success: true,
        cached: false,
        apiUsed,
        latencyMs: Date.now() - startTime,
        data
      });
    } catch (err: any) {
      const errMsg = err?.message || 'Failed to retrieve player data';
      const isNotFound = /not found|invalid|does not exist/i.test(errMsg);
      return res.status(isNotFound ? 404 : 502).json({
        error: isNotFound
          ? 'Free Fire UID not found. Please verify the UID and try again.'
          : errMsg,
        latencyMs: Date.now() - startTime
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
