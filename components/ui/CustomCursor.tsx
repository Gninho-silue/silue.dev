'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Don't render on touch devices
    if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) return;
    if (typeof window === 'undefined') return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select')
      ) {
        setIsHovering(true);
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.relatedTarget as HTMLElement | null;
      if (
        !target ||
        (!target.closest('a') &&
          !target.closest('button') &&
          !target.closest('[role="button"]') &&
          !target.closest('input') &&
          !target.closest('textarea') &&
          !target.closest('select'))
      ) {
        setIsHovering(false);
      }
    };

    // Lerp animation for the ring
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner dot — instant follow */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          width: isHovering ? '20px' : '12px',
          height: isHovering ? '20px' : '12px',
          backgroundColor: isHovering ? '#00D4FF' : '#2453D3',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring — lerp follow */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          border: `1.5px solid ${isHovering ? 'rgba(0,212,255,0.6)' : 'rgba(36,83,211,0.45)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease',
        }}
      />
    </>
  );
}
