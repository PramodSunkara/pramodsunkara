import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

const navItems = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
];

const Navigation = () => {
  const { theme } = useTheme();
  
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav 
        className={`flex items-center gap-1 px-2 py-2 rounded-full shadow-lg transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-white/10 backdrop-blur-md text-white border border-white/20' 
            : 'bg-primary text-primary-foreground'
        }`}
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
              theme === 'dark'
                ? 'hover:bg-white/10'
                : 'hover:bg-primary-foreground/10'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      
      <Button
        onClick={() => scrollToSection('#contact')}
        className={`fixed top-6 right-6 rounded-full px-5 py-2 border shadow-md transition-all duration-500 ${
          theme === 'dark'
            ? 'bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20'
            : 'bg-card text-foreground border-border hover:bg-secondary'
        }`}
        variant="ghost"
      >
        <span className="w-2 h-2 rounded-full bg-olive mr-2" />
        Get in touch
      </Button>
    </header>
  );
};

export default Navigation;
