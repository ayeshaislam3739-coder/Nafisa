import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'sparkle' | 'rose';
  size: number;
  rotation: number;
  opacity: number;
  color: string;
}

export const HeartCursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const colors = ['#E88CA8', '#F7C5D0', '#D9B76E', '#FFF4EA', '#bd244b'];

    const spawnParticle = (clientX: number, clientY: number, count = 1) => {
      const now = Date.now();
      if (now - lastTime.current < 35) return; // throttle emission
      lastTime.current = now;

      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const typeRoll = Math.random();
        const type: 'heart' | 'sparkle' | 'rose' =
          typeRoll < 0.65 ? 'heart' : typeRoll < 0.85 ? 'sparkle' : 'rose';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = type === 'heart' ? 14 + Math.random() * 8 : 10 + Math.random() * 6;

        newParticles.push({
          id: nextId.current++,
          x: clientX + (Math.random() - 0.5) * 16,
          y: clientY + (Math.random() - 0.5) * 16,
          type,
          size,
          rotation: (Math.random() - 0.5) * 45,
          opacity: 0.9,
          color,
        });
      }

      setParticles((prev) => [...prev.slice(-24), ...newParticles]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      spawnParticle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        spawnParticle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Fade out and cleanup particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y - 1.2,
            opacity: p.opacity - 0.05,
            size: p.size * 0.97,
          }))
          .filter((p) => p.opacity > 0.1)
      );
    }, 40);

    return () => clearInterval(timer);
  }, [particles.length]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
          }}
        >
          {p.type === 'heart' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              stroke="none"
              style={{ filter: `drop-shadow(0 0 6px ${p.color})` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}

          {p.type === 'sparkle' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill={p.color}
              stroke="none"
              style={{ filter: `drop-shadow(0 0 5px ${p.color})` }}
            >
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          )}

          {p.type === 'rose' && (
            <div
              className="rounded-full bg-gradient-to-tr from-[#91173d] to-[#f7c5d0]"
              style={{
                width: `${p.size * 0.7}px`,
                height: `${p.size * 0.7}px`,
                boxShadow: `0 0 6px ${p.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
