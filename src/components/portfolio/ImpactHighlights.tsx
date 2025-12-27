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
    <section className="section-padding bg-secondary/50">
      <div className="container-narrow px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, index) => (
            <div 
              key={item.category}
              className={`reveal reveal-delay-${index + 1} p-4 md:p-6 rounded-2xl bg-card transition-all duration-300 hover:shadow-md`}
            >
              <p className="text-xs tracking-widest text-muted-foreground mb-2">
                {item.category}
              </p>
              <p className="text-sm md:text-base text-foreground font-medium">
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
