const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(45 80% 55% / 0.25) 0%, hsl(35 70% 50% / 0.15) 30%, transparent 60%)',
          filter: 'blur(80px)',
          animation: 'blob-morph 20s ease-in-out infinite',
        }}
      />
      
      {/* Secondary blob - purple/pink tones */}
      <div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(280 50% 60% / 0.2) 0%, hsl(320 50% 50% / 0.1) 40%, transparent 65%)',
          filter: 'blur(70px)',
          animation: 'blob-morph 25s ease-in-out infinite reverse',
        }}
      />
      
      {/* Tertiary accent blob - warm tones */}
      <div 
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(200 60% 55% / 0.15) 0%, hsl(220 50% 50% / 0.08) 40%, transparent 65%)',
          filter: 'blur(60px)',
          animation: 'blob-float 18s ease-in-out infinite',
        }}
      />

      <style>{`
        @keyframes blob-morph {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          25% {
            transform: translate(-48%, -52%) scale(1.08) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            transform: translate(-52%, -48%) scale(0.95) rotate(180deg);
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% {
            transform: translate(-50%, -50%) scale(1.04) rotate(270deg);
            border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
          }
        }
        
        @keyframes blob-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -30px) scale(1.08);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.94);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;
