import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, ArrowUpRight, Copy, Download, Mail, Send, Share2, Sparkles } from 'lucide-react';
import type { Profile, Service } from '../lib/types';

export default function ContactForm({ services, selectedService, setSelectedService, profile }: { services: Service[]; selectedService: string; setSelectedService: (id: string) => void; profile: Profile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [draft, setDraft] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [sharing, setSharing] = useState(false);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const hasDraft = draft !== null;
  useEffect(() => { if (hasDraft) draftRef.current?.focus({ preventScroll: true }); }, [hasDraft]);

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) { setError('Nama perlu setidaknya 2 karakter.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setError('Masukkan alamat email yang valid.'); return; }
    if (message.trim().length < 20) { setError('Ceritakan sedikit lebih detail, minimal 20 karakter.'); return; }
    const service = services.find(item => item.id === selectedService)?.title;
    setSubject(`${service ? `Diskusi ${service}` : 'Diskusi ide & kolaborasi'} — ${name.trim()}`);
    setDraft(`Halo ${profile.name},\n\nAku ${name.trim()}. ${service ? `Aku ingin berdiskusi tentang ${service}.` : 'Aku punya ide yang ingin didiskusikan.'}\n\n${message.trim()}\n\nBoleh diskusi tentang kemungkinan pengerjaan, estimasi biaya, dan waktunya?\n\nEmail balasan: ${email.trim()}\n\nTerima kasih,\n${name.trim()}`);
    setError(''); setFeedback('');
  }

  async function copyDraft() {
    if (!draft?.trim()) return;
    try {
      await navigator.clipboard.writeText(draft);
      setFeedback('Draft disalin. Tempelkan di aplikasi pilihanmu.');
    } catch {
      draftRef.current?.focus(); draftRef.current?.select();
      setFeedback('Salin otomatis tidak tersedia. Teks sudah dipilih; gunakan Salin atau Ctrl/Cmd+C.');
    }
  }

  async function shareDraft() {
    if (!draft?.trim()) return;
    if (!navigator.share) { await copyDraft(); return; }
    setSharing(true);
    try {
      await navigator.share({ title: subject, text: draft });
      setFeedback('Draft dibagikan melalui aplikasi pilihanmu.');
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') setFeedback('Berbagi dibatalkan. Draft tetap ada di halaman ini.');
      else { await copyDraft(); }
    } finally { setSharing(false); }
  }

  function downloadDraft() {
    if (!draft?.trim()) return;
    const url = URL.createObjectURL(new Blob([`${subject}\n\n${draft}`], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url; link.download = 'draft-ide-farizy.txt';
    document.body.append(link); link.click(); link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback('Draft diunduh sebagai file teks di perangkatmu.');
  }

  if (draft !== null) {
    const ready = Boolean(draft.trim() && subject.trim());
    const telegram = profile.telegram.replace('@', '');
    return <div className="contact-form draft-preview rr-block">
      <div className="form-heading"><span className="eyebrow">DRAFT GENERATOR · DI PERANGKATMU</span><Sparkles size={20} /></div>
      <h3>Draft-mu sudah siap<span className="crimson">.</span></h3>
      <p className="draft-intro">Edit sesuai seleramu, lalu pilih tempat untuk mengirimnya.</p>
      <label>Subjek email<input value={subject} onChange={e => { setSubject(e.target.value); setFeedback(''); }} maxLength={180} /></label>
      <label>Draft pesan<textarea ref={draftRef} value={draft} onChange={e => { setDraft(e.target.value); setFeedback(''); }} rows={9} maxLength={6000} /></label>
      {!ready && <p className="form-error" role="alert">Subjek dan draft pesan tidak boleh kosong.</p>}
      <div className="draft-actions">
        <a className="button primary" href={ready ? `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}` : undefined} aria-disabled={!ready}><Mail size={16} />Buka email<ArrowUpRight size={14} /></a>
        <a className="button secondary" href={ready ? `https://t.me/${telegram}?text=${encodeURIComponent(draft)}` : undefined} target="_blank" rel="noreferrer" aria-disabled={!ready}><Send size={16} />Buka Telegram<ArrowUpRight size={14} /></a>
        <button className="button secondary" onClick={() => void copyDraft()} disabled={!ready}><Copy size={15} />Salin draft</button>
        <button className="button secondary" onClick={() => void shareDraft()} disabled={!ready || sharing}><Share2 size={15} />{sharing ? 'Membuka...' : 'Bagikan lainnya'}</button>
      </div>
      <div className="draft-tools"><button className="text-button" onClick={() => { setDraft(null); setFeedback(''); }}><ArrowLeft size={13} />Ubah isian</button><button className="text-button" onClick={downloadDraft} disabled={!ready}><Download size={13} />Unduh .txt</button></div>
      <p className="draft-feedback" role="status" aria-live="polite">{feedback}</p>
      <p className="privacy-note">Draft hanya ada di memori halaman ini, tidak dikirim ke server atau database. Kamu tetap menekan Kirim di email/Telegram. Jika teks tidak terisi, gunakan Salin draft. Muat ulang halaman akan menghapus draft.</p>
    </div>;
  }
  return <form className="contact-form rr-block" onSubmit={generate}>
    <div className="form-heading"><span className="eyebrow">DRAFT GENERATOR · DI PERANGKATMU</span><Sparkles size={20} /></div>
    <h3>Ceritakan idemu<span className="crimson">.</span></h3>
    <div className="form-row"><label>Namamu<input name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Boleh kenalan?" required minLength={2} maxLength={100} autoComplete="name" /></label><label>Email balasan<input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="kamu@email.com" required maxLength={254} autoComplete="email" /></label></div>
    <label>Apa yang ingin kamu buat?<select value={selectedService} onChange={e => setSelectedService(e.target.value)}><option value="">Pilih layanan / masih eksplorasi</option>{services.map(service => <option value={service.id} key={service.id}>{service.title}</option>)}</select></label>
    <label>Sedikit tentang idemu<textarea name="message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Ceritakan kebutuhan, fitur, atau ide yang ada di kepalamu..." required minLength={20} maxLength={3000} rows={4} /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button primary submit-button" type="submit">Buat draft<Sparkles size={17} /></button>
    <p className="privacy-note">Susun pesan di browser, lalu buka di email, Telegram, atau aplikasi pilihanmu. Tidak ada pengiriman otomatis atau penyimpanan isian ke database.</p>
  </form>;
}
