import React, { memo } from 'react';
import bouquetImg from '../assets/images/rose_bouquet_bg_1794407385082.jpg';

export const PermanentRoseBouquet: React.FC = memo(() => {
  return (
    <div
      className="fixed bottom-0 right-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Soft warm halo behind the bouquet */}
      <div className="absolute inset-0 bg-radial from-[#D9B76E]/20 via-[#400D24]/30 to-transparent blur-3xl transform translate-x-1/4 translate-y-1/4" />

      {/* Bouquet with natural vignette dissolve */}
      <div className="relative w-[240px] sm:w-[360px] md:w-[440px] lg:w-[500px] opacity-60 sm:opacity-70 transition-opacity duration-1000">
        <img
          src={bouquetImg}
          alt=""
          loading="eager"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_0_40px_rgba(64,13,36,0.6)] mix-blend-screen"
        />

        {/* Ambient radial fade mask so edges softly dissolve into dark background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 60% 60%, transparent 40%, #1a0a18 95%)',
          }}
        />
      </div>
    </div>
  );
});
