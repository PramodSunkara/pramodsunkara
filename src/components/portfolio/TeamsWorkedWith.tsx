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
    <section id="teams" className="py-12 md:py-20 reveal">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-display mb-4 font-light">
            Awesome Teams I've Worked With
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Proud to have contributed to these amazing organizations over the years.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-12">
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
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-1 lg:text-xl">
                          {exp.company}
                        </h3>
                        <p className="text-primary font-medium mb-1 text-sm">
                          {exp.currentTitle}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {exp.duration} · {exp.yearsWorked}
                        </p>
                      </div>

                      {/* Know More Button - appears on hover */}
                      <div className={`
                          transition-all duration-500 ease-out flex-shrink-0
                          ${hoveredId === exp.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                        `}>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-full font-medium">
                          Know More
                          <ArrowRight className="w-3 h-3" />
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