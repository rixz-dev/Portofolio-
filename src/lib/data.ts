export type ProjectStatus = "DONE" | "WIP" | "ARCHIVED";
export type ProjectMedia =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string }
  | { kind: "none" };

export interface Project {
  id: string;
  index: string;
  name: string;
  tagline: string;
  year: string;
  category: string;
  status: ProjectStatus;
  progress: number; // 0 - 100
  description: string;
  stack: string[];
  media: ProjectMedia;
  href?: string;
  readme?: string;
  collaborators?: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "rxs-code",
    index: "01",
    name: "RXS-CODE",
    tagline: "An experimental code surface, in progress.",
    year: "2025",
    category: "WEB / INTERFACE",
    status: "WIP",
    progress: 43,
    description:
      "A live documentation surface for a personal code runtime. Designed as a quiet reading room for syntax, semantics, and behavior.",
    stack: ["TS", "REACT", "MDX", "VERCEL"],
    media: { kind: "image", src: "/media/projects/rxs-code.png" },
    href: "https://rxs-code.vercel.app",
    featured: true,
  },
  {
    id: "aria-ai",
    index: "02",
    name: "ARIA",
    tagline: "A small model tuned for termux-shaped environments.",
    year: "2025",
    category: "AI / MODEL",
    status: "WIP",
    progress: 12,
    description:
      "A pre-trained language model adapted to termux constraints. Compact, lean, and trained to behave well in low-resource shells.",
    stack: ["PYTHON", "HF", "TRANSFORMERS", "TERMUX"],
    media: { kind: "image", src: "/media/projects/aria-ai.png" },
    href: "https://huggingface.co/rixz-aners/aria-x1-v1.0/",
  },
  {
    id: "ryn-ai",
    index: "03",
    name: "RYN-AI",
    tagline: "An autonomous companion wired to a telegram bot.",
    year: "2025",
    category: "AGENT / BOT",
    status: "DONE",
    progress: 100,
    description:
      "A persistent agent that talks to you in real time, listens for context, and stays online in the background. Built to be a quiet companion.",
    stack: ["NODE", "TELEGRAM", "SQLITE", "CRYPTOGRAPHY"],
    media: { kind: "image", src: "/media/projects/ryn-ai.png" },
    href: "https://github.com/rixz-dev/Base-ryn-ai",
  },
  {
    id: "secret",
    index: "04",
    name: "SECRET",
    tagline: "A private chat surface, with collaborators.",
    year: "2025",
    category: "WEB / CRYPTO",
    status: "DONE",
    progress: 100,
    description:
      "An end-to-end private messaging room. Built as a small, careful piece of software that respects the conversation inside it.",
    stack: ["WEB", "E2E", "REACT", "NODE"],
    media: { kind: "image", src: "/media/projects/secret.png" },
    href: "https://github.com/rixz-dev/secret",
    collaborators: ["collaborator.a", "collaborator.b"],
  },
  {
    id: "rxhunt",
    index: "05",
    name: "RXHUNT",
    tagline: "A reconnaissance tool. Read the readme first.",
    year: "2025",
    category: "SECURITY / TOOL",
    status: "WIP",
    progress: 0,
    description:
      "A focused reconnaissance utility. Treat it like a scalpel, not a hammer. Read the repository notes before running.",
    stack: ["PYTHON", "OSINT", "CLI"],
    media: { kind: "image", src: "/media/projects/rxhunt.png" },
    href: "https://github.com/rixz-dev/rxhunt",
  },
  {
    id: "offlab",
    index: "06",
    name: "OFFLAB",
    tagline: "A local toolbox for ethical hacking practice.",
    year: "2025",
    category: "EDUCATION / LOCAL",
    status: "DONE",
    progress: 100,
    description:
      "A self-hosted learning environment for ethical hacking. Everything runs locally, everything is inspectable, nothing is hidden.",
    stack: ["BASH", "PYTHON", "DOCKER", "LINUX"],
    media: { kind: "image", src: "/media/projects/offlab.png" },
    href: "https://github.com/rixz-dev/Offlab",
  },
];

export interface Service {
  id: string;
  index: string;
  title: string;
  description: string;
  price: string;
  meta: string;
}

export const services: Service[] = [
  {
    id: "web",
    index: "S/01",
    title: "Website Development",
    description:
      "Pembuatan website kecil sampai besar. Dari landing page, portofolio, hingga aplikasi web penuh.",
    price: "FROM 110.000 IDR",
    meta: "WEB / FRONTEND / FULLSTACK",
  },
  {
    id: "ai",
    index: "S/02",
    title: "AI Integration",
    description:
      "Integrasikan AI ke dalam pekerjaanmu untuk mempercepat dan menangani beberapa pekerjaan secara otomatis.",
    price: "FROM 80.000 IDR",
    meta: "LLM / AGENT / AUTOMATION",
  },
  {
    id: "bot",
    index: "S/03",
    title: "Bot Development",
    description:
      "Bot yang mempermudah akses Anda hanya via chat di WhatsApp, Telegram, Discord, dan lainnya.",
    price: "FROM 100.000 IDR",
    meta: "TELEGRAM / WHATSAPP / DISCORD",
  },
];

export interface StackItem {
  name: string;
  level: number;
  since: string;
}

export const stack: StackItem[] = [
  { name: "Python", level: 78, since: "2023" },
  { name: "JavaScript", level: 72, since: "2024" },
  { name: "Node.js", level: 70, since: "2024" },
  { name: "NPM", level: 80, since: "2024" },
  { name: "CSS", level: 74, since: "2024" },
  { name: "SQLite", level: 64, since: "2025" },
  { name: "Git & GitHub", level: 76, since: "2024" },
  { name: "Cryptography", level: 58, since: "2025" },
];

export interface ExperienceItem {
  id: string;
  range: string;
  role: string;
  note: string;
  type: "GRAY" | "WHITE" | "PROMPT" | "AI" | "SOFTWARE";
}

export const experiences: ExperienceItem[] = [
  {
    id: "x1",
    range: "2023 — 2025",
    role: "Gray Hat Hacker",
    note: "A chapter best left unread. Do not imitate.",
    type: "GRAY",
  },
  {
    id: "x2",
    range: "2025 — 2026",
    role: "White Hacker",
    note: "Defensive posture, careful disclosure, public learning.",
    type: "WHITE",
  },
  {
    id: "x3",
    range: "2026",
    role: "Prompt Engineering",
    note: "Composing language for machines to behave with care.",
    type: "PROMPT",
  },
  {
    id: "x4",
    range: "2026",
    role: "AI Engineering",
    note: "Small models, local tools, tight loops, honest failures.",
    type: "AI",
  },
  {
    id: "x5",
    range: "2026",
    role: "Software Development",
    note: "Quiet software, written slowly, read often.",
    type: "SOFTWARE",
  },
];

export const socials = [
  { label: "WhatsApp", value: "+62 858-2857-7232", href: "https://wa.me/6285828577232" },
  { label: "GitHub", value: "rixz-dev", href: "https://github.com/rixz-dev" },
  { label: "Telegram", value: "RIXZDEV", href: "https://t.me/rixzdev" },
  { label: "Saweria", value: "riznotdev", href: "https://saweria.co/riznotdev" },
];

export const bonusProjects = [
  {
    name: "MONOP GAMES",
    note: "A web-based monopoly game. Still being built, piece by piece.",
  },
  {
    name: "DEV-TOOLSBOX",
    note: "A collection of small experimental projects, all in one place.",
    href: "https://dev-toolsbox-two.vercel.app/",
  },
];
