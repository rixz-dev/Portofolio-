import { useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, Check, LoaderCircle, Send } from 'lucide-react';
import type { Profile, Service } from '../lib/types';

export default function ContactForm({ services, selectedService, setSelectedService, profile, onSaved }: { services: Service[]; selectedService: string; setSelectedService: (id: string) => void; profile: Profile; onSaved: () => Promise<void> }) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const message = String(fields.get('message') || '').trim();
    if (name.length < 2) { setError('Nama perlu setidaknya 2 karakter.'); return; }
    if (message.length < 20) { setError('Ceritakan sedikit lebih detail, minimal 20 karakter.'); return; }
    setSending(true); setError('');
    try {
      const response = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message, service_id: selectedService, website: fields.get('website') }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Brief belum tersimpan. Coba lagi ya.');
      setReceipt(String(result.id).slice(0, 8).toUpperCase());
      form.reset(); setSelectedService('');
      await onSaved();
    } catch (err) { setError(err instanceof Error ? err.message : 'Koneksi terputus. Silakan coba lagi.'); }
    finally { setSending(false); }
  }
  if (receipt) return <div className="brief-success" role="status"><span className="success-icon"><Check size={30} /></span><p className="eyebrow">BRIEF #{receipt}</p><h3>Idemu sudah tersimpan.</h3><p>Terima kasih sudah berbagi! Untuk memulai percakapan langsung, sapa aku melalui email atau Telegram.</p><a className="button primary" href={`https://t.me/${profile.telegram.replace('@', '')}`} target="_blank" rel="noreferrer">Lanjut di Telegram <ArrowUpRight size={17} /></a><button className="text-button" onClick={() => setReceipt('')}>Kirim brief lainnya</button></div>;
  return <form className="contact-form" onSubmit={submit}><div className="form-heading"><span className="eyebrow">FROM AN IDEA TO SOMETHING REAL</span><Send size={20} /></div><h3>Ceritakan idemu<span className="crimson">.</span></h3><div className="form-row"><label>Namamu<input name="name" placeholder="Boleh kenalan?" required minLength={2} maxLength={100} autoComplete="name" /></label><label>Email<input name="email" type="email" placeholder="kamu@email.com" required maxLength={254} autoComplete="email" /></label></div><label>Apa yang ingin kamu buat?<select value={selectedService} onChange={e => setSelectedService(e.target.value)}><option value="">Pilih layanan / masih eksplorasi</option>{services.map(service => <option value={service.id} key={service.id}>{service.title}</option>)}</select></label><label>Sedikit tentang idemu<textarea name="message" placeholder="Ceritakan kebutuhan, fitur, atau ide yang ada di kepalamu..." required minLength={20} maxLength={3000} rows={4} /></label><div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button primary submit-button" disabled={sending}>{sending ? <><LoaderCircle className="spinner" size={17} /> Menyimpan brief...</> : <>Kirim brief <ArrowUpRight size={18} /></>}</button><p className="privacy-note">Nama, email, dan brief disimpan secara privat untuk ditinjau. Form ini tidak mengirim email otomatis.</p></form>;
}
