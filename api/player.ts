const API_KEYS = [
  { id: 'api1', name: 'API 1 (Primary)', key: 'a0J_fyLo8OVdS3ThpfGN56AvwAJp5gTUVpF1_ucj9oA' },
  { id: 'api2', name: 'API 2 (Fast Backup)', key: 'da-LVmSSLUwNEqNGv7UtRKTYAhbrj7Plzwpaj6w-a4k' },
  { id: 'api3', name: 'API 3 (High Speed)', key: 'Zuexv0u86wYz2MZT2d8Qd8EzBokGfeko-gv92FFo1Pc' },
  { id: 'api4', name: 'API 4 (Reliable)', key: 'g5071dd8w2ntriC4NYrw2mjgivbYxgrYfuKsm8bupnQ' },
  { id: 'api5', name: 'API 5 (Ultra Backup)', key: '7i8Olk0tTA2jTy-h3ynNXmNnEbVUr19C1DziY6G7Xeg' },
  { id: 'api6', name: 'API 6 (Turbo Engine)', key: 'c6XFDhaNaPNEeUerqB8qkbmWyPiv5MioNTGlemxZeXE' }
];

async function fetchWithTimeout(url: string, timeoutMs = 12000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'application/json, text/plain, */*'
      }
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function queryKey(uid: string, keyObj: typeof API_KEYS[0]) {
  const url = `https://br-raja-info-v3.vercel.app/accinfo?uid=${encodeURIComponent(uid)}&key=${keyObj.key}`;
  const response = await fetchWithTimeout(url, 12000);
  if (!response.ok) {
    throw new Error(`Upstream returned ${response.status} on ${keyObj.name}`);
  }
  const data = await response.json();
  if (data?.error) throw new Error(data.error);
  if (data?.message && !data?.basicInfo) throw new Error(data.message);
  return data;
}

export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const uid = (req.query.uid || req.query.id || '').toString().trim();
  if (!uid) {
    return res.status(400).json({ error: 'UID is required' });
  }

  // Staggered race across the 6 keys
  let isDone = false;
  const errors: string[] = [];

  for (const keyObj of API_KEYS) {
    try {
      const data = await queryKey(uid, keyObj);
      return res.status(200).json({
        success: true,
        apiUsed: keyObj.name,
        data
      });
    } catch (err: any) {
      errors.push(err.message || 'Error');
    }
  }

  const notFound = errors.some((e) => /not found|invalid|does not exist/i.test(e));
  return res.status(notFound ? 404 : 502).json({
    error: notFound
      ? 'Free Fire UID not found. Please verify the UID number and try again.'
      : 'All API routes busy. Please try again shortly.'
  });
}
