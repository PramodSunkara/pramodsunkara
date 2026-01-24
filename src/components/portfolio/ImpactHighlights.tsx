const highlights = [
  {
    category: 'Navigation UX',
    outcome: 'Redesigned complex navigation reducing user drop-off by 40%',
  },
  {
    category: 'Event Platforms',
    outcome: 'Built pixel-perfect, user-centric sites that boosted registrations by 3×',
  },
  {
    category: 'Conversion UX',
    outcome: 'Optimized landing pages achieving 3x conversion improvement',
  },
  {
    category: 'Performance',
    outcome: 'Reduced page load times by 60% through strategic optimization',
  },
];

const ImpactHighlights = () => {
  return (
    <section id="highlights" className="section-padding bg-secondary/50">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {highlights.map((item, index) => (
            <div 
              key={item.category}
              className={`reveal reveal-delay-${Math.min(index + 1, 2)} p-6 rounded-2xl bg-card transition-all duration-200 hover:shadow-md`}
            >
              <p className="text-caption uppercase tracking-widest text-muted-foreground mb-3">
                {item.category}
              </p>
              <p className="text-body text-foreground font-medium">
                {item.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactHighlights;
