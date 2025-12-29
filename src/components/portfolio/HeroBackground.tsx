const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Smooth radial gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 60% at 50% 40%,
              hsl(45 70% 50% / 0.18) 0%,
              hsl(35 60% 45% / 0.12) 25%,
              hsl(280 40% 50% / 0.08) 45%,
              transparent 70%
            )
          `,
        }}
      />
      
      {/* Subtle warm glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 35%, hsl(45 80% 55% / 0.12) 0%, transparent 50%)',
        }}
      />
      
      {/* Soft purple accent */}
      <div 
        className="absolute top-1/4 left-1/4 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 30% 30%, hsl(280 50% 55% / 0.08) 0%, transparent 50%)',
        }}
      />
      
      {/* Soft blue accent */}
      <div 
        className="absolute bottom-0 right-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse 40% 40% at 70% 70%, hsl(200 50% 50% / 0.06) 0%, transparent 50%)',
        }}
      />
    </div>
  );
};

export default HeroBackground;
