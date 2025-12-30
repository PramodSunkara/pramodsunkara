import { Linkedin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import Chatbot from './Chatbot';

const Contact = () => {
  const contactInfo = {
    email: 'sunkara.pramod@gmail.com',
    phone: '817-437-4139',
    linkedin: 'https://linkedin.com/in/pramodsunkara'
  };

  return (
    <section id="contact" className="bg-dark-section text-dark-section-foreground">
      <div className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left side - Headline + Chatbot */}
            <div className="reveal">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Shall we work
                <br />
                <em className="font-normal">together?</em>
              </h2>
              
              <p className="text-body opacity-70 mb-12">
                Open to senior roles in web development, UI/UX engineering, and design leadership.
              </p>
              
              {/* Static Chatbot */}
              <Chatbot />
            </div>

            {/* Right side - Contact card */}
            <div className="reveal reveal-delay-1">
              <div className="bg-card text-card-foreground p-8 rounded-3xl">
                <h3 className="text-lg font-semibold mb-6">
                  Get in touch
                </h3>
                
                {/* Contact Links */}
                <div className="space-y-4">
                  {/* Email */}
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-sm sm:text-base truncate">{contactInfo.email}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </a>

                  {/* Phone */}
                  <a 
                    href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium text-sm sm:text-base">{contactInfo.phone}</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-background/50 hover:bg-background transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <p className="font-medium text-sm sm:text-base">pramodsunkara</p>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
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
