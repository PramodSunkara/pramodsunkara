import { cn } from '@/lib/utils';

interface BrowserMockProps {
  screenshot: string;
  title: string;
  className?: string;
}

const BrowserMock = ({ screenshot, title, className }: BrowserMockProps) => {
  return (
    <div className={cn("relative rounded-xl overflow-hidden shadow-2xl", className)}>
      {/* Browser header bar */}
      <div className="bg-foreground/90 dark:bg-foreground/80 px-4 py-3 flex items-center gap-3">
        {/* Window controls (traffic lights) */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        {/* URL bar */}
        <div className="flex-1 ml-2">
          <div className="bg-background/20 rounded-md px-3 py-1.5 text-xs text-background/70 truncate max-w-md">
            https://app.example.com/{title.toLowerCase().replace(/\s+/g, '-')}
          </div>
        </div>
      </div>
      
      {/* Browser content/screenshot */}
      <div className="bg-card aspect-[16/10]">
        <img 
          src={screenshot} 
          alt={`${title} screenshot`} 
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
};

export default BrowserMock;
