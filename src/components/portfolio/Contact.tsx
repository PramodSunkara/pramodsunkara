import { Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  const contactInfo = {
    email: 'pramod.sunkara@gmail.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'https://linkedin.com/in/pramodsunkara'
  };

  return (
    <section id="contact" className="bg-dark-section text-dark-section-foreground">
      <div className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left side - Headline */}
            <div className="reveal">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Shall we work
                <br />
                <em className="font-normal">together?</em>
              </h2>
              
              <p className="text-body opacity-70">
                Open to senior roles in web development, UI/UX engineering, and design leadership.
              </p>
            </div>

            {/* Right side - Contact card */}
            <div className="reveal reveal-delay-1">
              <div className="bg-card text-card-foreground p-8 rounded-3xl">
                <h3 className="text-lg font-semibold mb-2">
                  Get in touch
                </h3>
                <p className="text-caption text-muted-foreground mb-8">
                  Drop me a line and let's discuss your project.
                </p>
                
                {/* Contact Links */}
                <div className="space-y-4">
                  {/* Email */}
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{contactInfo.email}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* Phone */}
                  <a 
                    href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{contactInfo.phone}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Linkedin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-medium">pramodsunkara</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
