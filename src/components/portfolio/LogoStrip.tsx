import { Figma, GitBranch, Code2, FileCode, Palette, Layers, PenTool, Box, Globe, Blocks } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const tools = [
  { name: 'Figma', icon: Figma, color: '#F24E1E', years: 6 },
  { name: 'React', icon: Blocks, color: '#61DAFB', years: 8 },
  { name: 'WordPress', icon: Globe, color: '#21759B', years: 15 },
  { name: 'JavaScript', icon: FileCode, color: '#F7DF1E', years: 18 },
  { name: 'TypeScript', icon: FileCode, color: '#3178C6', years: 5 },
  { name: 'Tailwind', icon: Layers, color: '#06B6D4', years: 4 },
  { name: 'Adobe XD', icon: PenTool, color: '#FF61F6', years: 7 },
  { name: 'Photoshop', icon: Palette, color: '#31A8FF', years: 19 },
  { name: 'Sketch', icon: Box, color: '#F7B500', years: 8 },
  { name: 'HTML5', icon: Code2, color: '#E34F26', years: 19 },
  { name: 'CSS3', icon: Code2, color: '#1572B6', years: 19 },
  { name: 'Node.js', icon: Blocks, color: '#339933', years: 10 },
  { name: 'Git', icon: GitBranch, color: '#F05032', years: 12 },
  { name: 'Webflow', icon: Globe, color: '#4353FF', years: 3 },
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
      <TooltipContent className="bg-yellow-400 text-black border-yellow-400 font-medium">
        {tool.years}+ years experience
      </TooltipContent>
    </Tooltip>
  );
};

const LogoStrip = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-12 mt-12 reveal reveal-delay-3">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-scroll">
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
