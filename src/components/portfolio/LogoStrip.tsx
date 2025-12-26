import { Figma, GitBranch, Code2, FileCode, Palette, Layers, PenTool, Box, Globe, Blocks } from 'lucide-react';

const tools = [
  { name: 'Figma', icon: Figma, color: '#F24E1E' },
  { name: 'React', icon: Blocks, color: '#61DAFB' },
  { name: 'WordPress', icon: Globe, color: '#21759B' },
  { name: 'JavaScript', icon: FileCode, color: '#F7DF1E' },
  { name: 'TypeScript', icon: FileCode, color: '#3178C6' },
  { name: 'Tailwind', icon: Layers, color: '#06B6D4' },
  { name: 'Adobe XD', icon: PenTool, color: '#FF61F6' },
  { name: 'Photoshop', icon: Palette, color: '#31A8FF' },
  { name: 'Sketch', icon: Box, color: '#F7B500' },
  { name: 'HTML5', icon: Code2, color: '#E34F26' },
  { name: 'CSS3', icon: Code2, color: '#1572B6' },
  { name: 'Node.js', icon: Blocks, color: '#339933' },
  { name: 'Git', icon: GitBranch, color: '#F05032' },
  { name: 'Webflow', icon: Globe, color: '#4353FF' },
];

const LogoStrip = () => {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-12 mt-12 reveal reveal-delay-3">
      <div className="flex animate-scroll hover:pause">
        {[...tools, ...tools, ...tools, ...tools].map((tool, index) => {
          const Icon = tool.icon;
          return (
            <div
              key={index}
              className="flex-shrink-0 mx-6 flex items-center gap-2 group cursor-default"
            >
              <Icon 
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
                style={{ color: tool.color }}
              />
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogoStrip;
