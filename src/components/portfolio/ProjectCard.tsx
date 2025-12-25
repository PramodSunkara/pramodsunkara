import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  outcome: string;
  role: string;
  tools: string[];
  onViewCase: () => void;
  index: number;
}

const ProjectCard = ({ title, outcome, role, tools, onViewCase, index }: ProjectCardProps) => {
  // Different accent colors for variety
  const accentColors = [
    'bg-rose-100 dark:bg-rose-900/30',
    'bg-amber-100 dark:bg-amber-900/30',
    'bg-emerald-100 dark:bg-emerald-900/30',
    'bg-sky-100 dark:bg-sky-900/30',
    'bg-violet-100 dark:bg-violet-900/30',
    'bg-orange-100 dark:bg-orange-900/30',
    'bg-teal-100 dark:bg-teal-900/30',
    'bg-pink-100 dark:bg-pink-900/30',
  ];

  return (
    <div 
      className={`reveal reveal-delay-${(index % 4) + 1} group cursor-pointer`}
      onClick={onViewCase}
    >
      {/* Card with image area */}
      <div className={`relative rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg ${accentColors[index % accentColors.length]}`}>
        {/* Header with title and arrow */}
        <div className="flex items-start justify-between p-5 pb-0">
          <h3 className="text-lg font-semibold text-foreground">
            {title}
          </h3>
          <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4 text-foreground" />
          </div>
        </div>

        {/* Placeholder image area */}
        <div className="relative h-48 m-5 mt-4 rounded-2xl bg-card/80 flex items-center justify-center overflow-hidden">
          <span className="text-6xl font-bold text-muted-foreground/20 select-none">
            {title.charAt(0)}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 px-5 pb-5">
          <span className="text-xs px-3 py-1.5 bg-card text-foreground rounded-full font-medium">
            {role}
          </span>
          {tools.slice(0, 2).map((tool) => (
            <span 
              key={tool} 
              className="text-xs px-3 py-1.5 bg-card/60 text-muted-foreground rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Outcome text below card */}
      <p className="text-body text-muted-foreground mt-4 px-1">
        {outcome}
      </p>
    </div>
  );
};

export default ProjectCard;
