import { Button } from '@/components/ui/button';
import DecorativeBlobs from './DecorativeBlobs';
import Sparkle from './Sparkle';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center section-padding pt-32 relative">
      <DecorativeBlobs variant="hero" />
      
      <div className="container-narrow text-center relative z-10">
        <div className="relative inline-block">
          <Sparkle className="absolute -top-6 -left-8 text-blob-orange/60" size="md" />
          <Sparkle className="absolute -top-4 -right-6 text-blob-green/60" size="sm" />
          <h1 className="text-hero text-foreground reveal mb-8">
            Building web experiences
            <br />
            that <em className="font-normal italic">resonate,</em> products
            <br />
            that <em className="font-normal italic">convert.</em>
          </h1>
          <Sparkle className="absolute -bottom-2 right-1/4 text-blob-yellow/70" size="sm" />
        </div>
        
        <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-16 reveal reveal-delay-1">
          Your project deserves a design-focused web developer who empowers you to overcome business challenges. With 19+ years of experience, I create smart websites, effective strategies, and impactful interfaces that drive results.
        </p>

        <Button 
          onClick={() => scrollToSection('portfolio')}
          className="reveal reveal-delay-2 rounded-full px-8 py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
        >
          View my work
        </Button>

        {/* Value propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 reveal reveal-delay-3">
          <div className="text-left">
            <h3 className="font-semibold text-foreground mb-2">
              Helping you understand your users
            </h3>
            <p className="text-caption text-muted-foreground">
              No matter the industry or sector, my first task is always to understand your offering better than you. By uncovering what makes your business exceptional, I craft experiences that connect.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground mb-2">
              Don't worry, I've got this
            </h3>
            <p className="text-caption text-muted-foreground">
              I take full ownership of your projects, so you can focus on what matters most. With expertise delivering real results, you gain a competitive edge without the added hassle.
            </p>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground mb-2">
              Stay ahead, don't follow
            </h3>
            <p className="text-caption text-muted-foreground">
              Forget chasing competitors, you'll be too busy outpacing them. True market leaders thrive by embracing change, and I'll position you at the forefront with smart strategies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
