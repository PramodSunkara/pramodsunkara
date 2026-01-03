import { useState } from 'react';
import { Figma, GitBranch, Code2, FileCode, Palette, Layers, PenTool, Box, Globe, Blocks } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const tools = [
  { name: 'Photoshop', icon: Palette, color: '#31A8FF', years: 19 },
  { name: 'HTML5', icon: Code2, color: '#E34F26', years: 19 },
  { name: 'CSS3', icon: Code2, color: '#1572B6', years: 19 },
  { name: 'WordPress', icon: Globe, color: '#21759B', years: 10 },
  { name: 'JavaScript', icon: FileCode, color: '#F7DF1E', years: 10 },
  { name: 'Git', icon: GitBranch, color: '#F05032', years: 5 },
  { name: 'Figma', icon: Figma, color: '#F24E1E', years: 4 },
  { name: 'Adobe XD', icon: PenTool, color: '#FF61F6', years: 4 },
  { name: 'React', icon: Blocks, color: '#61DAFB', years: 2 },
  { name: 'TypeScript', icon: FileCode, color: '#3178C6', years: 2 },
  { name: 'Tailwind', icon: Layers, color: '#06B6D4', years: 2 },
  { name: 'Webflow', icon: Globe, color: '#4353FF', years: 2 },
  { name: 'Framer', icon: Box, color: '#0055FF', years: 1 },
];

// Mobile order: Figma and Photoshop positions swapped
const mobileTools = [
  tools[6], // Figma (was position 7, now position 1)
  tools[1], // HTML5
  tools[2], // CSS3
  tools[3], // WordPress
  tools[4], // JavaScript
  tools[5], // Git
  tools[0], // Photoshop (was position 1, now position 7)
  tools[7], // Adobe XD
  tools[8], // React
  tools[9], // TypeScript
  tools[10], // Tailwind
  tools[11], // Webflow
  tools[12], // Framer
];

const ToolItem = ({ tool, index }: { tool: typeof tools[0]; index: number }) => {
  const Icon = tool.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          key={index}
          className="flex-shrink-0 px-6 flex items-center gap-2 group cursor-default"
        >
          <Icon 
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
            style={{ color: tool.color }}
          />
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
            {tool.name}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="bg-yellow-400 text-black border-yellow-400 font-medium z-50">
        {tool.years}+ years experience
      </TooltipContent>
    </Tooltip>
  );
};

// Mobile-friendly tool item with tap-to-show popover
const MobileToolItem = ({ tool }: { tool: typeof tools[0] }) => {
  const Icon = tool.icon;
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button 
          className="flex flex-col items-center gap-1.5 group cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <Icon 
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
            style={{ color: tool.color }}
          />
          <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center">
            {tool.name}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="bg-yellow-400 text-black border-yellow-400 font-medium z-50 w-auto px-3 py-1.5 text-sm"
        side="top"
        sideOffset={4}
      >
        {tool.years}+ years experience
      </PopoverContent>
    </Popover>
  );
};

const LogoStrip = () => {
  return (
    <TooltipProvider delayDuration={200}>
      {/* Mobile: 3-row grid with tap-to-show popovers */}
      <div className="md:hidden px-4 py-4 reveal reveal-delay-3">
        <div className="grid grid-cols-3 gap-4">
          {mobileTools.map((tool, index) => (
            <MobileToolItem key={index} tool={tool} />
          ))}
        </div>
      </div>

      {/* Desktop: Scrolling animation */}
      <div className="hidden md:block w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden pt-0 pb-12 mt-0 reveal reveal-delay-3">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-scroll hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {tools.map((tool, index) => (
            <ToolItem key={`first-${index}`} tool={tool} index={index} />
          ))}
          {tools.map((tool, index) => (
            <ToolItem key={`second-${index}`} tool={tool} index={index} />
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default LogoStrip;
