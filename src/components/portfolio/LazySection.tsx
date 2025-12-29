import { Suspense, lazy, ComponentType, memo } from 'react';
import { useLazySection } from '@/hooks/useLazySection';

interface LazySectionProps {
  component: () => Promise<{ default: ComponentType }>;
  fallbackHeight?: string;
}

const LazySection = memo(({ component, fallbackHeight = '400px' }: LazySectionProps) => {
  const { ref, isVisible } = useLazySection('300px');
  
  const Component = isVisible ? lazy(component) : null;

  return (
    <div ref={ref}>
      {isVisible && Component ? (
        <Suspense
          fallback={
            <div 
              className="flex items-center justify-center bg-background"
              style={{ minHeight: fallbackHeight }}
            >
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Component />
        </Suspense>
      ) : (
        <div style={{ minHeight: fallbackHeight }} className="bg-background" />
      )}
    </div>
  );
});

LazySection.displayName = 'LazySection';

export default LazySection;
