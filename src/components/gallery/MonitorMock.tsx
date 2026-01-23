import { cn } from '@/lib/utils';

interface MonitorMockProps {
  screenshot: string;
  title: string;
  className?: string;
}

const MonitorMock = ({ screenshot, title, className }: MonitorMockProps) => {
  return (
    <div 
      className={cn("relative", className)}
      style={{ transform: 'rotate(3deg)' }}
    >
      {/* Monitor bezel */}
      <div className="bg-foreground/90 dark:bg-foreground/80 rounded-xl p-2 shadow-xl">
        {/* Screen */}
        <div className="bg-card rounded-lg overflow-hidden aspect-[16/10]">
          <img 
            src={screenshot} 
            alt={`${title} screenshot`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Monitor stand */}
      <div className="mx-auto w-12 h-6 bg-foreground/70 dark:bg-foreground/60 rounded-b-lg" />
      <div className="mx-auto w-20 h-2 bg-foreground/50 dark:bg-foreground/40 rounded-b" />
    </div>
  );
};

export default MonitorMock;
