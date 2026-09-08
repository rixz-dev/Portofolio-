import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check, Github, X } from 'lucide-react';
import type { Project } from '../lib/types';

export default function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (project) { dialog.current?.showModal(); document.body.style.overflow = 'hidden'; }
    else dialog.current?.close();
    return () => { document.body.style.overflow = ''; };
  }, [project]);
  return <dialog ref={dialog} className="project-dialog" onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }} aria-labelledby="project-dialog-title">
    {project && <><button className="dialog-close icon-button" onClick={onClose} aria-label="Tutup detail proyek"><X size={21} /></button><div className={`dialog-image project-${project.theme}`}><img src={project.image} alt={`Preview ${project.name}`} /></div><div className="dialog-content"><div className="eyebrow">{project.category_label} <span>·</span> {project.year} <span>·</span> {project.status}</div><h2 id="project-dialog-title">{project.name}<span className="crimson">.</span></h2><p className="dialog-tagline">{project.tagline}</p><p>{project.description}</p><div className="project-stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div>{project.features.length > 0 && <ul className="feature-list">{project.features.map(item => <li key={item}><Check size={15} />{item}</li>)}</ul>}<div className="dialog-actions"><a className="button primary" href={project.url} target="_blank" rel="noreferrer">Jelajahi proyek <ArrowUpRight size={17} /></a>{project.github && project.github !== project.url && <a className="button secondary" href={project.github} target="_blank" rel="noreferrer"><Github size={17} /> Source code</a>}</div><small>Informasi dari source project; fitur proyek yang sedang dikembangkan dapat berubah.</small></div></>}
  </dialog>;
}
