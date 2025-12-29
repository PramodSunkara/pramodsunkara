const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.15] dark:opacity-[0.08]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.2) 30%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'blob-morph 20s ease-in-out infinite',
        }}
      />
      
      {/* Secondary blob */}
      <div 
        className="absolute top-1/3 left-1/3 w-[400px] h-[400px] md:w-[500px] md:h-[500px] opacity-[0.12] dark:opacity-[0.06]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(280 60% 60% / 0.3) 0%, hsl(320 60% 50% / 0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blob-morph 25s ease-in-out infinite reverse',
        }}
      />
      
      {/* Tertiary accent blob */}
      <div 
        className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-[0.1] dark:opacity-[0.05]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(45 80% 60% / 0.25) 0%, hsl(30 70% 50% / 0.1) 40%, transparent 70%)',
          filter: 'blur(70px)',
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
            transform: translate(-50%, -50%) scale(1.05) rotate(90deg);
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          50% {
            transform: translate(-50%, -50%) scale(0.95) rotate(180deg);
            border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%;
          }
          75% {
            transform: translate(-50%, -50%) scale(1.02) rotate(270deg);
            border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%;
          }
        }
        
        @keyframes blob-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -20px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBackground;
