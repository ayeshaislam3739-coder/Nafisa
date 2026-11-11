import React, { useEffect, useRef, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

export const HeartCursorTrail: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch devices / mobile to save battery and touch latency
    if (
      typeof window === 'undefined' ||
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#E88CA8', '#F7C5D0', '#D9B76E', '#FFF4EA'];
    const particles: Particle[] = [];
    let lastTime = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < 45) return; // throttle emission to ~22fps
      lastTime = now;

      if (particles.length < 10) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          size: 10 + Math.random() * 4,
          opacity: 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Single lightweight RAF loop with zero React state updates
    const loop = () => {
      if (particles.length > 0) {
        ctx.clearRect(0, 0, width, height);

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.y -= 0.8;
          p.opacity -= 0.035;
          p.size *= 0.98;

          if (p.opacity <= 0.05) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;

          // Simple small heart path
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, s * 0.3);
          ctx.bezierCurveTo(-s * 0.5, -s * 0.2, -s * 0.5, -s * 0.7, 0, -s * 0.3);
          ctx.bezierCurveTo(s * 0.5, -s * 0.7, s * 0.5, -s * 0.2, 0, s * 0.3);
          ctx.fill();
          ctx.restore();
        }
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 select-none hidden md:block"
      aria-hidden="true"
    />
  );
});
