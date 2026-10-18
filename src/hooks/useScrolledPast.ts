import { useEffect, useState } from 'react';

/** True once the page has scrolled further than `offset` pixels. */
export function useScrolledPast(offset: number): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setPast(window.scrollY > offset);
    };

    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [offset]);

  return past;
}
