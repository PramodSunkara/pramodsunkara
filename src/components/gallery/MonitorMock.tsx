import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MonitorMockProps {
  screenshot: string;
  title: string;
  className?: string;
}

// Fixed desktop width - scales down via wrapper on smaller screens
const SCREEN_WIDTH = 1100;
const SCREEN_HEIGHT = 600;

const MonitorMock = ({ screenshot, title, className }: MonitorMockProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Responsive wrapper - scales the fixed-size monitor down on smaller screens */}
      <div className="w-full overflow-hidden">
        {/* Monitor frame with thick black border - fixed dimensions, scaled via transform */}
        <div 
          className="rounded-xl overflow-hidden border-[12px] border-foreground shadow-2xl bg-foreground origin-top-left"
          style={{
            width: `${SCREEN_WIDTH + 24}px`, // +24 for border
            maxWidth: '100%'
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
  );
};

export default MonitorMock;
