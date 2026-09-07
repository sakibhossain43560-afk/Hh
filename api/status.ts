const API_KEYS = [
  { id: 'api1', name: 'API 1 (Primary)' },
  { id: 'api2', name: 'API 2 (Fast Backup)' },
  { id: 'api3', name: 'API 3 (High Speed)' },
  { id: 'api4', name: 'API 4 (Reliable)' },
  { id: 'api5', name: 'API 5 (Ultra Backup)' },
  { id: 'api6', name: 'API 6 (Turbo Engine)' }
];

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const results = API_KEYS.map((k) => ({
    id: k.id,
    name: k.name,
    status: 'online',
    latencyMs: 180
  }));

  return res.status(200).json({ apis: results });
}
