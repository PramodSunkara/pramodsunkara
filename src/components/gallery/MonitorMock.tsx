import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface MonitorMockProps {
  screenshot: string;
  title: string;
  className?: string;
}

// Fixed desktop width - scales down via wrapper on smaller screens
const SCREEN_WIDTH = 1100;
const SCREEN_HEIGHT = 600;
const FRAME_BORDER = 12; // px
const FRAME_WIDTH = SCREEN_WIDTH + FRAME_BORDER * 2;
const FRAME_HEIGHT = SCREEN_HEIGHT + FRAME_BORDER * 2;

const MonitorMock = ({ screenshot, title, className }: MonitorMockProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

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
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ 
              cursor: isHovering ? 'ns-resize' : 'default',
              width: `${SCREEN_WIDTH}px`,
              height: `${SCREEN_HEIGHT}px`,
              maxWidth: '100%'
            }}
          >
            {/* ScreenImage - div with background-image for crisp rendering */}
            <div
              aria-label={`${title} screenshot`}
              role="img"
              style={{
                width: `${SCREEN_WIDTH}px`,
                height: `${SCREEN_HEIGHT * 3}px`, // Tall for scrolling
                backgroundImage: `url(${screenshot})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                imageRendering: '-webkit-optimize-contrast',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                willChange: 'transform'
              }}
            />
            
            {/* Scroll hint tooltip */}
            {isHovering && (
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
