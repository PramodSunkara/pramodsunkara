import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isScrollBased, setIsScrollBased] = useState(true);
  const [transitionProgress, setTransitionProgress] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (!isScrollBased) return;

    const handleScroll = () => {
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        const startPoint = 250;
        const endPoint = 50;
        const animationDistance = startPoint - endPoint;

        if (rect.top > startPoint) {
          setTransitionProgress(0);
          setTheme('dark');
        } else if (rect.top <= endPoint) {
          setTransitionProgress(1);
          setTheme('light');
        } else {
          const distanceFromStart = startPoint - rect.top;
          const progress = Math.min(1, Math.max(0, distanceFromStart / animationDistance));
          setTransitionProgress(progress);
          // Switch theme when past halfway
          setTheme(progress > 0.5 ? 'light' : 'dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollBased]);

  const toggleTheme = useCallback(() => {
    setIsScrollBased(false);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme, transitionProgress };
};
