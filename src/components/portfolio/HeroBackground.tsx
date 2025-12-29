const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Simple, clean gradient background - no banding */}
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-30"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 30%, hsl(45 60% 55% / 0.3), transparent 70%)`,
        }}
      />
      
      {/* Subtle secondary glow */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-15"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 50%, hsl(280 40% 50% / 0.2), transparent 60%)`,
        }}
      />
    </div>
  );
};

export default HeroBackground;
