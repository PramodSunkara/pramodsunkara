import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  title: string;
  outcome: string;
  role: string;
  tools: string[];
  onViewCase: () => void;
  index: number;
}

const ProjectCard = ({ title, outcome, role, tools, onViewCase, index }: ProjectCardProps) => {
  return (
    <div 
      className={`reveal reveal-delay-${(index % 4) + 1} group cursor-pointer`}
      onClick={onViewCase}
    >
      {/* Layered placeholder images */}
      <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
        {/* Back layer */}
        <div className="absolute inset-0 bg-sand rounded-lg transform translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6" />
        {/* Middle layer */}
        <div className="absolute inset-0 bg-muted rounded-lg transform translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
        {/* Front layer */}
        <div className="absolute inset-0 bg-secondary rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-lg">
          <span className="text-section text-muted-foreground/30 select-none">
            {title.charAt(0)}
          </span>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="text-body text-muted-foreground mb-4">
        {outcome}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-caption px-3 py-1 bg-primary/10 text-primary rounded-full">
          {role}
        </span>
        {tools.slice(0, 2).map((tool) => (
          <span 
            key={tool} 
            className="text-caption px-3 py-1 bg-muted text-muted-foreground rounded-full"
          >
            {tool}
          </span>
        ))}
      </div>

      <Button 
        variant="ghost" 
        className="p-0 h-auto text-primary link-underline hover:bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          onViewCase();
        }}
      >
        View Case Study
      </Button>
    </div>
  );
};

export default ProjectCard;
