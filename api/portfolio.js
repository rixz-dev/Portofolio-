import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const [profile, projects, services] = await Promise.all([
      supabase.from('farizy_profile').select('*').eq('id', 'main').single(),
      supabase.from('farizy_projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('farizy_services').select('*').order('sort_order', { ascending: true }),
    ].map(query => query
      .setHeader('apikey', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      .setHeader('Authorization', `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)));
    for (const result of [profile, projects, services]) if (result.error) throw result.error;
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res.status(200).json({ profile: profile.data, projects: projects.data, services: services.data });
  } catch (err) {
    console.error('Portfolio API:', err.message);
    return res.status(500).json({ error: 'Portfolio belum dapat dimuat. Silakan coba lagi sebentar.' });
  }
}
