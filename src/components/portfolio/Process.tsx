import { useEffect, useRef, useState } from 'react';

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
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSteps((prev) => 
                prev.includes(index) ? prev : [...prev, index]
              );
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section id="process" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-section mb-4 reveal">Process</h2>
        <p className="text-body text-muted-foreground max-w-2xl mb-16 reveal reveal-delay-1">
          A flexible, user-centered approach adapted to each project's unique needs.
        </p>

        {/* Stacking sticky cards */}
        <div className="relative">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index);
            
            return (
              <div
                key={step.title}
                ref={(el) => (stepRefs.current[index] = el)}
                className="sticky"
                style={{
                  top: `${120 + index * 20}px`,
                  marginBottom: index === steps.length - 1 ? '0' : '60px',
                  zIndex: index + 1,
                }}
              >
                <div 
                  className="p-6 md:p-8 rounded-2xl bg-card border border-border transition-all duration-700 ease-out"
                  style={{
                    transform: isVisible 
                      ? 'translateY(0) scale(1)' 
                      : 'translateY(100px) scale(0.9)',
                    opacity: isVisible ? 1 : 0,
                    boxShadow: `0 ${10 + index * 4}px ${30 + index * 8}px -15px hsl(var(--foreground) / ${0.08 + index * 0.02})`,
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div 
                      className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold flex-shrink-0 transition-all duration-500"
                      style={{
                        transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-180deg)',
                        transitionDelay: '0.1s',
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className="font-semibold text-xl text-foreground mb-2 transition-all duration-500"
                        style={{
                          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                          opacity: isVisible ? 1 : 0,
                          transitionDelay: '0.15s',
                        }}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-body text-muted-foreground transition-all duration-500"
                        style={{
                          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                          opacity: isVisible ? 1 : 0,
                          transitionDelay: '0.25s',
                        }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Spacer for last card to scroll past */}
          <div className="h-32" />
        </div>
      </div>
    </section>
  );
};

export default Process;
