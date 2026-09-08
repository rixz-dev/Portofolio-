import { useCallback, useEffect, useState } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowDownUp, ArrowRight, ArrowUp, ArrowUpRight, Bot, Check, ChevronDown, Code2, Copy, Github, Globe2, Heart, Mail, Menu, Monitor, Send, Smartphone, Sparkles, WandSparkles, X, Zap } from 'lucide-react';
import type { PortfolioData, Project } from './lib/types';
import { Doodle } from './components/Doodle';
import ProjectCard from './components/ProjectCard';
import ProjectDialog from './components/ProjectDialog';
import ContactForm from './components/ContactForm';
import './portfolio.css';

export default function Portfolio() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('beranda');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Semua');
  const [ascending, setAscending] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();
  const [motionOff, setMotionOff] = useState(() => localStorage.getItem('farizy-motion') === 'off');
  const motionEnabled = !reducedMotion && !motionOff;

  const load = useCallback(async () => {
    try {
      const response = await fetch('/api/portfolio');
      if (!response.ok) throw new Error('Portfolio belum dapat dimuat. Coba lagi sebentar, ya.');
      const result = await response.json();
      if (!result.profile || !Array.isArray(result.projects)) throw new Error('Data portfolio belum tersedia.');
      setData(result); setError('');
    } catch (err) { setError(err instanceof Error ? err.message : 'Periksa koneksi internetmu, lalu coba lagi.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    document.documentElement.classList.toggle('motion-off', !motionEnabled);
  }, [motionEnabled]);
  useEffect(() => {
    if (!data) return;
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id); }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [data]);
  useEffect(() => {
    if (!menuOpen) return;
    const keydown = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', keydown);
    return () => window.removeEventListener('keydown', keydown);
  }, [menuOpen]);
  async function copyEmail() {
    if (!data) return;
    try { await navigator.clipboard.writeText(data.profile.email); setCopied(true); window.setTimeout(() => setCopied(false), 2500); }
    catch { window.location.href = `mailto:${data.profile.email}`; }
  }
  function selectService(id: string) { setSelectedService(id); document.getElementById('kontak')?.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'instant' }); }
  function toggleMotion() { const next = !motionOff; setMotionOff(next); localStorage.setItem('farizy-motion', next ? 'off' : 'on'); }

  if (loading) return <div className="loading-page" aria-busy="true"><div className="loading-brand">farizy<span>.</span></div><div className="loading-line" /><p>Menyiapkan ruang kecilku...</p><div className="loading-skeleton"><div /><div /></div></div>;
  if (!data) return <div className="loading-page"><Doodle kind="flower" /><h1>Sebentar, ya.</h1><p role="alert">{error}</p><button className="button primary" onClick={() => { setLoading(true); void load(); }}>Coba lagi <ArrowRight size={17} /></button></div>;
  const { profile, projects, services } = data;
  const categories = ['Semua', ...Array.from(new Set(projects.map(project => project.category)))];
  const filtered = projects.filter(project => filter === 'Semua' || project.category === filter).sort((a, b) => ascending ? a.sort_order - b.sort_order : b.sort_order - a.sort_order);
  const visible = showAll ? filtered : filtered.slice(0, 6);
  const newestOrder = Math.min(...projects.map(project => project.sort_order));
  const oldestOrder = Math.max(...projects.map(project => project.sort_order));
  const featured = projects.find(project => project.sort_order === newestOrder);
  const navClick = () => setMenuOpen(false);
  const sectionMotion = { initial: { opacity: 0, y: motionEnabled ? 22 : 0 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: motionEnabled ? 0.55 : 0 } };

  return <MotionConfig reducedMotion={motionEnabled ? 'user' : 'always'}><div className="site-shell">
    <a className="skip-link" href="#main">Langsung ke konten</a>
    <div className="ambient ambient-lavender" /><div className="ambient ambient-rose" />
    <header className="site-header container"><a href="#beranda" className="brand" onClick={navClick} aria-label="Farizy — Beranda"><span className="brand-star">✳</span>farizy<span className="brand-dot">.</span></a><span className="header-note">a work in progress</span><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigasi utama"><a className={activeSection === 'beranda' ? 'active' : ''} href="#beranda" onClick={navClick}>Beranda</a><a className={activeSection === 'tentang' ? 'active' : ''} href="#tentang" onClick={navClick}>Tentang</a><a className={activeSection === 'proyek' ? 'active' : ''} href="#proyek" onClick={navClick}>Proyek<span className="nav-project-dot" /></a><a className={activeSection === 'jasa' ? 'active' : ''} href="#jasa" onClick={navClick}>Jasa</a></nav><a className="header-contact" href="#kontak">Let’s talk <ArrowUpRight size={16} /></a><button className="menu-toggle icon-button" aria-label={menuOpen ? 'Tutup navigasi' : 'Buka navigasi'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></header>
    <main id="main">
      <section id="beranda" className="hero container"><div className="hero-copy"><motion.div {...sectionMotion}><div className="greeting"><span className="greeting-hand">✺</span>{profile.greeting}<span className="greeting-dot" /></div><h1>{profile.headline}<br /><span className="gradient-text">{profile.headline_accent}</span><Doodle kind="spark" className="headline-spark" /></h1><p className="hero-description">{profile.intro}</p><div className="hero-actions"><a className="button primary" href="#proyek">Jelajahi karyaku <ArrowDown size={17} /></a><a className="button ghost" href="#kontak">Mari ngobrol <ArrowUpRight size={17} /></a></div><div className="hero-footnote"><span className="availability-dot" />Belajar, membangun, dan terus bertumbuh.</div></motion.div></div>
        <motion.div className="hero-art" initial={{ opacity: 0, y: motionEnabled ? 20 : 0 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}><div className="art-lilac-shape" /><div className="art-rose-circle" /><div className="orbital-line" /><div className="art-dot-grid" /><span className="handwritten art-note">a little bit of me</span><Doodle kind="arrow" className="art-arrow" /><div className="hero-polaroid"><span className="paper-tape" /><img src={profile.photo} alt={`Foto ${profile.name} dari arsip personal`} fetchPriority="high" /><div className="hero-photo-caption"><span>{profile.photo_caption}</span><Heart size={20} strokeWidth={1.5} /></div></div><span className="hello-sticker">hello,<br />world<span>✳</span></span><div className="maker-sticker"><Code2 size={18} /><span>made of curiosity</span><span className="tiny-dot" /></div>{featured && <button className="currently-building" onClick={() => setSelectedProject(featured)}><span className="building-icon"><Music2Icon /></span><span><small>SEDANG KUBANGUN</small><strong>{featured.name} <ArrowUpRight size={13} /></strong></span><span className="audio-bars"><i /><i /><i /><i /></span></button>}<Doodle className="art-star" /><span className="handwritten art-bottom-note">still learning, always creating.</span><Doodle kind="heart" className="art-heart" /></motion.div>
      </section>
      <div className="hero-bottom container"><div className="hero-identity"><Globe2 size={15} /><span>Based in Indonesia</span><span className="little-divider" /><span className="identity-time">Creating at my own pace.</span></div><a href={profile.github} target="_blank" rel="noreferrer" className="github-link"><Github size={16} />rixz-dev<ArrowUpRight size={13} /></a><a className="scroll-hint" href="#proyek">SCROLL TO EXPLORE <ArrowDown size={13} /></a></div>
      <section id="proyek" className="projects-section container"><motion.div {...sectionMotion} className="section-heading"><div><div className="eyebrow"><span className="small-star">✳</span>THE THINGS I MAKE</div><h2>Ide kecil, <span className="serif-em">jadi nyata.</span><Doodle kind="loop" className="projects-heading-doodle" /></h2><p>Sepotong perjalanan, satu proyek pada satu waktu.</p></div><span className="handwritten section-note">a collection of curiosity <span>↙</span></span></motion.div><div className="project-toolbar"><div className="filter-tabs" aria-label="Filter proyek">{categories.map(category => <button key={category} onClick={() => { setFilter(category); setShowAll(false); }} className={filter === category ? 'selected' : ''} aria-pressed={filter === category}>{category}{category === 'Semua' && <span>{projects.length.toString().padStart(2, '0')}</span>}</button>)}</div><button className="sort-control" onClick={() => setAscending(!ascending)} aria-label={`Urutan ${ascending ? 'terbaru' : 'terlama'}, klik untuk mengubah`}><ArrowDownUp size={14} /><span>{ascending ? 'Terbaru ke terlama' : 'Terlama ke terbaru'}</span><ChevronDown size={13} /></button></div><div className="projects-grid" key={filter}>{visible.map((project, index) => <ProjectCard key={project.id} project={project} index={index} newestOrder={newestOrder} oldestOrder={oldestOrder} motionEnabled={motionEnabled} onOpen={setSelectedProject} />)}</div>{filtered.length > 6 && <div className="load-more"><button className="button secondary" onClick={() => setShowAll(!showAll)}>{showAll ? 'Tampilkan lebih sedikit' : `Lihat semua ${filtered.length} proyek`}{showAll ? <ArrowUp size={16} /> : <ArrowDown size={16} />}</button></div>}<div className="archive-note"><span className="dashed-line" /><span>Masih banyak ide di halaman berikutnya.</span><Doodle kind="heart" /></div></section>
      <section id="tentang" className="about-section"><div className="container about-grid"><motion.div {...sectionMotion} className="about-visual"><div className="about-photo"><span className="paper-tape" /><img src={profile.photo} alt="Sepotong cerita dari arsip Farizy" loading="lazy" /><span className="handwritten">{profile.name}, just being me.</span></div><div className="about-note"><span>NOTE TO SELF</span><p>Pelan-pelan,<br />yang penting<br /><em>terus tumbuh.</em></p><Doodle kind="flower" /></div><Doodle className="about-star" /></motion.div><motion.div {...sectionMotion} className="about-copy"><div className="eyebrow"><span className="small-star">✳</span>THE HUMAN BEHIND THE CODE</div><h2>Bukan ahli.<br /><span className="serif-em">Cuma terus mencoba.</span></h2><p>{profile.about}</p><p>{profile.about_extra}</p><div className="skills-label">TEMAN BELAJAR SEHARI-HARI</div><div className="skill-tags">{profile.skills.map(skill => <span key={skill}><Code2 size={13} />{skill}</span>)}</div><a href={profile.github} target="_blank" rel="noreferrer" className="text-link">Catatan belajarku di GitHub <ArrowUpRight size={16} /></a></motion.div></div><div className="container journey"><div className="journey-title"><span className="eyebrow">SEDIKIT JEJAK</span><span className="handwritten">learning out loud</span></div><div className="journey-grid">{profile.journey.map(item => <div className="journey-item" key={item.title}><span className="journey-dot" /><span className="journey-year">{item.year}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></div>{profile.experiments.length > 0 && <div className="container experiments"><span className="eyebrow">DI SUDUT MEJA KERJA</span>{profile.experiments.map(item => <div key={item.title}>{item.url ? <a href={item.url} target="_blank" rel="noreferrer">{item.title}<ArrowUpRight size={15} /></a> : <strong>{item.title}</strong>}<span>{item.text}</span></div>)}</div>}</section>
      <section id="jasa" className="services-section container"><motion.div {...sectionMotion} className="section-heading"><div><div className="eyebrow"><span className="small-star">✳</span>LET’S BUILD SOMETHING</div><h2>Ada ide? <span className="serif-em">Aku bantu wujudkan.</span></h2><p>Solusi yang pas, dibuat dengan perhatian pada hal-hal kecil.</p></div><Doodle kind="flower" className="services-flower" /></motion.div><div className="services-grid">{services.map(service => { const Icon = service.icon === 'android' ? Smartphone : service.icon === 'ai' ? WandSparkles : service.icon === 'bot' ? Bot : Monitor; return <motion.article {...sectionMotion} key={service.id} className={`service-card ${service.icon === 'android' ? 'android-service' : ''}`}><div className="service-top"><span className="service-icon"><Icon size={23} strokeWidth={1.5} /></span>{service.badge ? <span className="new-badge"><Sparkles size={11} />{service.badge}</span> : <span className="service-number">0{service.sort_order + 1}</span>}</div><h3>{service.title}</h3><p>{service.description}</p><div className="service-bottom"><div><span>INVESTASI</span><strong>{service.price}</strong></div><button onClick={() => selectService(service.id)} className="service-arrow" aria-label={`Diskusikan ${service.title}`}><ArrowUpRight size={21} /></button></div></motion.article>; })}</div><p className="services-footnote"><Heart size={13} /> Setiap ide itu unik. Kita diskusikan dulu, tanpa harus langsung berkomitmen.</p></section>
      <section id="kontak" className="contact-section"><div className="container contact-grid"><motion.div {...sectionMotion} className="contact-copy"><div className="availability-label"><span className="availability-dot" />{profile.availability}</div><h2>Hal baik dimulai<br />dari <span className="serif-em">“halo.”</span><Doodle kind="spark" /></h2><p>Punya ide, pertanyaan, atau sekadar ingin menyapa?<br className="desktop-break" /> Aku senang mendengarnya.</p><div className="contact-links"><div className="contact-link"><a href={`mailto:${profile.email}`}><span className="contact-icon"><Mail size={21} strokeWidth={1.5} /></span><span><small>DROP ME A LINE</small><strong>{profile.email}</strong></span></a><button className="icon-button" onClick={() => void copyEmail()} aria-label={copied ? 'Email tersalin' : 'Salin alamat email'}>{copied ? <Check size={17} /> : <Copy size={16} />}</button></div><div className="contact-link"><a href={`https://t.me/${profile.telegram.replace('@', '')}`} target="_blank" rel="noreferrer"><span className="contact-icon"><Send size={21} strokeWidth={1.5} /></span><span><small>LET’S CHAT ON TELEGRAM</small><strong>{profile.telegram}</strong></span><ArrowUpRight size={19} /></a></div></div><span className="copy-feedback" role="status">{copied ? 'Alamat email disalin!' : ''}</span><div className="contact-signature"><span className="handwritten">Talk soon,</span><strong className="handwritten">Farizy</strong><Doodle kind="heart" /></div></motion.div><motion.div {...sectionMotion} className="contact-form-wrap"><ContactForm services={services} profile={profile} selectedService={selectedService} setSelectedService={setSelectedService} /></motion.div></div></section>
    </main><footer className="site-footer container"><a href="#beranda" className="brand"><span className="brand-star">✳</span>farizy<span className="brand-dot">.</span></a><p>© {new Date().getFullYear()} {profile.name}. Made slowly, with <Heart size={12} />.</p><div className="footer-actions"><button onClick={toggleMotion} className="motion-toggle" aria-pressed={!motionEnabled}><Zap size={13} />Animasi: {motionEnabled ? 'aktif' : 'tenang'}</button><a href="#beranda" className="back-top" aria-label="Kembali ke atas"><ArrowUp size={17} /></a></div></footer>{error && <div className="connection-notice" role="alert">{error}<button onClick={() => void load()}>Coba lagi</button></div>}<ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} /></div></MotionConfig>;
}

function Music2Icon() { return <svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18V5l11-2v13M9 9l11-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><ellipse cx="6" cy="18.5" rx="3" ry="2.5" fill="currentColor" /><ellipse cx="17" cy="16.5" rx="3" ry="2.5" fill="currentColor" /></svg>; }
