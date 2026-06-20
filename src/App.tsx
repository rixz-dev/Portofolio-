import { useTabVisibility } from "./hooks/useTabVisibility";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MarqueeSection } from "./components/MarqueeSection";
import { ProjectSlider } from "./components/ProjectSlider";
import { Services } from "./components/Services";
import { Stack } from "./components/Stack";
import { Story } from "./components/Story";

export default function App() {
  useTabVisibility();
  return (
    <div className="bg-noise vignette relative min-h-screen text-[var(--color-paper)]">
      <Header />
      <main>
        <Hero />
        <MarqueeSection />
        <ProjectSlider />
        <MarqueeSection />
        <Story />
        <Experience />
        <MarqueeSection />
        <Stack />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
