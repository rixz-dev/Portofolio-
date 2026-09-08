export interface Profile {
  id: string;
  name: string;
  handle: string;
  greeting: string;
  headline: string;
  headline_accent: string;
  intro: string;
  about: string;
  about_extra: string;
  photo: string;
  photo_caption: string;
  email: string;
  telegram: string;
  github: string;
  availability: string;
  since: string;
  skills: string[];
  journey: { year: string; title: string; text: string }[];
  experiments: { title: string; text: string; url?: string }[];
}
export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  category_label: string;
  year: string;
  status: string;
  image: string;
  url: string;
  github: string | null;
  stack: string[];
  features: string[];
  sort_order: number;
  theme: string;
  note: string;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: string;
  badge: string | null;
  sort_order: number;
}
export interface PortfolioData { profile: Profile; projects: Project[]; services: Service[] }
