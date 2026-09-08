import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Music2, Sparkles } from 'lucide-react';
import type { Project } from '../lib/types';
import { Doodle } from './Doodle';

export default function ProjectCard({ project, index, total, motionEnabled, onOpen, ascending }: { project: Project; index: number; total: number; motionEnabled: boolean; onOpen: (project: Project) => void; ascending: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [23, 0, -23]);
  return <div className={`project-slot project-${project.theme}`} ref={ref}>
    <div className="timeline-mark"><span className={project.sort_order === 0 ? 'timeline-dot latest' : 'timeline-dot'} /><span>{project.year}</span><span className="timeline-label">{project.sort_order === 0 ? 'Paling baru' : total > 1 && ((ascending && index === total - 1) || (!ascending && index === 0)) ? 'Awal perjalanan' : `Catatan ${String(project.sort_order + 1).padStart(2, '0')}`}</span></div>
    <motion.article style={{ y: motionEnabled ? y : 0 }} className="project-card">
      <button className="project-visual" onClick={() => onOpen(project)} aria-label={`Lihat detail ${project.name}`}>
        <div className="collage-orbit" />
        <div className="project-paper-back" />
        <div className="project-polaroid"><span className="paper-tape" /><img src={project.image} alt={`Tampilan proyek ${project.name}`} loading="lazy" decoding="async" /><div className="photo-caption"><span>{project.name === 'Lyreon' ? 'hear what words can’t say.' : project.note}</span>{project.name === 'Lyreon' ? <Music2 size={15} /> : <Sparkles size={15} />}</div></div>
        <Doodle kind={index % 2 === 0 ? 'star' : 'spark'} className="project-doodle" />
        <span className={`project-status ${project.status === 'Selesai' ? 'completed' : ''}`}><i />{project.status}</span>
        <span className="visual-open"><ArrowUpRight size={18} /></span>
      </button>
      <div className="project-info"><div className="project-meta">{project.category_label}<span>{project.year}</span></div><button onClick={() => onOpen(project)} className="project-title"><h3>{project.name}</h3><ArrowUpRight size={23} /></button><p>{project.tagline}</p><div className="project-stack">{project.stack.slice(0, 3).map(item => <span key={item}>{item}</span>)}</div></div>
    </motion.article>
  </div>;
}
