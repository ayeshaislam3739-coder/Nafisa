import React from 'react';
import { Heart } from 'lucide-react';

interface SectionDividerProps {
  subtle?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ subtle = false }) => {
  return (
    <div
      className={`relative z-10 w-full max-w-4xl mx-auto px-6 ${
        subtle ? 'py-2' : 'py-3 sm:py-4'
      } flex items-center justify-center pointer-events-none select-none`}
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D9B76E]/35 to-[#D9B76E]/60" />
      <div className="mx-3 flex items-center gap-2 text-[#D9B76E]/75">
        <span className="w-1 h-1 rounded-full bg-[#D9B76E]/60" />
        <Heart className="w-3 h-3 fill-[#9E1938]/80 text-[#D9B76E]/85" />
        <span className="w-1 h-1 rounded-full bg-[#D9B76E]/60" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#D9B76E]/35 to-[#D9B76E]/60" />
    </div>
  );
};
