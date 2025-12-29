const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary blob - warm gold/amber */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(45 90% 55% / 0.4) 0%, hsl(35 80% 50% / 0.25) 35%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'blob-morph 20s ease-in-out infinite',
        }}
      />
      
      {/* Secondary blob - magenta/purple */}
      <div 
        className="absolute top-1/3 left-1/5 w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(300 70% 55% / 0.35) 0%, hsl(280 60% 50% / 0.2) 40%, transparent 65%)',
          filter: 'blur(50px)',
          animation: 'blob-morph 25s ease-in-out infinite reverse',
        }}
      />
      
      {/* Tertiary blob - cyan/teal */}
      <div 
        className="absolute bottom-1/3 right-1/5 w-[350px] h-[350px] md:w-[550px] md:h-[550px]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(190 80% 50% / 0.3) 0%, hsl(210 70% 45% / 0.15) 40%, transparent 65%)',
          filter: 'blur(55px)',
          animation: 'blob-float 18s ease-in-out infinite',
        }}
      />

      {/* Fourth blob - subtle pink accent */}
      <div 
        className="absolute top-2/3 right-1/3 w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(340 75% 55% / 0.25) 0%, hsl(320 65% 50% / 0.12) 40%, transparent 65%)',
          filter: 'blur(50px)',
          animation: 'blob-float 22s ease-in-out infinite reverse',
        }}
      />

      <style>{`
        @keyframes blob-morph {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            transform: translate(-45%, -55%) scale(1.1) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            transform: translate(-55%, -45%) scale(0.92) rotate(180deg);
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% {
            transform: translate(-50%, -50%) scale(1.05) rotate(270deg);
            border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
          }
        }
        
        @keyframes blob-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -40px) scale(1.1);
          }
          66% {
            transform: translate(-40px, 40px) scale(0.92);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;
