import { Link } from 'react-router-dom';
import { MousePointer2 } from 'lucide-react';
import { experiences } from '@/data/experience';
import { GlowingShadow } from '@/components/ui/glowing-shadow';
import { MouseTrackerProvider, Pointer, PointerFollower } from '@/components/ui/cursor';
import camundaLogo from '@/assets/camunda-logo.svg';
import sumtotalLogo from '@/assets/sumtotal-logo.svg';
import skillsoftLogo from '@/assets/skillsoft-logo.svg';

const logoMap: Record<string, string> = {
  'camunda-logo.svg': camundaLogo,
  'sumtotal-logo.svg': sumtotalLogo,
  'skillsoft-logo.svg': skillsoftLogo
};

const TeamsWorkedWith = () => {
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
            >
              <MouseTrackerProvider>
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

                      {/* Company Info - aligned to bottom */}
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
                    </div>
                  </div>
                </GlowingShadow>
                
                <Pointer>
                  <MousePointer2 className="h-5 w-5 text-primary" />
                </Pointer>
                <PointerFollower>
                  <div className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-medium shadow-lg">
                    Know More
                  </div>
                </PointerFollower>
              </MouseTrackerProvider>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamsWorkedWith;