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
        { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
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

        {/* Stacking cards */}
        <div className="relative">
          {steps.map((step, index) => {
            const isVisible = visibleSteps.includes(index);
            const stackOffset = Math.min(visibleSteps.filter(v => v < index).length * 4, 20);
            
            return (
              <div
                key={step.title}
                ref={(el) => (stepRefs.current[index] = el)}
                className="mb-4 last:mb-0"
                style={{
                  transform: isVisible 
                    ? `translateY(0) scale(1)` 
                    : `translateY(40px) scale(0.95)`,
                  opacity: isVisible ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                }}
              >
                <div 
                  className={`p-6 md:p-8 rounded-2xl bg-secondary/50 backdrop-blur-sm border border-border/50 transition-all duration-500 hover:bg-secondary hover:shadow-lg ${
                    isVisible ? 'hover:scale-[1.02]' : ''
                  }`}
                  style={{
                    boxShadow: isVisible 
                      ? `0 ${4 + index * 2}px ${20 + index * 5}px -10px hsl(var(--foreground) / 0.1)` 
                      : 'none',
                  }}
                >
                  <div className="flex items-start gap-5">
                    <div 
                      className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-semibold flex-shrink-0 transition-transform duration-500"
                      style={{
                        transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-180deg)',
                        transitionDelay: `${index * 0.1 + 0.2}s`,
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
                          transitionDelay: `${index * 0.1 + 0.15}s`,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-body text-muted-foreground transition-all duration-500"
                        style={{
                          transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                          opacity: isVisible ? 1 : 0,
                          transitionDelay: `${index * 0.1 + 0.25}s`,
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
        </div>
      </div>
    </section>
  );
};

export default Process;
