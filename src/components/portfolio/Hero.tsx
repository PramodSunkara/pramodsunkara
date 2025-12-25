import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="container-narrow text-center">
        <h1 className="text-hero reveal mb-6">
          I help build web experiences for users.
        </h1>
        <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-4 reveal reveal-delay-1">
          Senior Web Developer & UI/UX Engineer with 19+ years of experience at the intersection of design, front-end development, and marketing technology.
        </p>
        <p className="text-caption text-muted-foreground mb-12 reveal reveal-delay-2">
          Crafting intuitive, high-performing digital experiences that drive results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-3">
          <Button 
            size="lg" 
            onClick={() => scrollToSection('portfolio')}
            className="px-8 py-6 text-base transition-all duration-300 hover:scale-105"
          >
            View Work
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-6 text-base transition-all duration-300 hover:bg-secondary"
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
