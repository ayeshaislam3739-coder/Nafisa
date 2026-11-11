import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollBloomingRose
 * 
 * A realistic, single botanical red rose positioned in the center background.
 * Blooms continuously from a tight closed rosebud (0% scroll) to a fully open,
 * layered velvety red rose (100% scroll), with an anchored curved green stem
 * and 3 realistic green leaves.
 * 
 * Powered by requestAnimationFrame lerping and hardware-accelerated SVG transforms
 * for 60-120fps performance on mobile and desktop without external 3D libraries.
 */
export const ScrollBloomingRose: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  // Smooth scroll interpolation loop
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = docHeight > 0 ? scrollY / docHeight : 0;
      targetProgressRef.current = Math.max(0, Math.min(1, rawProgress));

      // Wake up the RAF animation loop if paused
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animate();
      }
    };

    const animate = () => {
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const delta = target - current;

      if (Math.abs(delta) < 0.0008) {
        currentProgressRef.current = target;
        setProgress(target);
        isAnimatingRef.current = false;
        rafIdRef.current = null;
        return;
      }

      // Smooth organic lerp factor (0.1)
      const next = current + delta * 0.1;
      currentProgressRef.current = next;
      setProgress(next);

      rafIdRef.current = requestAnimationFrame(animate);
    };

    // Initial measurement
    updateScrollProgress();

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Helper smoothstep curve for natural organic easing
  const smooth = (val: number, min: number, max: number) => {
    const t = Math.max(0, Math.min(1, (val - min) / (max - min)));
    return t * t * (3 - 2 * t);
  };

  // Stage Progressions
  // p: 0.0 (closed bud) -> 0.2 (bud loosening) -> 0.4 (outer unfold) -> 0.6 (half bloomed) -> 0.8 (open) -> 1.0 (full bloom)
  const p = progress;

  // Calyx sepals reflexing downwards (starts immediately, completes by 0.75)
  const sepalProgress = smooth(p, 0.0, 0.7);

  // Outer guard petals unfold from 0.05 to 0.75
  const guardProgress = smooth(p, 0.05, 0.75);

  // Secondary mid-outer petals unfold from 0.2 to 0.85
  const midOuterProgress = smooth(p, 0.2, 0.85);

  // Mid-inner petals unfold from 0.35 to 0.95
  const midInnerProgress = smooth(p, 0.35, 0.95);

  // Core spiral unwinding from 0.45 to 1.0
  const coreProgress = smooth(p, 0.45, 1.0);

  // Center golden stamen visibility
  const stamenOpacity = smooth(p, 0.65, 0.95);

  // Subtle organic stem flex with scroll physics
  const stemFlex = Math.sin(p * Math.PI) * 1.5;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Soft warm atmospheric halo behind the rose */}
      <div
        className="absolute w-[450px] sm:w-[600px] h-[600px] sm:h-[800px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(229,43,80,0.14) 0%, rgba(64,13,36,0.22) 50%, transparent 75%)',
        }}
      />

      {/* Main Single Rose Container: Centered, medium-sized, fully visible */}
      <div className="relative w-[320px] sm:w-[380px] md:w-[420px] h-[520px] sm:h-[620px] md:h-[680px] max-h-[86vh] transition-transform duration-300">
        <svg
          viewBox="0 0 400 650"
          className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Stem Cylindrical Gradient */}
            <linearGradient id="stemCylinder" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#11230D" />
              <stop offset="28%" stopColor="#2A521E" />
              <stop offset="55%" stopColor="#4D8738" />
              <stop offset="78%" stopColor="#28501C" />
              <stop offset="100%" stopColor="#14260F" />
            </linearGradient>

            {/* Stem Thorn Gradient */}
            <linearGradient id="thornGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#436B2E" />
              <stop offset="60%" stopColor="#7A2D2D" />
              <stop offset="100%" stopColor="#421313" />
            </linearGradient>

            {/* Realistic Leaf Foliage Gradients */}
            <radialGradient id="leafGrad1" cx="30%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#5FA64E" />
              <stop offset="35%" stopColor="#326628" />
              <stop offset="70%" stopColor="#1D4017" />
              <stop offset="100%" stopColor="#0E210B" />
            </radialGradient>

            <radialGradient id="leafGrad2" cx="25%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#6DB35C" />
              <stop offset="40%" stopColor="#3A702E" />
              <stop offset="75%" stopColor="#224A1B" />
              <stop offset="100%" stopColor="#11260D" />
            </radialGradient>

            {/* Calyx Sepal Gradient */}
            <linearGradient id="sepalGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#1C3814" />
              <stop offset="45%" stopColor="#2F5C24" />
              <stop offset="85%" stopColor="#4B853B" />
              <stop offset="100%" stopColor="#6E2833" />
            </linearGradient>

            {/* Deep Velvety Red Petal Gradients (Layered Lighting) */}
            {/* Outer Petals */}
            <radialGradient id="petalOuterVelvet" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#E02B4D" />
              <stop offset="30%" stopColor="#B31230" />
              <stop offset="65%" stopColor="#70061A" />
              <stop offset="90%" stopColor="#3B010C" />
              <stop offset="100%" stopColor="#1C0005" />
            </radialGradient>

            {/* Mid Petals */}
            <radialGradient id="petalMidVelvet" cx="45%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#F0385B" />
              <stop offset="28%" stopColor="#C41635" />
              <stop offset="65%" stopColor="#7D071E" />
              <stop offset="92%" stopColor="#45020E" />
              <stop offset="100%" stopColor="#200006" />
            </radialGradient>

            {/* Inner Spiral Petals */}
            <radialGradient id="petalInnerVelvet" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FA4A6D" />
              <stop offset="30%" stopColor="#D41E3F" />
              <stop offset="70%" stopColor="#8C0822" />
              <stop offset="95%" stopColor="#4D0310" />
              <stop offset="100%" stopColor="#240007" />
            </radialGradient>

            {/* Curled Petal Lip Reflex Highlights */}
            <linearGradient id="petalLipHighlight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFCCD5" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#E8486A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Center Golden Stamens */}
            <radialGradient id="stamenGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="45%" stopColor="#EBB328" />
              <stop offset="85%" stopColor="#9C5A08" />
              <stop offset="100%" stopColor="#4A2601" />
            </radialGradient>

            {/* Dewdrop Specular Highlight */}
            <radialGradient id="dewdropGrad" cx="30%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="45%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="85%" stopColor="rgba(0,0,0,0.2)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
            </radialGradient>
          </defs>

          {/* ========================================================= */}
          {/* 1. NATURAL CURVED STEM (Anchored from base to flower head) */}
          {/* ========================================================= */}
          <g id="rose-stem" style={{ transformOrigin: '200px 220px', transform: `rotate(${stemFlex * 0.4}deg)` }}>
            {/* Realistic curved botanical stem path */}
            <path
              d="M 197 220 
                 C 199 270, 218 340, 215 420 
                 C 212 490, 199 560, 201 640 
                 L 207 640 
                 C 205 560, 218 490, 221 420 
                 C 224 340, 205 270, 203 220 Z"
              fill="url(#stemCylinder)"
              stroke="#0D1A0A"
              strokeWidth="0.8"
            />

            {/* Stem natural thorn 1 (Upper right, curved downward) */}
            <path
              d="M 220 325 
                 C 225 328, 235 330, 239 342 
                 C 233 340, 226 335, 219 333 Z"
              fill="url(#thornGrad)"
              stroke="#1A0A0A"
              strokeWidth="0.5"
            />

            {/* Stem natural thorn 2 (Lower left, curved downward) */}
            <path
              d="M 208 475 
                 C 202 478, 192 481, 188 493 
                 C 194 491, 201 486, 207 483 Z"
              fill="url(#thornGrad)"
              stroke="#1A0A0A"
              strokeWidth="0.5"
            />

            {/* Calyx Receptacle (The swollen green bulb supporting the flower base) */}
            <path
              d="M 188 218 
                 C 188 236, 212 236, 212 218 
                 C 212 212, 188 212, 188 218 Z"
              fill="url(#leafGrad1)"
              stroke="#142B10"
              strokeWidth="1"
            />
          </g>

          {/* ========================================================= */}
          {/* 2. REALISTIC BOTANICAL GREEN LEAVES (3 Attached Leaves)   */}
          {/* ========================================================= */}
          <g id="rose-leaves">
            {/* LEAF 1: Upper Right Leaf (Attached at stem y=305) */}
            <g
              id="leaf-upper-right"
              style={{
                transformOrigin: '218px 305px',
                transform: `rotate(${Math.sin(p * Math.PI) * 2}deg)`,
              }}
            >
              {/* Petiole / Leaf Stalk */}
              <path
                d="M 218 305 Q 235 298, 252 292"
                stroke="url(#stemCylinder)"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Serrated Leaf Blade */}
              <path
                d="M 252 292 
                   C 265 272, 290 260, 324 252 
                   C 316 270, 305 288, 285 304 
                   C 268 318, 254 308, 252 292 Z"
                fill="url(#leafGrad1)"
                stroke="#11240D"
                strokeWidth="1"
              />

              {/* Central Midrib */}
              <path
                d="M 252 292 Q 284 275, 324 252"
                stroke="#76BA63"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />

              {/* Lateral Veins */}
              <path
                d="M 268 284 Q 280 274, 288 266 
                   M 282 277 Q 295 270, 304 262 
                   M 268 284 Q 275 292, 282 299 
                   M 284 276 Q 292 284, 298 291"
                stroke="#88CC75"
                strokeWidth="0.7"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />
            </g>

            {/* LEAF 2: Mid Left Leaf with Glistening Dewdrop (Attached at stem y=385) */}
            <g
              id="leaf-mid-left"
              style={{
                transformOrigin: '215px 385px',
                transform: `rotate(${-Math.sin(p * Math.PI) * 2.2}deg)`,
              }}
            >
              {/* Petiole */}
              <path
                d="M 215 385 Q 188 392, 162 398"
                stroke="url(#stemCylinder)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />

              {/* Leaf Blade with Natural Serrated Undulation */}
              <path
                d="M 162 398 
                   C 142 380, 115 385, 82 408 
                   C 105 428, 130 435, 155 422 
                   C 166 416, 166 404, 162 398 Z"
                fill="url(#leafGrad2)"
                stroke="#0F240B"
                strokeWidth="1"
              />

              {/* Midrib */}
              <path
                d="M 162 398 Q 124 406, 82 408"
                stroke="#7EC46B"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.8"
              />

              {/* Lateral Veins */}
              <path
                d="M 145 401 Q 135 391, 122 388 
                   M 125 405 Q 115 397, 102 396 
                   M 145 401 Q 138 412, 132 422 
                   M 125 405 Q 118 416, 112 424"
                stroke="#90D67D"
                strokeWidth="0.7"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />

              {/* Glistening Morning Dewdrop on Leaf */}
              <ellipse
                cx="128"
                cy="406"
                rx="3.5"
                ry="2.5"
                fill="url(#dewdropGrad)"
                style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.6))' }}
              />
            </g>

            {/* LEAF 3: Lower Left Leaf (Attached at stem y=495) */}
            <g
              id="leaf-lower-left"
              style={{
                transformOrigin: '206px 495px',
                transform: `rotate(${Math.sin(p * Math.PI) * 1.5}deg)`,
              }}
            >
              {/* Petiole */}
              <path
                d="M 206 495 Q 185 504, 164 515"
                stroke="url(#stemCylinder)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Leaf Blade */}
              <path
                d="M 164 515 
                   C 148 502, 126 510, 104 532 
                   C 122 548, 145 550, 162 538 
                   C 168 532, 168 522, 164 515 Z"
                fill="url(#leafGrad1)"
                stroke="#10240C"
                strokeWidth="0.9"
              />

              {/* Midrib */}
              <path
                d="M 164 515 Q 136 526, 104 532"
                stroke="#74BA61"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </g>
          </g>

          {/* ========================================================= */}
          {/* 3. CALYX SEPALS (Reflex downwards as scroll progresses)  */}
          {/* ========================================================= */}
          <g id="calyx-sepals" style={{ transformOrigin: '200px 220px' }}>
            {/* Sepal Far Left: reflex from 0deg (upward bud clasp) to -85deg (downward) */}
            <path
              d="M 194 220 C 182 205, 172 175, 176 138 C 178 165, 192 195, 198 220 Z"
              fill="url(#sepalGrad)"
              stroke="#13240F"
              strokeWidth="0.6"
              style={{
                transformOrigin: '196px 220px',
                transform: `rotate(${-sepalProgress * 85}deg) scale(${1 - sepalProgress * 0.15})`,
                transition: 'transform 0.05s ease-out',
              }}
            />

            {/* Sepal Mid Left: reflex from 0deg to -45deg */}
            <path
              d="M 196 220 C 190 205, 185 178, 188 145 C 192 170, 198 198, 200 220 Z"
              fill="url(#sepalGrad)"
              stroke="#13240F"
              strokeWidth="0.6"
              style={{
                transformOrigin: '198px 220px',
                transform: `rotate(${-sepalProgress * 48}deg)`,
                transition: 'transform 0.05s ease-out',
              }}
            />

            {/* Sepal Far Right: reflex from 0deg to +85deg */}
            <path
              d="M 206 220 C 218 205, 228 175, 224 138 C 222 165, 208 195, 202 220 Z"
              fill="url(#sepalGrad)"
              stroke="#13240F"
              strokeWidth="0.6"
              style={{
                transformOrigin: '204px 220px',
                transform: `rotate(${sepalProgress * 85}deg) scale(${1 - sepalProgress * 0.15})`,
                transition: 'transform 0.05s ease-out',
              }}
            />

            {/* Sepal Mid Right: reflex from 0deg to +45deg */}
            <path
              d="M 204 220 C 210 205, 215 178, 212 145 C 208 170, 202 198, 200 220 Z"
              fill="url(#sepalGrad)"
              stroke="#13240F"
              strokeWidth="0.6"
              style={{
                transformOrigin: '202px 220px',
                transform: `rotate(${sepalProgress * 48}deg)`,
                transition: 'transform 0.05s ease-out',
              }}
            />
          </g>

          {/* ========================================================= */}
          {/* 4. FLOWER HEAD: LAYERED VELVET PETALS (SCROLL-BLOOMING)  */}
          {/* ========================================================= */}
          {/* Anchored at receptacle (200, 220) */}
          <g id="flower-head">
            {/* ----------------------------------------------------- */}
            {/* LAYER A: BACK GUARD PETALS (Unfold & reflex outward) */}
            {/* ----------------------------------------------------- */}
            {/* Back Guard Center Petal (Arching background bloom) */}
            <g
              id="petal-back-center"
              style={{
                transformOrigin: '200px 215px',
                transform: `scaleY(${0.85 + guardProgress * 0.4}) scaleX(${0.7 + guardProgress * 0.65}) translateY(${-guardProgress * 15}px)`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 200 215 
                   C 160 210, 130 160, 140 100 
                   C 165 80, 235 80, 260 100 
                   C 270 160, 240 210, 200 215 Z"
                fill="url(#petalOuterVelvet)"
                stroke="#3B010C"
                strokeWidth="0.8"
              />
              {/* Petal reflexed top lip highlight */}
              <path
                d="M 148 102 C 180 82, 220 82, 252 102"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Back Guard Petal Left */}
            <g
              id="petal-back-left"
              style={{
                transformOrigin: '195px 215px',
                transform: `rotate(${-guardProgress * 55}deg) scale(${0.75 + guardProgress * 0.45})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 195 215 
                   C 160 205, 120 165, 110 120 
                   C 130 95, 175 105, 195 130 
                   C 200 165, 198 195, 195 215 Z"
                fill="url(#petalOuterVelvet)"
                stroke="#36010B"
                strokeWidth="0.8"
              />
              <path
                d="M 112 120 C 130 98, 165 102, 192 125"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Back Guard Petal Right */}
            <g
              id="petal-back-right"
              style={{
                transformOrigin: '205px 215px',
                transform: `rotate(${guardProgress * 55}deg) scale(${0.75 + guardProgress * 0.45})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 205 215 
                   C 240 205, 280 165, 290 120 
                   C 270 95, 225 105, 205 130 
                   C 200 165, 202 195, 205 215 Z"
                fill="url(#petalOuterVelvet)"
                stroke="#36010B"
                strokeWidth="0.8"
              />
              <path
                d="M 288 120 C 270 98, 235 102, 208 125"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ----------------------------------------------------- */}
            {/* LAYER B: MID-OUTER PETALS (Unfold from 0.2 to 0.85)   */}
            {/* ----------------------------------------------------- */}
            {/* Mid Left Petal */}
            <g
              id="petal-mid-left"
              style={{
                transformOrigin: '196px 215px',
                transform: `rotate(${-midOuterProgress * 42}deg) scaleX(${0.75 + midOuterProgress * 0.45}) scaleY(${0.85 + midOuterProgress * 0.25})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 196 215 
                   C 165 205, 135 170, 130 135 
                   C 150 115, 185 120, 200 145 
                   C 205 175, 202 200, 196 215 Z"
                fill="url(#petalMidVelvet)"
                stroke="#3B020D"
                strokeWidth="0.8"
              />
              <path
                d="M 132 135 C 150 116, 178 120, 198 142"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Mid Right Petal */}
            <g
              id="petal-mid-right"
              style={{
                transformOrigin: '204px 215px',
                transform: `rotate(${midOuterProgress * 42}deg) scaleX(${0.75 + midOuterProgress * 0.45}) scaleY(${0.85 + midOuterProgress * 0.25})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 204 215 
                   C 235 205, 265 170, 270 135 
                   C 250 115, 215 120, 200 145 
                   C 195 175, 198 200, 204 215 Z"
                fill="url(#petalMidVelvet)"
                stroke="#3B020D"
                strokeWidth="0.8"
              />
              <path
                d="M 268 135 C 250 116, 222 120, 202 142"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2.4"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Outer Lower Front Petal (Reflexing downward in front) */}
            <g
              id="petal-front-lower"
              style={{
                transformOrigin: '200px 218px',
                transform: `scaleY(${0.55 + midOuterProgress * 0.55}) scaleX(${0.65 + midOuterProgress * 0.6}) translateY(${midOuterProgress * 8}px)`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 200 218 
                   C 160 215, 135 185, 145 155 
                   C 170 140, 230 140, 255 155 
                   C 265 185, 240 215, 200 218 Z"
                fill="url(#petalOuterVelvet)"
                stroke="#36010B"
                strokeWidth="0.8"
              />
              <path
                d="M 150 156 C 175 142, 225 142, 250 156"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ----------------------------------------------------- */}
            {/* LAYER C: MID-INNER PETALS (Unfold from 0.35 to 0.95)  */}
            {/* ----------------------------------------------------- */}
            {/* Inner Left Petal Flank */}
            <g
              id="petal-inner-left"
              style={{
                transformOrigin: '197px 212px',
                transform: `rotate(${-midInnerProgress * 26}deg) scaleX(${0.8 + midInnerProgress * 0.35})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 197 212 
                   C 175 205, 155 180, 152 148 
                   C 168 132, 195 135, 203 158 
                   C 206 182, 203 202, 197 212 Z"
                fill="url(#petalInnerVelvet)"
                stroke="#470310"
                strokeWidth="0.7"
              />
              <path
                d="M 154 148 C 168 134, 192 136, 202 154"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Inner Right Petal Flank */}
            <g
              id="petal-inner-right"
              style={{
                transformOrigin: '203px 212px',
                transform: `rotate(${midInnerProgress * 26}deg) scaleX(${0.8 + midInnerProgress * 0.35})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 203 212 
                   C 225 205, 245 180, 248 148 
                   C 232 132, 205 135, 197 158 
                   C 194 182, 197 202, 203 212 Z"
                fill="url(#petalInnerVelvet)"
                stroke="#470310"
                strokeWidth="0.7"
              />
              <path
                d="M 246 148 C 232 134, 208 136, 198 154"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Inner Front Cup Petal */}
            <g
              id="petal-inner-front"
              style={{
                transformOrigin: '200px 212px',
                transform: `scaleY(${0.75 + midInnerProgress * 0.4}) scaleX(${0.8 + midInnerProgress * 0.4}) translateY(${midInnerProgress * 5}px)`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 200 212 
                   C 175 208, 160 185, 168 160 
                   C 182 148, 218 148, 232 160 
                   C 240 185, 225 208, 200 212 Z"
                fill="url(#petalInnerVelvet)"
                stroke="#45020E"
                strokeWidth="0.7"
              />
              <path
                d="M 172 160 C 185 150, 215 150, 228 160"
                stroke="url(#petalLipHighlight)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ----------------------------------------------------- */}
            {/* LAYER D: CORE SPIRAL & TURBINATE BUD HEART            */}
            {/* Unwinds smoothly as scroll progress reaches 100%      */}
            {/* ----------------------------------------------------- */}
            {/* Golden Stamens (Discovered at deep heart upon full bloom) */}
            <g
              id="golden-stamens"
              opacity={stamenOpacity}
              style={{
                transformOrigin: '200px 175px',
                transform: `scale(${0.4 + coreProgress * 0.6})`,
                transition: 'opacity 0.1s ease-out, transform 0.05s ease-out',
              }}
            >
              {/* Central golden stamen glow */}
              <circle cx="200" cy="176" r="11" fill="url(#stamenGold)" />
              {/* Individual micro anthers */}
              <circle cx="196" cy="172" r="1.5" fill="#FFEAA7" />
              <circle cx="204" cy="172" r="1.5" fill="#FFEAA7" />
              <circle cx="194" cy="178" r="1.6" fill="#FFF275" />
              <circle cx="206" cy="178" r="1.6" fill="#FFF275" />
              <circle cx="200" cy="173" r="1.4" fill="#FFEAA7" />
              <circle cx="198" cy="181" r="1.5" fill="#FFD166" />
              <circle cx="202" cy="181" r="1.5" fill="#FFD166" />
            </g>

            {/* Spiral Petal Whorl 1 (Left Heart Swirl) */}
            <g
              id="spiral-whorl-1"
              style={{
                transformOrigin: '197px 190px',
                transform: `rotate(${-coreProgress * 18}deg) scale(${1 + coreProgress * 0.25})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 200 205 
                   C 185 200, 172 182, 175 162 
                   C 185 150, 205 152, 206 170 
                   C 207 188, 204 198, 200 205 Z"
                fill="url(#petalInnerVelvet)"
                stroke="#540414"
                strokeWidth="0.6"
              />
              <path
                d="M 176 162 C 185 152, 202 153, 206 168"
                stroke="url(#petalLipHighlight)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Spiral Petal Whorl 2 (Right Heart Swirl) */}
            <g
              id="spiral-whorl-2"
              style={{
                transformOrigin: '203px 190px',
                transform: `rotate(${coreProgress * 18}deg) scale(${1 + coreProgress * 0.25})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              <path
                d="M 200 205 
                   C 215 200, 228 182, 225 162 
                   C 215 150, 195 152, 194 170 
                   C 193 188, 196 198, 200 205 Z"
                fill="url(#petalInnerVelvet)"
                stroke="#540414"
                strokeWidth="0.6"
              />
              <path
                d="M 224 162 C 215 152, 198 153, 194 168"
                stroke="url(#petalLipHighlight)"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Central Tight Bud Cone Core (Unfurls like classic tea rose whorl) */}
            <g
              id="spiral-center-cone"
              style={{
                transformOrigin: '200px 175px',
                transform: `scaleY(${1 - coreProgress * 0.35}) scaleX(${1 + coreProgress * 0.55})`,
                transition: 'transform 0.05s ease-out',
              }}
            >
              {/* Swirling center spiral lines */}
              <path
                d="M 193 178 
                   C 191 168, 198 160, 204 162 
                   C 209 164, 210 172, 206 177 
                   C 202 181, 196 182, 193 178 Z"
                fill="url(#petalInnerVelvet)"
                stroke="#630619"
                strokeWidth="0.6"
              />
              <path
                d="M 194 170 C 197 163, 205 163, 208 168"
                stroke="url(#petalLipHighlight)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
        </svg>

        {/* Ambient Bottom Fade: Softly dissolves bottom of stem into dark backdrop */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #140510 15%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
};
