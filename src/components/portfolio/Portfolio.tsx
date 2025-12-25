import { useState } from 'react';
import ProjectCard from './ProjectCard';
import CaseStudyModal from './CaseStudyModal';
import { projects, type Project } from '@/data/projects';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-secondary/30">
      <div className="container-narrow">
        <h2 className="text-section mb-16 reveal">Latest work</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
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
