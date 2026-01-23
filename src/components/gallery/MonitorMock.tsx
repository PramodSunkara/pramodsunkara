import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MonitorMockProps {
  screenshot: string;
  title: string;
  className?: string;
}

const MonitorMock = ({ screenshot, title, className }: MonitorMockProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Monitor frame with thick black border */}
      <div className="rounded-xl overflow-hidden border-[12px] border-foreground shadow-2xl bg-foreground">
        {/* Screen content - scrollable with fixed height */}
        <div 
          className="bg-card max-h-[500px] overflow-y-auto overflow-x-hidden relative scroll-smooth"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{ cursor: isHovering ? 'ns-resize' : 'default' }}
        >
          <img 
            src={screenshot} 
            alt={`${title} screenshot`} 
            className="w-full h-auto block pointer-events-none"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
          
          {/* Scroll hint tooltip */}
          {isHovering && (
            <div className="fixed pointer-events-none z-50 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5 animate-fade-in"
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
  );
};

export default MonitorMock;
