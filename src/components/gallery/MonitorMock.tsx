import { cn } from '@/lib/utils';

interface MonitorMockProps {
  screenshot: string;
  title: string;
  className?: string;
}

const MonitorMock = ({ screenshot, title, className }: MonitorMockProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Monitor frame with thick black border */}
      <div className="rounded-xl overflow-hidden border-[12px] border-foreground shadow-2xl bg-foreground">
        {/* Screen content */}
        <div className="bg-card aspect-[16/10] overflow-hidden">
          <img 
            src={screenshot} 
            alt={`${title} screenshot`} 
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
      
      {/* Monitor stand */}
      <div className="flex justify-center">
        <div className="w-16 h-6 bg-foreground rounded-b-lg" />
      </div>
      <div className="flex justify-center -mt-1">
        <div className="w-28 h-2 bg-foreground rounded-b-lg" />
      </div>
    </div>
  );
};

export default MonitorMock;
