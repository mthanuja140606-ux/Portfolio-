// src/hooks/useMagneticHover.js
// Returns event handlers that create a magnetic pull-toward-cursor effect

import { useRef, useState } from 'react';

export function useMagneticHover(strength = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return { ref, offset, handleMouseMove, handleMouseLeave };
}
