const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Smooth radial gradient background with more color stops to prevent banding */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 90% 70% at 50% 40%,
              hsl(45 70% 50% / 0.15) 0%,
              hsl(42 68% 48% / 0.13) 10%,
              hsl(40 65% 47% / 0.11) 20%,
              hsl(35 60% 45% / 0.09) 30%,
              hsl(300 45% 48% / 0.07) 40%,
              hsl(280 40% 50% / 0.05) 50%,
              hsl(260 35% 50% / 0.03) 60%,
              transparent 75%
            )
          `,
        }}
      />
      
      {/* Subtle warm glow with smoother falloff */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 55% at 50% 35%, 
              hsl(45 75% 55% / 0.10) 0%, 
              hsl(45 70% 52% / 0.07) 20%,
              hsl(45 65% 50% / 0.04) 40%,
              transparent 60%
            )
          `,
        }}
      />
      
      {/* Noise texture overlay to break up gradient banding */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
    </div>
  );
};

export default HeroBackground;
