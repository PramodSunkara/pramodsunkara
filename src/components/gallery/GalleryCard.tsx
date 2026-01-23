import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import MonitorMock from './MonitorMock';
import type { GalleryProject } from '@/data/galleryProjects';

interface GalleryCardProps {
  project: GalleryProject;
  isActive?: boolean;
  progress?: number; // 0..1
  className?: string;
}

const GalleryCard = ({ project, isActive = false, progress = 0, className }: GalleryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "relative w-full bg-card border border-border rounded-2xl shadow-xl overflow-hidden",
        "bg-gradient-to-br from-primary/5 via-card to-card",
        className
      )}
    >
      {isActive && (
        <div className="absolute left-0 top-0 z-10 h-[3px] w-full bg-muted/30 overflow-hidden">
          <div
            className="h-full bg-progress transition-all duration-500 ease-out"
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
          />
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Content (30%) */}
        <div className="flex-1 md:w-[30%] p-6 md:p-8 lg:p-10 flex flex-col justify-center">
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
        
        {/* Right Column - Screenshot Display (70%) */}
        <div className="md:w-[70%] p-4 md:p-6 lg:p-8 flex items-center justify-center bg-muted/30">
          <MonitorMock 
            screenshot={project.screenshot} 
            title={project.title}
            className="w-full max-w-[700px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
