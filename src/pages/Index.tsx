import { useEffect, lazy, Suspense } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';

const ImpactHighlights = lazy(() => import('@/components/portfolio/ImpactHighlights'));
const TeamsWorkedWith = lazy(() => import('@/components/portfolio/TeamsWorkedWith'));
const Skills = lazy(() => import('@/components/portfolio/Skills'));
const About = lazy(() => import('@/components/portfolio/About'));
const Contact = lazy(() => import('@/components/portfolio/Contact'));
const Footer = lazy(() => import('@/components/portfolio/Footer'));
const FloatingSimba = lazy(() => import('@/components/portfolio/FloatingSimba'));

const Index = () => {
  const containerRef = useScrollReveal();

  // Scroll to top on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      <Navigation />
      <Suspense fallback={null}>
        <FloatingSimba />
      </Suspense>
      <main>
        <Hero />
        <Suspense fallback={null}>
          <ImpactHighlights />
          <TeamsWorkedWith />
          <Skills />
          <About />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
