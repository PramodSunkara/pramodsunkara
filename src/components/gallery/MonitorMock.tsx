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
  const [scale, setScale] = useState(1);
  const [scrollY, setScrollY] = useState(0);
  const [imageHeight, setImageHeight] = useState(SCREEN_HEIGHT);

  const maxScroll = Math.max(0, imageHeight - SCREEN_HEIGHT);
  const hasReachedEnd = scrollY >= maxScroll - 1;
  const hasReachedStart = scrollY <= 1;

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

  // Load the actual image to get its dimensions
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // Calculate rendered height: backgroundSize is "SCREEN_WIDTH auto"
      const renderedHeight = (SCREEN_WIDTH / img.naturalWidth) * img.naturalHeight;
      setImageHeight(Math.max(renderedHeight, SCREEN_HEIGHT));
    };
    img.src = screenshot;
  }, [screenshot]);

  // Reset scroll position when card becomes inactive
  useEffect(() => {
    if (!isActive) {
      setScrollY(0);
    }
  }, [isActive]);

  // Use native wheel event with passive: false to properly prevent page scroll
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const handleWheel = (e: WheelEvent) => {
      if (!isActive || !isHovering) return;

      const currentScrollY = scrollY;
      const currentMaxScroll = maxScroll;
      const atEnd = currentScrollY >= currentMaxScroll - 1;
      const atStart = currentScrollY <= 1;
      
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      // At boundaries, let page scroll
      if ((scrollingDown && atEnd) || (scrollingUp && atStart)) {
        return;
      }

      // Within scroll range - block page scroll completely
      e.preventDefault();
      e.stopPropagation();

      setScrollY(prev => {
        const next = prev + e.deltaY * 0.8;
        return Math.max(0, Math.min(currentMaxScroll, next));
      });
    };

    screen.addEventListener('wheel', handleWheel, { passive: false });
    return () => screen.removeEventListener('wheel', handleWheel);
  }, [isActive, isHovering, scrollY, maxScroll]);

  const canScroll = isActive && maxScroll > 0;
  const showScrollHint = canScroll && isHovering && !hasReachedEnd;

  return (
    <div className={cn("relative w-full", className)}>
      <div ref={wrapperRef} className="w-full">
        <div
          className="relative"
          style={{
            width: `${FRAME_WIDTH * scale}px`,
            height: `${FRAME_HEIGHT * scale}px`,
          }}
        >
          <div
            className="absolute left-0 top-0 box-border rounded-xl overflow-hidden border-[12px] border-foreground shadow-2xl bg-foreground origin-top-left"
            style={{
              width: `${FRAME_WIDTH}px`,
              height: `${FRAME_HEIGHT}px`,
              transform: `scale(${scale})`,
            }}
          >
            <div 
              ref={screenRef}
              className="bg-card relative overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              
              style={{ 
                cursor: canScroll ? 'ns-resize' : 'default',
                width: `${SCREEN_WIDTH}px`,
                height: `${SCREEN_HEIGHT}px`,
              }}
            >
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
