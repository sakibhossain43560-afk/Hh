import type { FreeFireAccountData, PlayerResponse } from '../types';

export const API_KEYS_LIST = [
  { id: 'api1', name: 'API 1 (Primary)', key: 'a0J_fyLo8OVdS3ThpfGN56AvwAJp5gTUVpF1_ucj9oA' },
  { id: 'api2', name: 'API 2 (Fast Backup)', key: 'da-LVmSSLUwNEqNGv7UtRKTYAhbrj7Plzwpaj6w-a4k' },
  { id: 'api3', name: 'API 3 (High Speed)', key: 'Zuexv0u86wYz2MZT2d8Qd8EzBokGfeko-gv92FFo1Pc' },
  { id: 'api4', name: 'API 4 (Reliable)', key: 'g5071dd8w2ntriC4NYrw2mjgivbYxgrYfuKsm8bupnQ' },
  { id: 'api5', name: 'API 5 (Ultra Backup)', key: '7i8Olk0tTA2jTy-h3ynNXmNnEbVUr19C1DziY6G7Xeg' },
  { id: 'api6', name: 'API 6 (Turbo Engine)', key: 'c6XFDhaNaPNEeUerqB8qkbmWyPiv5MioNTGlemxZeXE' }
];

// Helper to fetch with timeout
async function fetchWithTimeout(url: string, timeoutMs = 10000, signal?: AbortSignal): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  if (signal) {
    signal.addEventListener('abort', () => controller.abort());
  }

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json, text/plain, */*'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError' || err.message?.includes('aborted')) {
      throw new Error(`Request timed out after ${Math.round(timeoutMs / 1000)}s`);
    }
    throw err;
  }
}

// Single key query
async function querySingleKeyDirect(uid: string, keyObj: typeof API_KEYS_LIST[0], timeoutMs = 10000, signal?: AbortSignal) {
  const url = `https://br-raja-info-v3.vercel.app/accinfo?uid=${encodeURIComponent(uid)}&key=${keyObj.key}`;
  const response = await fetchWithTimeout(url, timeoutMs, signal);
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(`Rate limit exceeded on ${keyObj.name}`);
    }
    throw new Error(`Status ${response.status} on ${keyObj.name}`);
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

// Staggered race directly from client if server is static (e.g. Vercel static build without backend)
export async function executeDirectQueryFallback(uid: string): Promise<FreeFireAccountData> {
  return new Promise((resolve, reject) => {
    let isDone = false;
    const errors: string[] = [];
    let inFlight = 0;
    let nextKeyIndex = 0;
    let staggerTimer: any = null;
    const abortControllers: AbortController[] = [];

    const cleanup = () => {
      isDone = true;
      if (staggerTimer) clearTimeout(staggerTimer);
      abortControllers.forEach((ac) => {
        try { ac.abort(); } catch {}
      });
    };

    const attemptKey = () => {
      if (isDone || nextKeyIndex >= API_KEYS_LIST.length) return;

      const keyObj = API_KEYS_LIST[nextKeyIndex++];
      inFlight++;
      const ac = new AbortController();
      abortControllers.push(ac);

      querySingleKeyDirect(uid, keyObj, 10000, ac.signal)
        .then((data) => {
          if (!isDone) {
            cleanup();
            resolve(data as FreeFireAccountData);
          }
        })
        .catch((err: any) => {
          inFlight--;
          if (isDone) return;

          const errMsg = err?.message || 'API request error';
          errors.push(`${keyObj.name}: ${errMsg}`);

          if (nextKeyIndex < API_KEYS_LIST.length) {
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

      if (nextKeyIndex < API_KEYS_LIST.length && !isDone) {
        staggerTimer = setTimeout(() => {
          if (!isDone) {
            attemptKey();
          }
        }, 3000);
      }
    };

    attemptKey();
  });
}

// Unified search function: tries /api/player first, handles HTML/404 responses safely without crashing,
// and gracefully falls back to direct query.
export async function searchPlayerAccount(uid: string, isRefresh = false): Promise<FreeFireAccountData> {
  const cleanUid = uid.trim();
  if (!cleanUid) {
    throw new Error('Please enter a valid Free Fire UID.');
  }

  const queryParams = new URLSearchParams();
  queryParams.set('api', 'auto');
  if (isRefresh) {
    queryParams.set('fresh', 'true');
  }
  const queryString = `?${queryParams.toString()}`;

  let jsonResult: PlayerResponse | null = null;
  let isJsonSuccess = false;
  let serverErrorMessage: string | null = null;

  try {
    const response = await fetch(`/api/player/${encodeURIComponent(cleanUid)}${queryString}`);
    const contentType = response.headers.get('content-type') || '';

    // Check if the response is actually JSON before calling response.json()
    if (contentType.includes('application/json')) {
      jsonResult = await response.json();
      if (response.ok && jsonResult?.success && jsonResult?.data) {
        isJsonSuccess = true;
      } else if (jsonResult?.error) {
        serverErrorMessage = jsonResult.error;
      }
    } else {
      // Received HTML (like Vercel 404 "The page could not be found")
      console.warn('Backend returned non-JSON response (likely static Vercel host). Switching to direct client query.');
    }
  } catch (err: any) {
    console.warn('Server API call failed or timed out:', err?.message);
  }

  if (isJsonSuccess && jsonResult?.data) {
    return jsonResult.data;
  }

  // If server explicitly returned a user-facing error like "UID not found", respect it
  if (serverErrorMessage && /not found|invalid uid|does not exist/i.test(serverErrorMessage)) {
    throw new Error(serverErrorMessage);
  }

  // Otherwise, fallback seamlessly to direct upstream query using the 6 keys
  try {
    return await executeDirectQueryFallback(cleanUid);
  } catch (fallbackErr: any) {
    throw new Error(
      fallbackErr?.message ||
      serverErrorMessage ||
      'Player UID not found or server busy. Please verify the UID number.'
    );
  }
}
