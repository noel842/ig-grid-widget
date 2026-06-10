export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-notion-token, x-database-id');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  const token = req.headers['x-notion-token'];
  const dbId  = req.headers['x-database-id'];

  if (!token || !dbId) return res.status(400).json({ error: 'Missing token or database ID' });

  try {
    let allResults = [];
    let cursor = undefined;

    do {
      const body = { page_size: 100 };
      if (cursor) body.start_cursor = cursor;

      const r = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: data.message || 'Notion error', code: data.code });

      allResults = allResults.concat(data.results || []);
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);

    return res.status(200).json({ results: allResults });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
