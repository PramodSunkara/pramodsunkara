import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message received!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-narrow max-w-2xl">
        <h2 className="text-section text-center mb-4 reveal">Get in Touch</h2>
        <p className="text-body text-muted-foreground text-center mb-12 reveal reveal-delay-1">
          I'm always open to discussing new opportunities, interesting projects, or ways to collaborate.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 reveal reveal-delay-2">
          <div>
            <Input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-12 bg-card border-border focus:border-primary"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="h-12 bg-card border-border focus:border-primary"
            />
          </div>
          <div>
            <Textarea
              placeholder="Your message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={5}
              className="bg-card border-border focus:border-primary resize-none"
            />
          </div>
          <Button type="submit" className="w-full h-12 text-base">
            Send Message
          </Button>
        </form>

        <div className="flex items-center justify-center gap-6 mt-12 reveal reveal-delay-3">
          <a 
            href="mailto:hello@pramodsunkara.com" 
            className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            <Mail className="w-5 h-5" />
            <span className="text-body link-underline">Email</span>
          </a>
          <a 
            href="https://linkedin.com/in/pramodsunkara" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground transition-colors duration-300 hover:text-primary"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-body link-underline">LinkedIn</span>
          </a>
        </div>

        <p className="text-caption text-muted-foreground text-center mt-8 reveal reveal-delay-4">
          Open to senior roles in web development, UI/UX engineering, and design leadership.
        </p>
      </div>
    </section>
  );
};

export default Contact;
