import React, { useMemo, useEffect, useState } from 'react';

export const AtmosphereBackground: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      // Normalize to -1 to +1
      targetX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;
      setMouseOffset({ x: currentX, y: currentY });
      animId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 54 }).map((_, i) => ({
      id: i,
      left: `${(i * 17) % 99}%`,
      top: `${(i * 23) % 96}%`,
      size: 1 + (i % 3) * 1.3,
      opacity: 0.35 + (i % 5) * 0.14,
      duration: 3 + (i % 4) * 2,
      delay: (i % 7) * 0.7,
      depth: 0.4 + (i % 3) * 0.6,
    }));
  }, []);

  const bokehs = useMemo(() => {
    return [
      { x: '18%', y: '22%', size: '420px', color: 'rgba(232, 140, 168, 0.14)', depth: 0.3 },
      { x: '82%', y: '18%', size: '460px', color: 'rgba(217, 183, 110, 0.12)', depth: 0.5 },
      { x: '35%', y: '68%', size: '540px', color: 'rgba(64, 13, 36, 0.55)', depth: 0.2 },
      { x: '88%', y: '78%', size: '480px', color: 'rgba(185, 165, 232, 0.13)', depth: 0.4 },
      { x: '50%', y: '42%', size: '400px', color: 'rgba(247, 197, 208, 0.10)', depth: 0.35 },
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Deep Romantic Base Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #3d1226 0%, #220f26 45%, #100512 100%)',
        }}
      />

      {/* Subtle Moving Warm Light Beams */}
      <div
        className="absolute -top-32 left-1/4 w-[700px] h-[950px] opacity-25 blur-3xl rotate-12 pointer-events-none transform-gpu animate-[pulse_8s_ease-in-out_infinite]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, #D9B76E 0deg, #E88CA8 130deg, transparent 220deg)',
          transform: `translate(${mouseOffset.x * 0.4}px, ${mouseOffset.y * 0.4}px) rotate(12deg)`,
        }}
      />

      <div
        className="absolute -top-40 right-1/4 w-[750px] h-[1000px] opacity-20 blur-3xl -rotate-12 pointer-events-none transform-gpu animate-[pulse_10s_ease-in-out_infinite]"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, #B9A5E8 0deg, #F7C5D0 140deg, transparent 220deg)',
          transform: `translate(${-mouseOffset.x * 0.3}px, ${-mouseOffset.y * 0.3}px) rotate(-12deg)`,
        }}
      />

      {/* Floating Glowing Bokeh Orbs with depth parallax */}
      {bokehs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[110px] pointer-events-none transform-gpu transition-transform ease-out duration-700"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            background: b.color,
            transform: `translate(calc(-50% + ${mouseOffset.x * b.depth}px), calc(-50% + ${mouseOffset.y * b.depth}px))`,
          }}
        />
      ))}

      {/* Golden Twinkling Stars with subtle parallax */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full pointer-events-none transform-gpu transition-opacity"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.id % 2 === 0 ? '#D9B76E' : '#FFF4EA',
            boxShadow: `0 0 ${star.size * 3}px ${star.id % 2 === 0 ? '#D9B76E' : '#FFF4EA'}`,
            opacity: star.opacity,
            transform: `translate(${mouseOffset.x * star.depth}px, ${mouseOffset.y * star.depth}px)`,
            animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
          }}
        />
      ))}

      {/* Fine Starlight Film Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
