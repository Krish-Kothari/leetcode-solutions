import { listSolutions } from './_utils.js';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }
  try {
    const solutions = listSolutions();
    res.setHeader('Cache-Control', 'no-store'); // Always fresh on Vercel
    res.json({ success: true, solutions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
