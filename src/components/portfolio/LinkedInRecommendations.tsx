import { Linkedin, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { recommendations } from '@/data/recommendations';

const LinkedInRecommendations = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Linkedin className="h-6 w-6 text-[#0A66C2]" />
            <h2 className="text-section">Recommendations</h2>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            What colleagues and collaborators say about working with me
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.slice(0, 2).map((rec, index) => (
            <RecommendationCard key={rec.id} recommendation={rec} delay={index} />
          ))}
        </div>
        
        {/* Third recommendation centered */}
        {recommendations[2] && (
          <div className="mt-6 flex justify-center">
            <div className="w-full md:w-1/2">
              <RecommendationCard recommendation={recommendations[2]} delay={2} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

interface RecommendationCardProps {
  recommendation: typeof recommendations[0];
  delay: number;
}

const RecommendationCard = ({ recommendation, delay }: RecommendationCardProps) => {
  return (
    <div 
      className={`reveal reveal-delay-${delay + 1} bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative`}
    >
      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/20" />
      
      {/* Quote Text */}
      <blockquote className="text-foreground/90 leading-relaxed mb-6 pr-8">
        "{recommendation.quote}"
      </blockquote>
      
      {/* Recommender Info */}
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {recommendation.photoUrl && (
            <AvatarImage src={recommendation.photoUrl} alt={recommendation.name} />
          )}
          <AvatarFallback className="bg-[#0A66C2] text-white font-medium">
            {recommendation.initials}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <p className="font-medium text-foreground">{recommendation.name}</p>
          <p className="text-sm text-muted-foreground">
            {recommendation.title} @ {recommendation.company}
          </p>
        </div>
        
        {/* Small LinkedIn Badge */}
        <Linkedin className="h-4 w-4 text-[#0A66C2] ml-auto opacity-60" />
      </div>
    </div>
  );
};

export default LinkedInRecommendations;
