const skillCategories = [
  {
    title: 'Design & UX',
    skills: [
      'User Research & Testing',
      'Information Architecture',
      'Wireframing & Prototyping',
      'Design Systems',
      'Accessibility (WCAG)',
      'Visual Design',
    ],
  },
  {
    title: 'Front-End & Web',
    skills: [
      'React & TypeScript',
      'Vue.js',
      'HTML5 & CSS3',
      'Responsive Design',
      'Performance Optimization',
      'Animation & Motion',
    ],
  },
  {
    title: 'Marketing & Growth',
    skills: [
      'A/B Testing',
      'Conversion Optimization',
      'Analytics & Data',
      'Landing Page Design',
      'Email Templates',
      'SEO Best Practices',
    ],
  },
];

const aiTools = [
  'ChatGPT',
  'Claude',
  'Midjourney',
  'GitHub Copilot',
  'Figma AI',
  'Notion AI',
];

const Skills = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container-narrow">
        <h2 className="text-section mb-4 reveal">Skills & Tools</h2>
        <p className="text-body text-muted-foreground max-w-2xl mb-16 reveal reveal-delay-1">
          A blend of design thinking, technical expertise, and marketing savvy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {skillCategories.map((category, index) => (
            <div key={category.title} className={`reveal reveal-delay-${index + 1}`}>
              <h3 className="font-semibold text-lg mb-6 text-foreground">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.skills.map((skill) => (
                  <li 
                    key={skill} 
                    className="text-body text-muted-foreground"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* AI Tools */}
        <div className="reveal reveal-delay-4 border-t border-border pt-12">
          <h3 className="font-semibold text-lg mb-6">
            AI-Enhanced Workflow
          </h3>
          <div className="flex flex-wrap gap-3">
            {aiTools.map((tool) => (
              <span 
                key={tool}
                className="text-sm px-5 py-2.5 bg-secondary text-foreground rounded-full transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
