import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingBackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      onClick={handleBackClick}
      className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-lg hover:bg-card hover:scale-110 transition-all duration-300 group"
      aria-label="Back to Home"
    >
      <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </motion.button>
  );
};

export default FloatingBackButton;
