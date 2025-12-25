import { useScrollReveal } from '@/hooks/useScrollReveal';
import Hero from '@/components/portfolio/Hero';
import ImpactHighlights from '@/components/portfolio/ImpactHighlights';
import Portfolio from '@/components/portfolio/Portfolio';
import Skills from '@/components/portfolio/Skills';
import About from '@/components/portfolio/About';
import Process from '@/components/portfolio/Process';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import ThemeToggle from '@/components/portfolio/ThemeToggle';

const Index = () => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="min-h-screen">
      <main>
        <Hero />
        <ImpactHighlights />
        <Portfolio />
        <Skills />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ThemeToggle />
    </div>
  );
};

export default Index;
