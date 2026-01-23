import { useEffect, useRef, useState } from 'react';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';
import FloatingBackButton from '@/components/FloatingBackButton';
import GalleryCard from '@/components/gallery/GalleryCard';
import { galleryProjects } from '@/data/galleryProjects';
import { useIsMobile } from '@/hooks/use-mobile';

const Gallery = () => {
  const isMobile = useIsMobile();
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    galleryProjects.map(() => true)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll-based card visibility
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const stickyTop = 100; // all cards share the same sticky top

      // Find the latest card that has reached the sticky top.
      // Only that card stays visible, so there is no "pile up".
      let activeIndex = 0;
      for (let i = 0; i < galleryProjects.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top <= stickyTop + 1) {
          activeIndex = i;
        }
      }

      setVisibleCards(galleryProjects.map((_, i) => i === activeIndex));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <FloatingBackButton />

      {/* Hero Section */}
      <section className="pt-28 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-5xl mx-auto px-6 md:px-8">
          <h1 className="text-section font-display font-bold text-foreground mb-4">
            Gallery
          </h1>
          <p className="text-muted-foreground text-body max-w-2xl">
            Selected case studies showcasing design and engineering work that drives measurable impact.
          </p>
        </div>
      </section>

      {/* Stacked Cards Section */}
      <section className="relative pb-32 md:pb-48">
        <div className="container max-w-[95vw] mx-auto px-4 md:px-6">
          {galleryProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="flex justify-center py-3 md:py-4"
              style={
                isMobile
                  ? {}
                  : {
                      position: 'sticky',
                      top: '100px',
                      zIndex: galleryProjects.length - index,
                      opacity: visibleCards[index] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out',
                      pointerEvents: visibleCards[index] ? 'auto' : 'none',
                    }
              }
            >
              <div
                className="w-full lg:w-[90vw] max-w-7xl transition-all duration-300"
                style={
                  isMobile ? {} : {}
                }
              >
                <GalleryCard project={project} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
