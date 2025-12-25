const About = () => {
  return (
    <section className="section-padding">
      <div className="container-narrow max-w-3xl">
        <h2 className="text-section text-center mb-12 reveal">About</h2>

        <div className="space-y-6 reveal reveal-delay-1">
          <p className="text-body text-foreground leading-relaxed">
            I'm a design-technologist who believes the best digital experiences emerge at the intersection of aesthetics, usability, and business goals. With 19 years in the industry, I've learned that great work comes from deep collaboration, clear communication, and an unwavering focus on the end user.
          </p>

          <p className="text-body text-muted-foreground leading-relaxed">
            My career has spanned agencies, startups, and enterprise organizations. I've led teams, built design systems from scratch, and shipped products used by millions. I thrive in environments where design and engineering work as partners, not hand-off points.
          </p>

          <p className="text-body text-muted-foreground leading-relaxed">
            I approach problems with curiosity and pragmatism. I'm as comfortable whiteboarding user flows as I am debugging CSS in production. I believe in measuring outcomes, not just outputs, and in creating work that stands the test of time.
          </p>

          <p className="text-body text-foreground leading-relaxed mt-8">
            When I'm not at the keyboard, you'll find me spending time with my family, watching movies, or dreaming about our next beach vacation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
