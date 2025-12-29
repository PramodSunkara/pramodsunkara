import { Suspense, lazy, ComponentType, memo, useMemo } from 'react';
import { useLazySection } from '@/hooks/useLazySection';

interface LazySectionProps {
  importFn: () => Promise<{ default: ComponentType }>;
  fallbackHeight?: string;
}

const LazySection = memo(({ importFn, fallbackHeight = '400px' }: LazySectionProps) => {
  const { ref, isVisible } = useLazySection('300px');
  
  // Memoize the lazy component to prevent recreation on each render
  const LazyComponent = useMemo(() => {
    if (!isVisible) return null;
    return lazy(importFn);
  }, [isVisible, importFn]);

  return (
    <div ref={ref}>
      {isVisible && LazyComponent ? (
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
          <LazyComponent />
        </Suspense>
      ) : (
        <div style={{ minHeight: fallbackHeight }} className="bg-background" />
      )}
    </div>
  );
});

LazySection.displayName = 'LazySection';

export default LazySection;
