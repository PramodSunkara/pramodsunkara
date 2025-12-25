const highlights = [
  {
    category: 'Navigation UX',
    outcome: 'Redesigned complex navigation reducing user drop-off by 40%',
  },
  {
    category: 'Event Platforms',
    outcome: 'Built event registration systems serving 100K+ attendees',
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
    <section className="section-padding bg-card">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {highlights.map((item, index) => (
            <div 
              key={item.category}
              className={`reveal reveal-delay-${index + 1} p-6 rounded-lg border border-border bg-background transition-all duration-300 hover:border-primary/30`}
            >
              <p className="text-caption uppercase tracking-widest text-primary mb-3">
                {item.category}
              </p>
              <p className="text-body text-foreground">
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
