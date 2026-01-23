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
      // Get the first card's sticky top position as reference
      const firstCardTop = 100; // matches sticky top for index 0
      
      const newVisibility = galleryProjects.map((_, index) => {
        const card = cardRefs.current[index];
        if (!card) return true;

        const rect = card.getBoundingClientRect();
        
        // Card should disappear only when it reaches the top (where first card sticks)
        // Check if this card has been pushed above its sticky position by subsequent cards
        if (rect.top <= firstCardTop && index < galleryProjects.length - 1) {
          const nextCard = cardRefs.current[index + 1];
          if (nextCard) {
            const nextRect = nextCard.getBoundingClientRect();
            // Hide this card only when next card has reached the same top position
            if (nextRect.top <= firstCardTop + 40) {
              return false;
            }
          }
        }
        return true;
      });

      setVisibleCards(newVisibility);
    };

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
                      top: `${100 + index * 32}px`,
                      zIndex: index + 1,
                      opacity: visibleCards[index] ? 1 : 0,
                      transition: 'opacity 0.3s ease-in-out',
                      pointerEvents: visibleCards[index] ? 'auto' : 'none',
                    }
              }
            >
              <div
                className="w-full lg:w-[90vw] max-w-7xl transition-all duration-300"
                style={
                  isMobile
                    ? {}
                    : {
                        transform: `scale(${1 - index * 0.01})`,
                      }
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
