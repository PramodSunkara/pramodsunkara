import { SparklesCore } from '@/components/ui/sparkles';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  // Parallax effect - sparkles move slower than scroll (0.3x speed)
  const sparklesY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sparkles particle animation with parallax - behind everything */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: sparklesY }}
      >
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.3}
          maxSize={0.8}
          particleDensity={50}
          speed={2.4}
          className="absolute inset-0 w-full h-full"
          particleColor="#d4af37"
        />
      </motion.div>
      
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
