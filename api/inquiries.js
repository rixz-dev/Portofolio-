import supabase from './db-client.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    if (body.website) return res.status(400).json({ error: 'Permintaan tidak dapat diproses.' });
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const message = String(body.message || '').trim();
    const service_id = String(body.service_id || '').trim();
    if (name.length < 2 || name.length > 100) return res.status(400).json({ error: 'Nama harus terdiri dari 2–100 karakter.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return res.status(400).json({ error: 'Masukkan alamat email yang valid.' });
    if (message.length < 20 || message.length > 3000) return res.status(400).json({ error: 'Ceritakan kebutuhanmu dalam 20–3.000 karakter.' });
    if (service_id) {
      const { data, error } = await supabase.from('farizy_services').select('id').eq('id', service_id).maybeSingle();
      if (error) throw error;
      if (!data) return res.status(400).json({ error: 'Pilih layanan yang tersedia.' });
    }
    const { count, error: countError } = await supabase.from('farizy_inquiries').select('id', { count: 'exact', head: true }).eq('email', email).gt('created_at', new Date(Date.now() - 3600000).toISOString());
    if (countError) throw countError;
    if ((count || 0) >= 3) return res.status(429).json({ error: 'Brief sebelumnya sudah tersimpan. Silakan coba lagi dalam satu jam atau hubungi melalui email.' });
    const { data, error } = await supabase.from('farizy_inquiries').insert({ name, email, message, service_id: service_id || null }).select('id, created_at').single();
    if (error) throw error;
    return res.status(201).json({ id: data.id, created_at: data.created_at });
  } catch (err) {
    console.error('Inquiry API:', err.message);
    return res.status(500).json({ error: 'Brief belum tersimpan. Silakan coba lagi atau hubungi melalui email.' });
  }
}
