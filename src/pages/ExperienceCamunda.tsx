import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Briefcase, Target, Award, MessageSquareQuote, Wrench } from 'lucide-react';
import { experiences } from '@/data/experience';
import camundaLogo from '@/assets/camunda-logo.svg';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';
import FloatingBackButton from '@/components/FloatingBackButton';


const ExperienceCamunda = () => {
  const navigate = useNavigate();
  const experience = experiences.find(exp => exp.id === 'camunda');

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (!experience) return null;

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingBackButton />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container max-w-5xl mx-auto px-6 md:px-8">
            <a 
              href="/#teams" 
              onClick={handleBackClick}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="h-8 md:h-10 flex items-center">
                <img
                  src={camundaLogo}
                  alt="Camunda logo"
                  className="h-full w-auto object-contain dark:invert-0 invert"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-2">
                  {experience.company}
                </h1>
                <p className="text-xl text-primary font-medium mb-1">
                  {experience.currentTitle}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {experience.duration} · {experience.yearsWorked}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="container max-w-5xl mx-auto px-6 md:px-8 space-y-16 md:space-y-24">
          
          {/* Roles Timeline */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-semibold">Career Timeline</h2>
            </div>
            <div className="space-y-6">
              {experience.roles.map((role, idx) => (
                <div key={idx} className="relative pl-8 border-l-2 border-primary/30">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                  <h3 className="text-lg font-semibold">{role.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{role.duration}</p>
                  <p className="text-muted-foreground">{role.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Responsibilities */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Target className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-semibold">Key Responsibilities</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-4">
              {experience.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Projects */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-semibold">Key Projects</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experience.projects.map((project, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  {project.impact && (
                    <p className="text-primary font-medium text-sm">{project.impact}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Wrench className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-semibold">Skills Used</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {experience.skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-semibold">Key Achievements</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {experience.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <Award className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{achievement}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <MessageSquareQuote className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-display font-semibold">Testimonials</h2>
            </div>
            <div className="space-y-6">
              {experience.testimonials.map((testimonial, idx) => (
                <blockquote key={idx} className="p-8 rounded-2xl bg-card border border-border relative">
                  <MessageSquareQuote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
                  <p className="text-lg italic mb-4 relative z-10">"{testimonial.quote}"</p>
                  <footer className="text-muted-foreground">
                    <strong className="text-foreground">{testimonial.author}</strong>
                    <span className="mx-2">·</span>
                    <span>{testimonial.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
      
    </div>
  );
};

export default ExperienceCamunda;
