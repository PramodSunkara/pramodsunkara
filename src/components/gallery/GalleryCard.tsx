import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import MonitorMock from './MonitorMock';
import type { GalleryProject } from '@/data/galleryProjects';

interface GalleryCardProps {
  project: GalleryProject;
  className?: string;
}

const GalleryCard = ({ project, className }: GalleryCardProps) => {
  return (
    <div
      className={cn(
        "w-full bg-card border border-border rounded-2xl shadow-xl overflow-hidden",
        "bg-gradient-to-br from-primary/5 via-card to-card",
        className
      )}
    >
      <div className="flex flex-col md:flex-row">
        {/* Left Column - 60% */}
        <div className="flex-1 md:w-[60%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          {/* Year badge */}
          <span className="text-xs font-medium text-muted-foreground mb-3">
            {project.year}
          </span>
          
          {/* Title */}
          <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground mb-3">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>
          
          {/* Tech Stack Tags */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border-0 hover:bg-primary/20"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Right Column - 40% */}
        <div className="md:w-[40%] p-6 md:p-8 flex items-center justify-center bg-muted/30">
          <MonitorMock 
            screenshot={project.screenshot} 
            title={project.title}
            className="w-full max-w-[280px]"
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
