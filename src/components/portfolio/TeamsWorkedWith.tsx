import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { experiences } from '@/data/experience';
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
  return <section id="teams" className="py-24 md:py-32 reveal">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Awesome Teams I've Worked With
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proud to have contributed to these amazing organizations over the years.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {experiences.map(exp => <div key={exp.id} className="relative group" onMouseEnter={() => setHoveredId(exp.id)} onMouseLeave={() => setHoveredId(null)}>
              <div className={`
                  relative overflow-hidden rounded-2xl p-8 lg:p-10
                  bg-card border border-border
                  transition-all duration-500 ease-out
                  ${hoveredId === exp.id ? 'scale-105 shadow-2xl shadow-primary/20 border-primary/30' : 'shadow-lg hover:shadow-xl'}
                `}>
                {/* Background gradient on hover */}
                <div className={`
                    absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10
                    transition-opacity duration-500
                    ${hoveredId === exp.id ? 'opacity-100' : 'opacity-0'}
                  `} />

                <div className="relative z-10 flex flex-col h-full min-h-[280px]">
                  {/* Logos - aligned to top */}
                  <div className="flex items-center gap-3 h-5 lg:h-6">
                    {exp.logos.map((logo, idx) => <img key={idx} src={logoMap[logo]} alt={`${exp.company} logo`} className="h-full w-auto object-contain dark:invert-0 invert" />)}
                  </div>

                  {/* Spacer to push content to bottom */}
                  <div className="flex-1" />

                  {/* Company Info - aligned to bottom */}
                  <div>
                    <h3 className="text-xl font-semibold mb-2 lg:text-base">
                      {exp.company}
                    </h3>
                    <p className="text-primary font-medium mb-1 text-sm">
                      {exp.currentTitle}
                    </p>
                    <p className="text-muted-foreground mb-2 text-xs">
                      {exp.duration}
                    </p>
                    <p className="text-muted-foreground/80 text-xs">
                      {exp.yearsWorked}
                    </p>
                  </div>

                  {/* Know More Button - appears on hover */}
                  <div className={`
                      mt-6 transition-all duration-500 ease-out
                      ${hoveredId === exp.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                    `}>
                    <Link to={`/experience/${exp.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium transition-all duration-300 hover:gap-4 hover:shadow-lg hover:shadow-primary/30">
                      Know More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TeamsWorkedWith;