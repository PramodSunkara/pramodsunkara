import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    const observeAll = () => {
      const elements = root.querySelectorAll<HTMLElement>('.reveal');
      elements.forEach((el) => {
        if (el.dataset.revealObserved === 'true') return;
        el.dataset.revealObserved = 'true';
        observer.observe(el);
      });
    };

    observeAll();

    const mutationObserver = new MutationObserver(() => observeAll());
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return ref;
};
