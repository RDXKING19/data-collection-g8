// src/hooks/useHeaderHeight.js
import { useEffect } from 'react';

export function useHeaderHeight(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const update = () => {
      if (ref.current) {
        document.documentElement.style.setProperty('--header-h', `${ref.current.offsetHeight}px`);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
}
