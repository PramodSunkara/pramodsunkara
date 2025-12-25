import Sparkle from './Sparkle';

const About = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-blob-green/10 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-20 -right-24 w-48 h-48 rounded-full bg-blob-yellow/10 blur-3xl pointer-events-none" aria-hidden="true" />
      
      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="relative inline-block">
              <Sparkle className="absolute -top-3 -right-5 text-blob-orange/50" size="sm" />
              <h2 className="text-section mb-8 reveal">About</h2>
            </div>
            <p className="text-body text-muted-foreground leading-relaxed reveal reveal-delay-1">
              We may work remotely, but we deliver mighty results. My approach provides a personalized service, guiding you every step of the way. Being a focused practitioner means I move swiftly and respond quickly, ensuring you always have timely support and attention.
            </p>
          </div>

          <div className="space-y-8 reveal reveal-delay-2">
            <div className="p-8 rounded-3xl bg-card">
              <p className="text-body text-foreground leading-relaxed mb-6">
                I'm a design-technologist who believes the best digital experiences emerge at the intersection of aesthetics, usability, and business goals. With 19 years in the industry, I've learned that great work comes from deep collaboration, clear communication, and an unwavering focus on the end user.
              </p>

              <p className="text-body text-muted-foreground leading-relaxed mb-6">
                My career has spanned agencies, startups, and enterprise organizations. I've led teams, built design systems from scratch, and shipped products used by millions.
              </p>

              <p className="text-body text-muted-foreground leading-relaxed">
                When I'm not at the keyboard, you'll find me spending time with my family, watching movies, or dreaming about our next beach vacation.
              </p>
            </div>

            <div className="flex items-center gap-6 px-2">
              <div>
                <p className="font-semibold text-foreground">Pramod Sunkara</p>
                <p className="text-caption text-muted-foreground">Senior Web Developer & UI/UX Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
