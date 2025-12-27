const About = () => {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-narrow px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-section mb-6 reveal">About</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed reveal reveal-delay-1 mb-8 md:mb-12">
              We may work remotely, but we deliver mighty results. My approach provides a personalized service, guiding you every step of the way. Being a focused practitioner means I move swiftly and respond quickly, ensuring you always have timely support and attention.
            </p>

            {/* Awards */}
            <div className="reveal reveal-delay-2">
              <h3 className="font-semibold text-lg mb-4 text-foreground">
                Awards
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground text-base">Above & Beyond Award</p>
                  <p className="text-sm text-muted-foreground">SumTotal Systems</p>
                </div>
                <div>
                  <p className="font-medium text-foreground text-base">Employee Achievement Award</p>
                  <p className="text-sm text-muted-foreground">Skillsoft</p>
                </div>
                <div>
                  <p className="font-medium text-foreground text-base">Spot Award</p>
                  <p className="text-sm text-muted-foreground">SumTotal Systems</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8 reveal reveal-delay-2">
            <div className="p-6 md:p-8 rounded-3xl bg-card">
              <p className="text-sm md:text-base text-foreground leading-relaxed mb-4 md:mb-6">
                I'm a design-technologist who believes the best digital experiences emerge at the intersection of aesthetics, usability, and business goals. With 19 years in the industry, I've learned that great work comes from deep collaboration, clear communication, and an unwavering focus on the end user.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 md:mb-6">
                My career has spanned agencies, startups, and enterprise organizations. I've led teams, built design systems from scratch, and shipped products used by millions.
              </p>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                When I'm not at the keyboard, you'll find me spending time with my family, watching movies, or dreaming about our next beach vacation.
              </p>
            </div>

            <div className="flex items-center gap-6 px-2">
              <div>
                <p className="font-semibold text-foreground text-base">Pramod Sunkara</p>
                <p className="text-sm text-muted-foreground">Senior Web Developer & UI/UX Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
