import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  // 3D angles & oscillation
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
  layer: 'bg' | 'mid' | 'fg';
  opacity: number;
}

interface RosePetalSystemProps {
  densityMultiplier?: number;
  isPaused?: boolean;
}

export const RosePetalSystem: React.FC<RosePetalSystemProps> = ({
  densityMultiplier = 1,
  isPaused = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; vx: number; vy: number }>({
    x: -999,
    y: -999,
    vx: 0,
    vy: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvas = () => {
      dpr = window.devicePixelRatio || 1;
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

    // Track gentle cursor/touch air currents
    let lastMouseX = -999;
    let lastMouseY = -999;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      if (lastMouseX !== -999) {
        mousePosRef.current.vx = (clientX - lastMouseX) * 0.15;
        mousePosRef.current.vy = (clientY - lastMouseY) * 0.15;
      }
      lastMouseX = clientX;
      lastMouseY = clientY;
      mousePosRef.current.x = clientX;
      mousePosRef.current.y = clientY;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Premium botanical color palettes
    const petalPalettes = [
      {
        base: '#6b0f2a',      // Royal velvet burgundy
        mid: '#9b1d42',       // Deep romantic crimson
        light: '#cf3863',     // Rose ruby
        sheen: 'rgba(255, 235, 240, 0.4)',
        shadow: 'rgba(45, 6, 18, 0.8)',
      },
      {
        base: '#9e1f44',      // Classic English red rose
        mid: '#c4335c',       // Satin rose
        light: '#e86287',     // Soft coral rose
        sheen: 'rgba(255, 240, 245, 0.45)',
        shadow: 'rgba(60, 10, 25, 0.7)',
      },
      {
        base: '#bf4168',      // French romantic pink
        mid: '#e88ca8',       // Signature Nafisa Rose
        light: '#f5b5c7',     // Blush highlight
        sheen: 'rgba(255, 250, 252, 0.5)',
        shadow: 'rgba(90, 22, 45, 0.6)',
      },
      {
        base: '#db7895',      // Soft bridal blush
        mid: '#f7c5d0',       // Champagne blush
        light: '#fff0f3',     // Warm ivory pink
        sheen: 'rgba(255, 255, 255, 0.65)',
        shadow: 'rgba(120, 40, 65, 0.5)',
      },
      {
        base: '#872348',      // Wine lavender rose
        mid: '#b84d75',       // Velveteen plum rose
        light: '#dca4c7',     // Soft amethyst highlight
        sheen: 'rgba(255, 240, 255, 0.4)',
        shadow: 'rgba(50, 12, 30, 0.75)',
      },
    ];

    const count = Math.min(
      Math.floor((width < 768 ? 24 : 48) * densityMultiplier),
      90
    );

    const petals: Petal[] = [];

    const createPetal = (initialY?: number): Petal => {
      const rollLayer = Math.random();
      let layer: 'bg' | 'mid' | 'fg' = 'mid';
      let size = 20 + Math.random() * 14;
      let opacity = 0.9;

      if (rollLayer < 0.28) {
        layer = 'bg';
        size = 12 + Math.random() * 8;
        opacity = 0.5;
      } else if (rollLayer > 0.84) {
        layer = 'fg';
        size = 32 + Math.random() * 18;
        opacity = 0.95;
      }

      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : -50 - Math.random() * height * 0.8,
        size,
        speedY: (1.1 + Math.random() * 1.5) * (layer === 'fg' ? 1.3 : layer === 'bg' ? 0.75 : 1.0),
        speedX: (Math.random() - 0.5) * 1.2,
        yaw: Math.random() * Math.PI * 2,
        yawSpeed: (Math.random() - 0.5) * 0.025,
        pitch: Math.random() * Math.PI * 2,
        pitchSpeed: 0.015 + Math.random() * 0.02,
        roll: Math.random() * Math.PI * 2,
        rollSpeed: (Math.random() - 0.5) * 0.02,
        flutterPhase: Math.random() * Math.PI * 2,
        flutterFreq: 0.025 + Math.random() * 0.02,
        shapeType: Math.floor(Math.random() * 4),
        colorType: Math.floor(Math.random() * petalPalettes.length),
        layer,
        opacity,
      };
    };

    for (let i = 0; i < count; i++) {
      petals.push(createPetal(Math.random() * height));
    }

    let globalWind = 0;
    let globalWindTarget = 0;
    let clock = 0;

    const render = () => {
      if (!isPaused) {
        ctx.clearRect(0, 0, width, height);

        clock += 0.015;
        if (Math.random() < 0.012) {
          globalWindTarget = (Math.random() - 0.5) * 1.6;
        }
        globalWind += (globalWindTarget - globalWind) * 0.015;

        // Decay mouse air displacement
        mousePosRef.current.vx *= 0.94;
        mousePosRef.current.vy *= 0.94;

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];

          // 3D rotations & fluttering
          p.pitch += p.pitchSpeed;
          p.yaw += p.yawSpeed;
          p.roll += p.rollSpeed;
          p.flutterPhase += p.flutterFreq;

          // Lift & drag physics: when petal is flat to wind, it falls slower and drifts horizontally
          const tiltFactor = Math.abs(Math.sin(p.pitch));
          const horizontalDrift = Math.cos(p.flutterPhase) * (1.2 + (1 - tiltFactor) * 1.5);
          const currentFallSpeed = p.speedY * (0.65 + tiltFactor * 0.5);

          p.y += currentFallSpeed;
          p.x += p.speedX + globalWind + horizontalDrift;

          // Interactive air current response
          const dx = p.x - mousePosRef.current.x;
          const dy = p.y - mousePosRef.current.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 22500) {
            // within 150px
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 150) * 3;
            p.x += (dx / dist) * force + mousePosRef.current.vx * force * 0.5;
            p.y += (dy / dist) * force * 0.6 + mousePosRef.current.vy * force * 0.5;
            p.pitchSpeed += 0.02 * force;
          }

          // Screen bounds recycle
          if (p.y > height + 60 || p.x < -80 || p.x > width + 80) {
            petals[i] = createPetal(-50);
            continue;
          }

          const palette = petalPalettes[p.colorType];
          const s = p.size;

          // 3D projection factors
          const scaleX = Math.cos(p.yaw);
          const scaleY = Math.sin(p.pitch);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.roll);
          ctx.scale(scaleX, scaleY);

          // Optical depth blur
          if (p.layer === 'fg') {
            ctx.filter = 'blur(1.2px)';
          } else if (p.layer === 'bg') {
            ctx.filter = 'blur(1.8px)';
          } else {
            ctx.filter = 'none';
          }

          ctx.globalAlpha = p.opacity;

          // Draw organic curved petal geometry based on shapeType
          ctx.beginPath();
          if (p.shapeType === 0) {
            // Heart-creased outer rose petal
            ctx.moveTo(0, s * 0.55);
            ctx.bezierCurveTo(-s * 0.55, s * 0.35, -s * 0.65, -s * 0.25, -s * 0.2, -s * 0.6);
            ctx.bezierCurveTo(0, -s * 0.75, s * 0.05, -s * 0.65, s * 0.2, -s * 0.6);
            ctx.bezierCurveTo(s * 0.65, -s * 0.25, s * 0.55, s * 0.35, 0, s * 0.55);
          } else if (p.shapeType === 1) {
            // Asymmetric curled petal
            ctx.moveTo(0, s * 0.5);
            ctx.bezierCurveTo(-s * 0.6, s * 0.2, -s * 0.45, -s * 0.45, -s * 0.05, -s * 0.65);
            ctx.bezierCurveTo(s * 0.25, -s * 0.7, s * 0.65, -s * 0.3, s * 0.45, s * 0.25);
            ctx.bezierCurveTo(s * 0.3, s * 0.45, 0, s * 0.5, 0, s * 0.5);
          } else if (p.shapeType === 2) {
            // Slender inner petal
            ctx.moveTo(0, s * 0.6);
            ctx.bezierCurveTo(-s * 0.4, s * 0.25, -s * 0.35, -s * 0.4, 0, -s * 0.65);
            ctx.bezierCurveTo(s * 0.35, -s * 0.4, s * 0.4, s * 0.25, 0, s * 0.6);
          } else {
            // Flared wind-swept petal
            ctx.moveTo(-s * 0.05, s * 0.52);
            ctx.bezierCurveTo(-s * 0.55, s * 0.3, -s * 0.5, -s * 0.3, -s * 0.15, -s * 0.58);
            ctx.bezierCurveTo(s * 0.1, -s * 0.62, s * 0.58, -s * 0.38, s * 0.5, s * 0.15);
            ctx.bezierCurveTo(s * 0.42, s * 0.42, -s * 0.05, s * 0.52, -s * 0.05, s * 0.52);
          }
          ctx.closePath();

          // Realistic radial lighting: dark velvet stem base to luminous rose pink edge
          const grad = ctx.createRadialGradient(-s * 0.1, -s * 0.15, s * 0.08, 0, 0, s * 0.65);
          grad.addColorStop(0, palette.light);
          grad.addColorStop(0.45, palette.mid);
          grad.addColorStop(0.85, palette.base);
          grad.addColorStop(1, palette.shadow);

          ctx.fillStyle = grad;
          ctx.fill();

          // Satin specular curve reflection
          ctx.beginPath();
          ctx.moveTo(-s * 0.2, -s * 0.2);
          ctx.quadraticCurveTo(0, -s * 0.45, s * 0.2, -s * 0.2);
          ctx.strokeStyle = palette.sheen;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Delicate organic petal vein
          ctx.beginPath();
          ctx.moveTo(0, s * 0.48);
          ctx.quadraticCurveTo(s * 0.06, 0, -s * 0.04, -s * 0.5);
          ctx.strokeStyle = 'rgba(255, 235, 245, 0.25)';
          ctx.lineWidth = 0.75;
          ctx.stroke();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
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
};
