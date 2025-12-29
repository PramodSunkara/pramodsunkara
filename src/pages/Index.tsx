import { lazy, Suspense } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Navigation from '@/components/portfolio/Navigation';
import Hero from '@/components/portfolio/Hero';
import ImpactHighlights from '@/components/portfolio/ImpactHighlights';
import TeamsWorkedWith from '@/components/portfolio/TeamsWorkedWith';
import Footer from '@/components/portfolio/Footer';

// Lazy load below-the-fold sections
const Skills = lazy(() => import('@/components/portfolio/Skills'));
const About = lazy(() => import('@/components/portfolio/About'));
const Contact = lazy(() => import('@/components/portfolio/Contact'));

const SectionSkeleton = () => (
  <div className="py-16 md:py-24 animate-pulse">
    <div className="container mx-auto px-6">
      <div className="h-8 w-48 bg-muted rounded mb-8" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-3/4 bg-muted rounded" />
      </div>
    </div>
  </div>
);

const Index = () => {
  const containerRef = useScrollReveal();

  return (
    <div ref={containerRef} className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <ImpactHighlights />
        <TeamsWorkedWith />
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      
    </div>
  );
};

export default Index;
