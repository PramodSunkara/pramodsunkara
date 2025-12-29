import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import ImpactHighlights from '@/components/portfolio/ImpactHighlights';
import TeamsWorkedWith from '@/components/portfolio/TeamsWorkedWith';
import Footer from '@/components/portfolio/Footer';
import LazySection from '@/components/portfolio/LazySection';

const Index = () => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ImpactHighlights />
        <TeamsWorkedWith />
        <LazySection 
          importFn={() => import('@/components/portfolio/Skills')} 
          fallbackHeight="600px" 
        />
        <LazySection 
          importFn={() => import('@/components/portfolio/About')} 
          fallbackHeight="500px" 
        />
        <LazySection 
          importFn={() => import('@/components/portfolio/Contact')} 
          fallbackHeight="400px" 
        />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
