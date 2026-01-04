import { useRef } from 'react';
import { Linkedin, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { recommendations } from '@/data/recommendations';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const LinkedInRecommendations = () => {
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    })
  );

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

        {/* Recommendations Carousel */}
        <Carousel
          opts={{
            loop: true,
            align: 'start',
          }}
          plugins={[autoplayPlugin.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {recommendations.map((rec, index) => (
              <CarouselItem
                key={rec.id}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <RecommendationCard recommendation={rec} delay={index} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
      className={`reveal reveal-delay-${(delay % 3) + 1} bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative h-full`}
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
