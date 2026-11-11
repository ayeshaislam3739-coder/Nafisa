import React, { memo } from 'react';

export const AtmosphereBackground: React.FC = memo(() => {
  // Pre-calculated star positions to eliminate runtime calculations
  const stars = [
    { id: 1, left: '12%', top: '15%', size: 2, delay: 0 },
    { id: 2, left: '28%', top: '22%', size: 1.5, delay: 1.2 },
    { id: 3, left: '42%', top: '8%', size: 2.5, delay: 2.1 },
    { id: 4, left: '68%', top: '18%', size: 1.5, delay: 0.8 },
    { id: 5, left: '85%', top: '12%', size: 2, delay: 2.7 },
    { id: 6, left: '92%', top: '35%', size: 1.5, delay: 1.5 },
    { id: 7, left: '8%', top: '45%', size: 2, delay: 3.2 },
    { id: 8, left: '22%', top: '58%', size: 1.5, delay: 0.4 },
    { id: 9, left: '38%', top: '72%', size: 2, delay: 1.9 },
    { id: 10, left: '60%', top: '65%', size: 1.5, delay: 2.5 },
    { id: 11, left: '78%', top: '78%', size: 2.5, delay: 1.1 },
    { id: 12, left: '90%', top: '85%', size: 1.5, delay: 3.0 },
    { id: 13, left: '15%', top: '82%', size: 2, delay: 0.6 },
    { id: 14, left: '50%', top: '38%', size: 2, delay: 1.8 },
    { id: 15, left: '72%', top: '48%', size: 1.5, delay: 2.3 },
    { id: 16, left: '32%', top: '88%', size: 2, delay: 1.4 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Deep Romantic Base Gradient (Zero GPU fill overhead) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #380e22 0%, #1f0b22 45%, #0e040f 100%)',
        }}
      />

      {/* Lightweight Ambient Warm Glow Layers (Using smooth radial gradients instead of heavy 110px blur filters) */}
      <div
        className="absolute -top-24 left-1/4 w-[480px] h-[480px] opacity-20 pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(217, 183, 110, 0.4) 0%, rgba(232, 140, 168, 0.15) 45%, transparent 70%)',
        }}
      />

      <div
        className="absolute -top-28 right-1/4 w-[500px] h-[500px] opacity-15 pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(185, 165, 232, 0.35) 0%, rgba(247, 197, 208, 0.12) 45%, transparent 70%)',
        }}
      />

      <div
        className="absolute top-1/2 left-1/3 w-[550px] h-[550px] opacity-25 pointer-events-none transform-gpu"
        style={{
          background: 'radial-gradient(circle, rgba(145, 23, 61, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* Subtle Golden Twinkling Stars (Pure CSS animation, 0 React re-renders) */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.id % 2 === 0 ? '#D9B76E' : '#FFF4EA',
            opacity: 0.6,
            animation: `twinkle 4s ease-in-out infinite ${star.delay}s`,
          }}
        />
      ))}

      {/* Subtle Starlight Film Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
    </div>
  );
});
