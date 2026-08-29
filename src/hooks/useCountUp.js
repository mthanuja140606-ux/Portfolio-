// src/hooks/useCountUp.js
// Animated counter hook — counts from 0 to target value when in view

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export function useCountUp(target, duration = 1.5, decimals = 0, delay = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;

    let startTime = null;
    let animFrame;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp + delay * 1000;
      const elapsed = Math.max(0, timestamp - startTime);
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) animFrame = requestAnimationFrame(step);
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [inView, target, duration, decimals, delay]);

  return { value, ref };
}
