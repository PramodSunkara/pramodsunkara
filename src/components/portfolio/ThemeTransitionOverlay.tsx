import { useEffect, useState } from 'react';

const ThemeTransitionOverlay = () => {
  const [progress, setProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills');
      if (!skillsSection) return;

      const rect = skillsSection.getBoundingClientRect();
      const startPoint = 250; // Start animation when section is 250px from top
      const endPoint = 50;    // Complete animation at 50px from top
      const animationDistance = startPoint - endPoint;

      if (rect.top > startPoint) {
        // Section is below trigger - no overlay
        setProgress(0);
        setIsActive(false);
      } else if (rect.top <= endPoint) {
        // Animation complete
        setProgress(1);
        setIsActive(false);
      } else {
        // In transition zone
        const distanceFromStart = startPoint - rect.top;
        const newProgress = Math.min(1, Math.max(0, distanceFromStart / animationDistance));
        setProgress(newProgress);
        setIsActive(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render if not in transition or complete
  if (progress === 0 || progress === 1) return null;

  return (
    <div 
      className="theme-transition-overlay"
      style={{ 
        height: `${progress * 100}vh`,
      }}
    >
      {/* Glowing white line at the leading edge */}
      <div className="theme-transition-line" />
    </div>
  );
};

export default ThemeTransitionOverlay;
