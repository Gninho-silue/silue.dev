import { useRef, useCallback } from 'react';

/**
 * Returns a ref + mouse-event handlers that apply a CSS 3D tilt transform
 * directly on the DOM element (no React state = no re-renders).
 *
 * Usage:
 *   const { ref, handlers } = useTilt();
 *   <div ref={ref} {...handlers}>…</div>
 */
export function useTilt<T extends HTMLElement>(maxAngle = 10) {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;   // –0.5 … +0.5
      const y = (e.clientY - top) / height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-y * maxAngle).toFixed(2)}deg) rotateY(${(x * maxAngle).toFixed(2)}deg) scale3d(1.02,1.02,1.02)`;
    },
    [maxAngle],
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform =
        'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }
  }, []);

  return { ref, handlers: { onMouseMove, onMouseLeave } } as const;
}
