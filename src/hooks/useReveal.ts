import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element once it scrolls into view.
 *
 * Falls back to "always visible" when IntersectionObserver is unavailable or
 * the visitor prefers reduced motion, so content is never hidden by a feature
 * that failed to load.
 */
export function useReveal<T extends HTMLElement>(): {
  ref: React.RefObject<T | null>;
  visible: boolean;
} {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}
