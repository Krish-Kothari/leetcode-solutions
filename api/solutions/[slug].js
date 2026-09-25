import { getSolution } from '../../api/_utils.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  try {
    const { slug } = req.query;
    const data = getSolution(slug);
    if (!data) {
      return res.status(404).json({ success: false, error: 'Solution not found' });
    }
    res.setHeader('Cache-Control', 'no-store');
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
