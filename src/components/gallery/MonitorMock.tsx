import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';


interface MonitorMockProps {
  screenshot: string;
  title: string;
  isActive?: boolean;
  className?: string;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

// Fixed desktop width - scales down via wrapper on smaller screens
const SCREEN_WIDTH = 1100;
const SCREEN_HEIGHT = 600;
const FRAME_BORDER = 12; // px
const FRAME_WIDTH = SCREEN_WIDTH + FRAME_BORDER * 2;
const FRAME_HEIGHT = SCREEN_HEIGHT + FRAME_BORDER * 2;

const MonitorMock = ({ 
  screenshot, 
  title, 
  isActive = false, 
  className,
  onNavigate,
  hasPrev = false,
  hasNext = false
}: MonitorMockProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [isImageReady, setIsImageReady] = useState(false);

  // Scale the fixed-size monitor down to fit the available width
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const available = el.clientWidth;
      if (!available) return;
      setScale(Math.min(1, available / FRAME_WIDTH));
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Load the actual image
  useEffect(() => {
    setIsImageReady(false);
    const img = new Image();
    img.onload = () => {
      setIsImageReady(true);
    };
    img.src = screenshot;
  }, [screenshot]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isModalOpen) return;
    
    if (e.key === 'ArrowLeft' && hasPrev && onNavigate) {
      e.preventDefault();
      onNavigate('prev');
    } else if (e.key === 'ArrowRight' && hasNext && onNavigate) {
      e.preventDefault();
      onNavigate('next');
    }
    // Escape is handled by Dialog component automatically
  }, [isModalOpen, hasPrev, hasNext, onNavigate]);

  // Add keyboard event listener when modal is open
  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isModalOpen, handleKeyDown]);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn("relative w-full cursor-pointer", className)}
            onClick={handleClick}
          >
            <div ref={wrapperRef} className="w-full">
              <div
                className="relative"
                style={{
                  width: `${FRAME_WIDTH * scale}px`,
                  height: `${FRAME_HEIGHT * scale}px`,
                }}
              >
                <div
                  className="absolute left-0 top-0 box-border rounded-xl overflow-hidden border-[12px] border-foreground shadow-2xl bg-foreground origin-top-left transition-transform duration-200 hover:scale-[1.02]"
                  style={{
                    width: `${FRAME_WIDTH}px`,
                    height: `${FRAME_HEIGHT}px`,
                    transform: `scale(${scale})`,
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <div 
                    className="bg-card relative overflow-hidden"
                    style={{ 
                      width: `${SCREEN_WIDTH}px`,
                      height: `${SCREEN_HEIGHT}px`,
                    }}
                  >
                    <div
                      aria-label={`${title} screenshot`}
                      role="img"
                      style={{
                        width: `${SCREEN_WIDTH}px`,
                        height: `${SCREEN_HEIGHT}px`,
                        backgroundImage: `url(${screenshot})`,
                        backgroundSize: `${SCREEN_WIDTH}px auto`,
                        backgroundPosition: 'top center',
                        backgroundRepeat: 'no-repeat',
                        imageRendering: '-webkit-optimize-contrast',
                      }}
                    />

                    {!isImageReady && (
                      <div className="absolute inset-0 grid place-items-center bg-background/60">
                        <div className="rounded-full bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
                          Loading…
                        </div>
                      </div>
                    )}
                    
                    {/* Click hint overlay */}
                    {isHovering && (
                      <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center pointer-events-none">
                        <div className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-full shadow-lg animate-fade-in">
                          Click to view full page
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-foreground text-background">
          Click to expand and scroll
        </TooltipContent>
      </Tooltip>

      {/* Full-page modal for scrolling */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh] p-0 flex flex-col overflow-hidden bg-card border-border">
          {/* Header - fixed at top */}
          <div className="flex-shrink-0 px-6 py-4 border-b border-border bg-card/80 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-foreground pr-8">{title}</h2>
          </div>
          
          {/* Scrollable content */}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
            <img 
              src={screenshot} 
              alt={`${title} full screenshot`}
              className="w-full h-auto block"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MonitorMock;
