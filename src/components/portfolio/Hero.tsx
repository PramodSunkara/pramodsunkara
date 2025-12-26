import { ChevronDown } from 'lucide-react';
import profileImage from '@/assets/pramod-profile.jpg';

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="container-narrow text-center">
        <img src={profileImage} alt="Pramod" className="w-32 h-32 rounded-full object-cover mx-auto mb-8 reveal border-4 border-primary/20" />
        <h1 className="text-hero text-foreground reveal mb-4 text-6xl font-extralight">
          I'm Pramod, designing and building web experiences that <em className="font-normal italic">connect,</em> <em className="font-normal italic">engage,</em> and <em className="font-normal italic">convert.</em>
        </h1>
        <p className="text-sm tracking-wide reveal reveal-delay-1 mb-8 text-yellow-500">
          Senior Web Developer · UI/UX Designer · Digital Experience Leader
        </p>
        
        <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-16 reveal reveal-delay-1 font-light text-base">With 19+ years of experience, I lead the design and development of smart, scalable websites and interfaces that align business strategy with meaningful user experiences.</p>

        <button 
          onClick={() => scrollToSection('portfolio')} 
          className="reveal reveal-delay-2 mx-auto flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
          aria-label="Scroll to portfolio"
        >
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </button>

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
    </section>;
};
export default Hero;