export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'Missing url param' });

  // Only allow Google Drive thumbnail URLs
  if (!url.startsWith('https://drive.google.com/thumbnail')) {
    return res.status(403).json({ error: 'Only Drive thumbnails allowed' });
  }

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch image' });
    }

    const buffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const base64 = Buffer.from(buffer).toString('base64');

    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).json({ dataUrl: `data:${contentType};base64,${base64}` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
