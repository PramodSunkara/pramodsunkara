const steps = [
  {
    title: 'Discover',
    description: 'Research, stakeholder interviews, and understanding the problem space.',
  },
  {
    title: 'Design',
    description: 'Wireframes, visual design, and creating intuitive user experiences.',
  },
  {
    title: 'Prototype',
    description: 'Interactive prototypes for testing and stakeholder alignment.',
  },
  {
    title: 'Build',
    description: 'Clean, maintainable code with attention to detail and performance.',
  },
  {
    title: 'Optimize',
    description: 'Testing, iteration, and data-driven improvements.',
  },
  {
    title: 'Iterate',
    description: 'Continuous refinement based on user feedback and metrics.',
  },
];

const Process = () => {
  return (
    <section id="process" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-section mb-4 reveal">Process</h2>
        <p className="text-body text-muted-foreground max-w-2xl mb-16 reveal reveal-delay-1">
          A flexible, user-centered approach adapted to each project's unique needs.
        </p>

        {/* Desktop: Horizontal flow */}
        <div className="hidden md:grid md:grid-cols-6 gap-4 reveal reveal-delay-2">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="p-5 rounded-2xl bg-secondary/50 h-full transition-colors duration-300 hover:bg-secondary">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-caption text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Vertical flow */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`reveal reveal-delay-${index + 1} p-5 rounded-2xl bg-secondary/50`}
            >
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold mb-3">
                {index + 1}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
              <p className="text-caption text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
