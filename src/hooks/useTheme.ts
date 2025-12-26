import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isScrollBased, setIsScrollBased] = useState(true);

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
        const triggerPoint = window.innerHeight * 0.3;
        
        if (rect.top <= triggerPoint) {
          setTheme('light');
        } else {
          setTheme('dark');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrollBased]);

  const toggleTheme = useCallback(() => {
    setIsScrollBased(false);
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return { theme, toggleTheme };
};
