import { cn } from '@/lib/utils';
import { useEffect, useRef, useState, useCallback } from 'react';

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
  const screenRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [imageHeight, setImageHeight] = useState(SCREEN_HEIGHT * 5); // Default tall
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasReachedStart, setHasReachedStart] = useState(true);

  const maxScroll = Math.max(0, imageHeight - SCREEN_HEIGHT);

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
      // Calculate the rendered height based on cover sizing
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const screenAspect = SCREEN_WIDTH / SCREEN_HEIGHT;
      
      let renderedHeight: number;
      if (imgAspect < screenAspect) {
        // Image is taller relative to screen - width fills, height extends
        renderedHeight = SCREEN_WIDTH / imgAspect;
      } else {
        // Image is wider relative to screen - use natural proportions
        renderedHeight = (SCREEN_WIDTH / img.naturalWidth) * img.naturalHeight;
      }
      
      setImageHeight(Math.max(renderedHeight, SCREEN_HEIGHT));
    };
    img.src = screenshot;
  }, [screenshot]);

  // Reset scroll position when card becomes inactive
  useEffect(() => {
    if (!isActive) {
      setScrollY(0);
      setHasReachedEnd(false);
      setHasReachedStart(true);
    }
  }, [isActive]);

  // Update boundary flags
  useEffect(() => {
    setHasReachedStart(scrollY <= 0);
    setHasReachedEnd(scrollY >= maxScroll - 1);
  }, [scrollY, maxScroll]);

  // Handle wheel scroll inside the monitor screen - only when active
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (!isActive) return;
    
    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;
    
    // Allow page scroll if we've reached boundaries
    if ((scrollingDown && hasReachedEnd) || (scrollingUp && hasReachedStart)) {
      // Don't prevent default - let the page scroll
      return;
    }
    
    // We're in the middle of the image scroll range - prevent page scroll
    e.preventDefault();
    e.stopPropagation();
    
    setScrollY(prev => {
      const next = prev + e.deltaY * 0.8;
      return Math.max(0, Math.min(maxScroll, next));
    });
  }, [isActive, hasReachedEnd, hasReachedStart, maxScroll]);

  const canScroll = isActive && isHovering;
  const showScrollHint = canScroll && !hasReachedEnd;

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
              ref={screenRef}
              className="bg-card relative overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onWheel={handleWheel}
              style={{ 
                cursor: canScroll ? 'ns-resize' : 'default',
                width: `${SCREEN_WIDTH}px`,
                height: `${SCREEN_HEIGHT}px`,
              }}
            >
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
                  transform: `translateY(-${scrollY}px) translateZ(0)`,
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  transition: 'transform 0.1s ease-out',
                }}
              />
              
              {/* Scroll hint tooltip - only show when active, hovering, and can still scroll */}
              {showScrollHint && (
                <div 
                  className="absolute pointer-events-none z-50 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5 animate-fade-in"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12l7-7 7 7" />
                  </svg>
                  Scroll
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7 7 7-7" />
                  </svg>
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
