import React, { useEffect, useRef, memo } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  yaw: number;
  yawSpeed: number;
  pitch: number;
  pitchSpeed: number;
  roll: number;
  rollSpeed: number;
  flutterPhase: number;
  flutterFreq: number;
  shapeType: number;
  colorType: number;
  opacity: number;
}

interface RosePetalSystemProps {
  densityMultiplier?: number;
  isPaused?: boolean;
}

export const RosePetalSystem: React.FC<RosePetalSystemProps> = memo(({
  densityMultiplier = 1,
  isPaused = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let isTabVisible = !document.hidden;

    const setupCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);

    const handleVisibility = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Optimized botanical rose colors (warm velvet to blush)
    const petalColors = [
      { base: '#7d1233', mid: '#b8234d', light: '#ea6487' },
      { base: '#991b42', mid: '#c93460', light: '#f59eb5' },
      { base: '#ad3158', mid: '#e88ca8', light: '#f7c5d0' },
      { base: '#b84269', mid: '#f7c5d0', light: '#fff0f3' },
    ];

    // Highly optimized petal counts: 14 on desktop, 6 on mobile
    const baseCount = width < 768 ? 6 : 14;
    const count = Math.min(Math.floor(baseCount * densityMultiplier), 24);

    const petals: Petal[] = [];

    const createPetal = (initialY?: number): Petal => {
      const isSmall = Math.random() < 0.35;
      const size = isSmall ? 14 + Math.random() * 6 : 22 + Math.random() * 10;
      const opacity = isSmall ? 0.55 : 0.88;

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -40 - Math.random() * height * 0.6,
        size,
        speedY: 1.0 + Math.random() * 1.2,
        speedX: (Math.random() - 0.5) * 0.8,
        yaw: Math.random() * Math.PI * 2,
        yawSpeed: (Math.random() - 0.5) * 0.02,
        pitch: Math.random() * Math.PI * 2,
        pitchSpeed: 0.015 + Math.random() * 0.015,
        roll: Math.random() * Math.PI * 2,
        rollSpeed: (Math.random() - 0.5) * 0.015,
        flutterPhase: Math.random() * Math.PI * 2,
        flutterFreq: 0.02 + Math.random() * 0.015,
        shapeType: Math.floor(Math.random() * 2),
        colorType: Math.floor(Math.random() * petalColors.length),
        opacity,
      };
    };

    for (let i = 0; i < count; i++) {
      petals.push(createPetal(Math.random() * height));
    }

    let globalWind = 0;
    let globalWindTarget = 0;

    const render = () => {
      if (!isPaused && isTabVisible) {
        ctx.clearRect(0, 0, width, height);

        if (Math.random() < 0.01) {
          globalWindTarget = (Math.random() - 0.5) * 1.2;
        }
        globalWind += (globalWindTarget - globalWind) * 0.02;

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];

          // 3D rotations & fluttering
          p.pitch += p.pitchSpeed;
          p.yaw += p.yawSpeed;
          p.roll += p.rollSpeed;
          p.flutterPhase += p.flutterFreq;

          const tiltFactor = Math.abs(Math.sin(p.pitch));
          const horizontalDrift = Math.cos(p.flutterPhase) * (1.0 + (1 - tiltFactor) * 1.2);
          const currentFallSpeed = p.speedY * (0.7 + tiltFactor * 0.45);

          p.y += currentFallSpeed;
          p.x += p.speedX + globalWind + horizontalDrift;

          // Screen bounds recycle
          if (p.y > height + 40 || p.x < -50 || p.x > width + 50) {
            petals[i] = createPetal(-40);
            continue;
          }

          const palette = petalColors[p.colorType];
          const s = p.size;
          const scaleX = Math.cos(p.yaw);
          const scaleY = Math.sin(p.pitch);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.roll);
          ctx.scale(scaleX, scaleY);
          ctx.globalAlpha = p.opacity;

          // Draw organic curved petal geometry without expensive ctx.filter
          ctx.beginPath();
          if (p.shapeType === 0) {
            // Heart-creased outer rose petal
            ctx.moveTo(0, s * 0.55);
            ctx.bezierCurveTo(-s * 0.55, s * 0.35, -s * 0.65, -s * 0.25, -s * 0.2, -s * 0.6);
            ctx.bezierCurveTo(0, -s * 0.75, s * 0.05, -s * 0.65, s * 0.2, -s * 0.6);
            ctx.bezierCurveTo(s * 0.65, -s * 0.25, s * 0.55, s * 0.35, 0, s * 0.55);
          } else {
            // Asymmetric curved rose petal
            ctx.moveTo(0, s * 0.5);
            ctx.bezierCurveTo(-s * 0.6, s * 0.2, -s * 0.45, -s * 0.45, -s * 0.05, -s * 0.65);
            ctx.bezierCurveTo(s * 0.25, -s * 0.7, s * 0.65, -s * 0.3, s * 0.45, s * 0.25);
            ctx.bezierCurveTo(s * 0.3, s * 0.45, 0, s * 0.5, 0, s * 0.5);
          }
          ctx.closePath();

          // Smooth radial gradient lighting
          const grad = ctx.createRadialGradient(-s * 0.1, -s * 0.15, s * 0.05, 0, 0, s * 0.6);
          grad.addColorStop(0, palette.light);
          grad.addColorStop(0.5, palette.mid);
          grad.addColorStop(1, palette.base);

          ctx.fillStyle = grad;
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [densityMultiplier, isPaused]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 select-none transform-gpu"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
});
