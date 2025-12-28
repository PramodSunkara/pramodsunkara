import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { experiences } from '@/data/experience';
import { GlowingShadow } from '@/components/ui/glowing-shadow';
import camundaLogo from '@/assets/camunda-logo.svg';
import sumtotalLogo from '@/assets/sumtotal-logo.svg';
import skillsoftLogo from '@/assets/skillsoft-logo.svg';

const logoMap: Record<string, string> = {
  'camunda-logo.svg': camundaLogo,
  'sumtotal-logo.svg': sumtotalLogo,
  'skillsoft-logo.svg': skillsoftLogo
};

const TeamsWorkedWith = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  
  return (
    <section id="teams" className="py-24 md:py-32 reveal">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-6 font-light lg:text-4xl">
            Awesome Teams I've Worked With
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proud to have contributed to these amazing organizations over the years.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {experiences.map(exp => (
            <Link 
              key={exp.id} 
              to={`/experience/${exp.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="relative group block"
              onMouseEnter={() => setHoveredId(exp.id)} 
              onMouseLeave={() => setHoveredId(null)}
            >
              <GlowingShadow>
                <div className="w-full p-6 lg:p-8">
                  <div className="flex flex-col h-full min-h-[180px]">
                    {/* Logos - aligned to top */}
                    <div className="flex items-center gap-3 h-5 lg:h-6">
                      {exp.logos.map((logo, idx) => (
                        <img 
                          key={idx} 
                          src={logoMap[logo]} 
                          alt={`${exp.company} logo`} 
                          className="h-full w-auto object-contain dark:invert-0 invert" 
                        />
                      ))}
                    </div>

                    {/* Spacer to push content to bottom */}
                    <div className="flex-1" />

                    {/* Company Info and Button - aligned to bottom */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
                      <div>
                        <h3 className="text-sm sm:text-lg font-semibold mb-1 lg:text-xl leading-tight">
                          {exp.company}
                        </h3>
                        <p className="text-primary font-medium mb-1 text-xs sm:text-sm">
                          {exp.currentTitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {exp.duration} · {exp.yearsWorked}
                        </p>
                      </div>

                      {/* Know More Button - full width on mobile */}
                      <div className="flex-shrink-0 w-full sm:w-auto">
                        <span className={`
                          inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs rounded-full font-medium transition-all duration-300 w-full sm:w-auto
                          ${hoveredId === exp.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-primary/10 text-primary border border-primary/20'}
                        `}>
                          Know More
                          <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowingShadow>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsWorkedWith;