import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import ImpactHighlights from '@/components/portfolio/ImpactHighlights';
import TeamsWorkedWith from '@/components/portfolio/TeamsWorkedWith';
import Skills from '@/components/portfolio/Skills';
import About from '@/components/portfolio/About';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';


const Index = () => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ImpactHighlights />
        <TeamsWorkedWith />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      
    </div>
  );
};

export default Index;
