import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { AnimatedDog } from './Chatbot';

const SESSION_STORAGE_KEY = 'exitFeedbackShown';
const MIN_TIME_ON_PAGE = 8000; // 8 seconds
const MIN_CHARS = 5;
const MAX_CHARS = 500;

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export default function ExitIntentFeedback() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasMetMinTime, setHasMetMinTime] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Track minimum time on page
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMetMinTime(true);
    }, MIN_TIME_ON_PAGE);

    return () => clearTimeout(timer);
  }, []);

  // Exit intent detection (desktop only)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of viewport
      if (e.clientY > 10) return;
      
      // Check if already shown this session
      if (sessionStorage.getItem(SESSION_STORAGE_KEY)) return;
      
      // Check minimum time requirement
      if (!hasMetMinTime) return;

      // Mark as shown and open modal
      sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
      previousActiveElement.current = document.activeElement as HTMLElement;
      setIsOpen(true);
    };

    // Only add listener on desktop (no reliable exit intent on mobile)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasMetMinTime]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setFeedback('');
    setSubmitState('idle');
    setErrorMessage('');
    
    // Restore focus
    setTimeout(() => {
      previousActiveElement.current?.focus();
    }, 100);
  }, []);

  // Focus trap and ESC key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus textarea when modal opens
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }

      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeModal]);

  // Auto-close after success
  useEffect(() => {
    if (submitState === 'success') {
      const timer = setTimeout(() => {
        closeModal();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [submitState, closeModal]);


  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source'),
      utmMedium: params.get('utm_medium'),
      utmCampaign: params.get('utm_campaign'),
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedFeedback = feedback.trim();
    
    // Client-side validation
    if (trimmedFeedback.length < MIN_CHARS) {
      setErrorMessage(`Please enter at least ${MIN_CHARS} characters`);
      return;
    }
    
    if (trimmedFeedback.length > MAX_CHARS) {
      setErrorMessage(`Feedback must be ${MAX_CHARS} characters or less`);
      return;
    }

    setSubmitState('loading');
    setErrorMessage('');

    try {
      const utmParams = getUtmParams();
      
      const metadata = {
        pageUrl: window.location.href,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent,
        acceptLanguage: navigator.language,
        timezoneOffset: new Date().getTimezoneOffset(),
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        ...utmParams,
      };

      const response = await supabase.functions.invoke('submit-feedback', {
        body: {
          feedbackText: trimmedFeedback,
          honeypot: '', // Empty honeypot field
          metadata,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to submit feedback');
      }

      const data = response.data;
      if (!data.ok) {
        throw new Error(data.error || 'Failed to submit feedback');
      }

      setSubmitState('success');
    } catch (error) {
      console.error('Feedback submission error:', error);
      setSubmitState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  const charCount = feedback.length;
  const isValidLength = charCount >= MIN_CHARS && charCount <= MAX_CHARS;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Overlay - click to dismiss */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer" 
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-feedback-title"
            className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Close feedback dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {submitState === 'success' ? (
              // Success state
              <motion.div
                className="flex flex-col items-center py-8 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                >
                  <Check className="h-8 w-8 text-primary" />
                </motion.div>
                <p className="text-lg font-medium text-foreground">
                  Thanks — I really appreciate it.
                </p>
              </motion.div>
            ) : (
              // Form state
              <form onSubmit={handleSubmit}>
                {/* Tail wag animation for Simba */}
                <style>{`
                  @keyframes wag {
                    from { transform: rotate(-10deg); }
                    to { transform: rotate(10deg); }
                  }
                `}</style>
                
                <motion.div
                  className="flex justify-center mb-4"
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <AnimatedDog size={80} />
                </motion.div>

                <h2
                  id="exit-feedback-title"
                  className="mb-2 text-center text-xl font-semibold text-foreground"
                >
                  Thank you for your time!
                </h2>
                
                <p className="mb-6 text-center text-sm text-muted-foreground">
                  Please drop a line of feedback — I would love to hear from you.
                </p>

                {/* Honeypot field (hidden from users) */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="mb-4">
                  <Textarea
                    ref={textareaRef}
                    value={feedback}
                    onChange={(e) => {
                      setFeedback(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="Type your feedback here…"
                    rows={4}
                    maxLength={MAX_CHARS}
                    className="resize-none"
                    disabled={submitState === 'loading'}
                    aria-describedby="char-count feedback-error"
                  />
                  
                  <div className="mt-2 flex items-center justify-between text-xs">
                    {errorMessage && (
                      <p id="feedback-error" className="text-destructive" role="alert">
                        {errorMessage}
                      </p>
                    )}
                    <p
                      id="char-count"
                      className={`ml-auto ${
                        charCount > MAX_CHARS
                          ? 'text-destructive'
                          : charCount >= MIN_CHARS
                          ? 'text-muted-foreground'
                          : 'text-muted-foreground/60'
                      }`}
                    >
                      {charCount}/{MAX_CHARS} characters
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={submitState === 'loading' || !isValidLength}
                >
                  {submitState === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send feedback
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
