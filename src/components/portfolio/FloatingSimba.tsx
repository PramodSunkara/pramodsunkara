import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedDog } from './Chatbot';

const FloatingSimba = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isAtContact, setIsAtContact] = useState(false);

  // Timer trigger - 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 7000);
    return () => clearTimeout(timer);
  }, [isDismissed]);

  // Intersection Observer for Teams section (to show) and Contact section (to hide)
  useEffect(() => {
    const teamsSection = document.getElementById('teams');
    const contactSection = document.getElementById('contact');

    const teamsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isDismissed) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        setIsAtContact(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (teamsSection) teamsObserver.observe(teamsSection);
    if (contactSection) contactObserver.observe(contactSection);

    return () => {
      teamsObserver.disconnect();
      contactObserver.disconnect();
    };
  }, [isDismissed]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  const shouldShow = isVisible && !isDismissed && !isAtContact;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="fixed bottom-24 right-6 z-40"
        >
          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute -top-10 right-0 whitespace-nowrap bg-card text-card-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-lg border border-border"
          >
            Hi, I'm Simba
            {/* Speech bubble arrow */}
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          </motion.div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-5 h-5 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center shadow-sm transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>

          {/* Clickable dog with bounce animation */}
          <motion.button
            onClick={scrollToBottom}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="cursor-pointer hover:scale-110 transition-transform"
            aria-label="Scroll to bottom"
          >
            <div>
              <AnimatedDog size={56} />
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingSimba;
