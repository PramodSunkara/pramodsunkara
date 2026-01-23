import { useEffect } from 'react';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';
import FloatingBackButton from '@/components/FloatingBackButton';
import GalleryCard from '@/components/gallery/GalleryCard';
import { galleryProjects } from '@/data/galleryProjects';
import { useIsMobile } from '@/hooks/use-mobile';

const Gallery = () => {
  const isMobile = useIsMobile();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          {galleryProjects.map((project, index) => (
            <div
              key={project.id}
              className="flex justify-center py-3 md:py-4"
              style={
                isMobile
                  ? {}
                  : {
                      position: 'sticky',
                      top: `${100 + index * 32}px`,
                      zIndex: index + 1,
                    }
              }
            >
              <div
                className="w-full lg:w-[70vw] max-w-5xl transition-all duration-300"
                style={
                  isMobile
                    ? {}
                    : {
                        // Subtle scale reduction for stacked effect
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
