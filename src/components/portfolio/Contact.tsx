import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Linkedin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DecorativeBlobs from './DecorativeBlobs';
import Sparkle from './Sparkle';

const Contact = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for reaching out!",
      description: "I'll get back to you soon.",
    });
    setEmail('');
  };

  return (
    <section id="contact" className="bg-dark-section text-dark-section-foreground relative overflow-hidden">
      <DecorativeBlobs variant="footer" />
      
      <div className="section-padding relative z-10">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Headline */}
            <div className="reveal">
              <div className="relative inline-block">
                <Sparkle className="absolute -top-4 -left-6 text-blob-orange/50" size="sm" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                  Shall we work
                  <br />
                  <em className="font-normal">together?</em>
                </h2>
              </div>
              
              <p className="text-body opacity-70 mb-8">
                Open to senior roles in web development, UI/UX engineering, and design leadership.
              </p>

              <div className="flex items-center gap-4">
                <a 
                  href="https://linkedin.com/in/pramodsunkara" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-section-foreground/10 flex items-center justify-center transition-colors duration-300 hover:bg-dark-section-foreground/20"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right side - Subscribe card */}
            <div className="reveal reveal-delay-1">
              <div className="bg-card text-card-foreground p-8 rounded-3xl">
                <h3 className="text-lg font-semibold mb-2">
                  Get in touch
                </h3>
                <p className="text-caption text-muted-foreground mb-6">
                  Drop me a line and let's discuss your project.
                </p>
                
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-background border-border rounded-full px-5"
                  />
                  <Button 
                    type="submit" 
                    className="h-12 px-6 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
