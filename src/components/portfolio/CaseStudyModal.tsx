import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { Project } from '@/data/projects';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = ({ project, isOpen, onClose }: CaseStudyModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 z-10 bg-background p-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-caption uppercase tracking-widest text-primary mb-2">
                Case Study
              </p>
              <DialogTitle className="text-section">
                {project.title}
              </DialogTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-10">
          {/* Overview */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Overview</h3>
            <p className="text-body text-muted-foreground">
              {project.caseStudy.overview}
            </p>
          </section>

          {/* Role */}
          <section>
            <h3 className="text-lg font-semibold mb-3">My Role</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-caption px-3 py-1 bg-primary/10 text-primary rounded-full">
                {project.role}
              </span>
              {project.tools.map((tool) => (
                <span 
                  key={tool} 
                  className="text-caption px-3 py-1 bg-muted text-muted-foreground rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-body text-muted-foreground">
              {project.caseStudy.roleDescription}
            </p>
          </section>

          {/* Problem */}
          <section>
            <h3 className="text-lg font-semibold mb-3">The Problem</h3>
            <p className="text-body text-muted-foreground">
              {project.caseStudy.problem}
            </p>
          </section>

          {/* Approach */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Approach</h3>
            <p className="text-body text-muted-foreground">
              {project.caseStudy.approach}
            </p>
          </section>

          {/* Solution */}
          <section>
            <h3 className="text-lg font-semibold mb-3">Solution</h3>
            <p className="text-body text-muted-foreground">
              {project.caseStudy.solution}
            </p>
          </section>

          {/* Results */}
          <section>
            <h3 className="text-lg font-semibold mb-4">Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.caseStudy.results.map((result, index) => (
                <div 
                  key={index}
                  className="p-4 bg-card rounded-lg border border-border"
                >
                  <p className="text-body font-medium">{result}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CaseStudyModal;
