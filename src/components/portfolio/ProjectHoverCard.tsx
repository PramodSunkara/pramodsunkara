import { ReactNode, useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import camundaBefore from '@/assets/camunda-before.png';
import camundaAfter from '@/assets/camunda-after.png';

interface ProjectHoverCardProps {
  children: ReactNode;
}

const ProjectHoverCard = ({ children }: ProjectHoverCardProps) => {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
        side="right" 
        align="start"
        sideOffset={16}
        className="w-[520px] p-0 bg-card border border-border shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Before/After Image Comparison */}
        <div className="relative">
          {/* Tab Buttons */}
          <div className="absolute top-3 left-3 z-10 flex gap-1 bg-background/80 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setActiveTab('before')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'before'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                activeTab === 'after'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              After
            </button>
          </div>

          {/* Images */}
          <div className="relative h-64 overflow-y-auto overflow-x-hidden scrollbar-thin">
            <img
              src={camundaBefore}
              alt="Camunda website before redesign"
              className={`w-full h-auto transition-opacity duration-300 ${
                activeTab === 'before' ? 'block' : 'hidden'
              }`}
            />
            <img
              src={camundaAfter}
              alt="Camunda website after redesign"
              className={`w-full h-auto transition-opacity duration-300 ${
                activeTab === 'after' ? 'block' : 'hidden'
              }`}
            />
          </div>
        </div>

        {/* Key Outcomes */}
        <div className="p-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Key Outcomes & Impact</h4>
          
          <div className="space-y-2.5 text-xs">
            <div className="flex gap-2">
              <span className="shrink-0">📈</span>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">40% Surge in Demo Conversions:</span> Optimized user funnel and rebuilt mega-menu navigation, contributing to 3X increase in qualified demo requests.
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="shrink-0">🤖</span>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Pioneered AI-Assisted Development:</span> Integration of Generative AI tools cut page-building time by 75% and enabled rapid A/B testing.
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="shrink-0">📱</span>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Pixel-Perfect Mobile Experience:</span> "Mobile-First" approach reduced mobile bounce rates by 45% and drove 4x increase in mobile-origin registrations.
              </p>
            </div>
            
            <div className="flex gap-2">
              <span className="shrink-0">⚡</span>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">4x Faster Time-to-Market:</span> New design system and AI automation enabled launching campaign pages in hours rather than days.
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default ProjectHoverCard;
