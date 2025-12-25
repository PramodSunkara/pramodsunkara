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
    <section className="section-padding bg-card">
      <div className="container-narrow">
        <h2 className="text-section text-center mb-4 reveal">Process</h2>
        <p className="text-body text-muted-foreground text-center max-w-2xl mx-auto mb-16 reveal reveal-delay-1">
          A flexible, user-centered approach adapted to each project's unique needs.
        </p>

        {/* Desktop: Horizontal flow */}
        <div className="hidden md:flex items-start justify-between gap-4 reveal reveal-delay-2">
          {steps.map((step, index) => (
            <div key={step.title} className="flex-1 relative">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center mx-auto mb-4">
                  <span className="font-semibold text-primary">{index + 1}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-caption text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-border" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile: Vertical flow */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => (
            <div 
              key={step.title} 
              className={`reveal reveal-delay-${index + 1} flex gap-4`}
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
                  <span className="font-semibold text-sm text-primary">{index + 1}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-2" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-caption text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
