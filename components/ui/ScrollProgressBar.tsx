'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #2453D3, #00D4FF)',
      }}
      className="fixed top-0 left-0 right-0 h-0.75 origin-left z-9999 pointer-events-none"
    />
  );
}
