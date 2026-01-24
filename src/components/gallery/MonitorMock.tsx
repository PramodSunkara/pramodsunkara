import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface MonitorMockProps {
  screenshot: string;
  title: string;
  isActive?: boolean;
  className?: string;
}

// Fixed desktop width - scales down via wrapper on smaller screens
const SCREEN_WIDTH = 1100;
const SCREEN_HEIGHT = 600;
const FRAME_BORDER = 12; // px
const FRAME_WIDTH = SCREEN_WIDTH + FRAME_BORDER * 2;
const FRAME_HEIGHT = SCREEN_HEIGHT + FRAME_BORDER * 2;

const MonitorMock = ({ screenshot, title, isActive = false, className }: MonitorMockProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [imageHeight, setImageHeight] = useState(SCREEN_HEIGHT);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxScroll = Math.max(0, imageHeight - SCREEN_HEIGHT);
  const canAutoScroll = maxScroll > 10; // Only animate if there's meaningful scroll distance

  // Calculate animation duration based on scroll distance (8 seconds per 1000px)
  const animationDuration = Math.max(3, (maxScroll / 1000) * 8);

  // Scale the fixed-size monitor down to fit the available width (prevents clipping).
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

  // Load the actual image to get its dimensions
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Calculate the rendered height based on fixed width scaling
      // backgroundSize is "SCREEN_WIDTH auto", so height scales proportionally
      const renderedHeight = (SCREEN_WIDTH / img.naturalWidth) * img.naturalHeight;
      setImageHeight(Math.max(renderedHeight, SCREEN_HEIGHT));
    };
    img.src = screenshot;
  }, [screenshot]);

  // Start/stop animation based on active state and hover
  useEffect(() => {
    if (!isActive) {
      setIsAnimating(false);
    } else if (isActive && isHovering && canAutoScroll) {
      // Start animating if we become active while already hovering
      setIsAnimating(true);
    }
  }, [isActive, isHovering, canAutoScroll]);

  // Handle hover to start/stop auto-scroll
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (isActive && canAutoScroll) {
      setIsAnimating(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsAnimating(false);
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Responsive wrapper - scales the fixed-size monitor down on smaller screens */}
      <div ref={wrapperRef} className="w-full">
        {/* Layout box reserves the scaled size, while the inner frame is scaled via transform */}
        <div
          className="relative"
          style={{
            width: `${FRAME_WIDTH * scale}px`,
            height: `${FRAME_HEIGHT * scale}px`,
          }}
        >
          {/* Monitor frame with thick border - fixed pixel dimensions for crisp rendering */}
          <div
            className="absolute left-0 top-0 box-border rounded-xl overflow-hidden border-[12px] border-foreground shadow-2xl bg-foreground origin-top-left"
            style={{
              width: `${FRAME_WIDTH}px`,
              height: `${FRAME_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
          >
            {/* Screen content area - fixed pixel dimensions for crisp rendering */}
            <div 
              className="bg-card relative overflow-hidden"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ 
                cursor: isActive && canAutoScroll ? 'pointer' : 'default',
                width: `${SCREEN_WIDTH}px`,
                height: `${SCREEN_HEIGHT}px`,
              }}
            >
              {/* Auto-scroll keyframes injected via style tag */}
              <style>{`
                @keyframes autoScrollDown {
                  0% { transform: translateY(0) translateZ(0); }
                  45% { transform: translateY(-${maxScroll}px) translateZ(0); }
                  55% { transform: translateY(-${maxScroll}px) translateZ(0); }
                  100% { transform: translateY(0) translateZ(0); }
                }
              `}</style>
              
              {/* ScreenImage - div with background-image for crisp rendering */}
              <div
                aria-label={`${title} screenshot`}
                role="img"
                style={{
                  width: `${SCREEN_WIDTH}px`,
                  height: `${imageHeight}px`,
                  backgroundImage: `url(${screenshot})`,
                  backgroundSize: `${SCREEN_WIDTH}px auto`,
                  backgroundPosition: 'top center',
                  backgroundRepeat: 'no-repeat',
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  transform: isAnimating ? undefined : 'translateY(0) translateZ(0)',
                  animation: isAnimating 
                    ? `autoScrollDown ${animationDuration}s ease-in-out infinite`
                    : 'none',
                }}
              />
              
              {/* Hover hint - shows when active and can scroll but not yet animating */}
              {isActive && canAutoScroll && isHovering && !isAnimating && (
                <div 
                  className="absolute pointer-events-none z-50 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-full shadow-lg animate-fade-in"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  Hover to scroll
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorMock;
