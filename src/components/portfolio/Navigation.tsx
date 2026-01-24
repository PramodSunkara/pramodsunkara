import { useTheme } from '@/hooks/useTheme';
import { useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Work', href: '#teams' },
  { label: 'Skills', href: '#skills' },
  { label: 'Gallery', href: '/gallery', isRoute: true },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavClick = (item: NavItem) => {
    if (item.isRoute) {
      navigate(item.href);
    } else {
      const id = item.href.replace('#', '');
      
      // If not on home page, navigate to home first then scroll
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
            onClick={() => handleNavClick(item)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full ${
              theme === 'dark'
                ? 'hover:bg-white/10'
                : 'hover:bg-primary-foreground/10'
            }${
              item.isRoute && location.pathname === item.href
                ? theme === 'dark'
                  ? ' bg-white/15'
                  : ' bg-primary-foreground/15'
                : ''
            }`}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={toggleTheme}
          className={`ml-1 p-2 rounded-full transition-colors duration-200 ${
            theme === 'dark'
              ? 'hover:bg-white/10'
              : 'hover:bg-primary-foreground/10'
          }`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Navigation;
