import { useState } from 'react';
import ProjectCard from './ProjectCard';
import CaseStudyModal from './CaseStudyModal';
import { projects, type Project } from '@/data/projects';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-section text-center mb-4 reveal">Featured Work</h2>
        <p className="text-body text-muted-foreground text-center max-w-2xl mx-auto mb-16 reveal reveal-delay-1">
          A selection of projects showcasing my approach to solving complex problems through design and technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              outcome={project.outcome}
              role={project.role}
              tools={project.tools}
              onViewCase={() => setSelectedProject(project)}
              index={index}
            />
          ))}
        </div>

        <CaseStudyModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
};

export default Portfolio;
