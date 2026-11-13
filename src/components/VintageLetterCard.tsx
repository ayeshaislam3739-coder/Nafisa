import React from 'react';
import { Heart } from 'lucide-react';

export type VintageLetterVariant = 'ancient' | 'romance' | 'secret' | 'forever';

interface VintageLetterCardProps {
  variant?: VintageLetterVariant;
  className?: string;
  children: React.ReactNode;
  showWaxSeal?: boolean;
  waxSealLabel?: string;
}

const VARIANT_STYLES: Record<
  VintageLetterVariant,
  {
    bgGradient: string;
    borderOuter: string;
    borderInner: string;
    vignetteShadow: string;
    cornerColor: string;
    waxBg: string;
  }
> = {
  // Template A — The Ancient Love Letter: warm aged parchment, darkened edges, classic wax seal
  ancient: {
    bgGradient:
      'linear-gradient(155deg, #F5E8D0 0%, #EEDAB7 45%, #E3C89E 100%)',
    borderOuter: 'border-[#B98E46]/70',
    borderInner: 'border-[#7E1730]/25',
    vignetteShadow:
      'inset 0 0 48px rgba(92, 48, 20, 0.28), inset 0 0 14px rgba(58, 22, 12, 0.2), 0 24px 55px rgba(0, 0, 0, 0.72)',
    cornerColor: '#8B5E23',
    waxBg: 'from-[#9A1B3B] via-[#6D0E26] to-[#3A0412]',
  },
  // Template B — The Vintage Romance Letter: antique ivory paper, floral botanical corners, burgundy accents
  romance: {
    bgGradient:
      'linear-gradient(150deg, #FBF2E3 0%, #F4E4CB 55%, #EAD3B1 100%)',
    borderOuter: 'border-[#C49B54]/65',
    borderInner: 'border-[#8D1D3B]/30',
    vignetteShadow:
      'inset 0 0 40px rgba(108, 52, 34, 0.2), inset 0 0 10px rgba(72, 24, 24, 0.14), 0 22px 50px rgba(0, 0, 0, 0.68)',
    cornerColor: '#7A1B33',
    waxBg: 'from-[#A52042] via-[#710F29] to-[#3B0613]',
  },
  // Template C — The Secret Message: deeper tea-stained parchment, envelope motif & sealing wax
  secret: {
    bgGradient:
      'linear-gradient(160deg, #EDD9B8 0%, #E3C89C 52%, #D4B483 100%)',
    borderOuter: 'border-[#A77D3B]/75',
    borderInner: 'border-[#6D132A]/30',
    vignetteShadow:
      'inset 0 0 54px rgba(78, 36, 14, 0.34), inset 0 0 16px rgba(45, 16, 8, 0.24), 0 24px 60px rgba(0, 0, 0, 0.78)',
    cornerColor: '#6D132A',
    waxBg: 'from-[#8E1534] via-[#5E0A20] to-[#2F030E]',
  },
  // Template D — The Forever Letter: cream parchment, gold filigree, delicate rose ornament
  forever: {
    bgGradient:
      'linear-gradient(155deg, #F8EFE1 0%, #F1E1C8 50%, #E6CEAA 100%)',
    borderOuter: 'border-[#C9A15A]/75',
    borderInner: 'border-[#96702D]/35',
    vignetteShadow:
      'inset 0 0 42px rgba(96, 54, 22, 0.22), inset 0 0 12px rgba(60, 28, 12, 0.16), 0 24px 55px rgba(0, 0, 0, 0.72)',
    cornerColor: '#96702D',
    waxBg: 'from-[#9E1938] via-[#6B0E24] to-[#360410]',
  },
};

export const VintageLetterCard: React.FC<VintageLetterCardProps> = ({
  variant = 'ancient',
  className = '',
  children,
  showWaxSeal = false,
  waxSealLabel,
}) => {
  const theme = VARIANT_STYLES[variant];

  return (
    <div
      className={`relative rounded-2xl border-2 ${theme.borderOuter} text-[#260D14] overflow-hidden ${className}`}
      style={{
        background: theme.bgGradient,
        boxShadow: theme.vignetteShadow,
      }}
    >
      {/* Subtle Aged Paper Fiber & Sepia Mottling */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(#5A2D18 0.9px, transparent 0.9px), radial-gradient(#8A5A32 0.7px, transparent 0.7px)',
          backgroundSize: '20px 20px, 13px 13px',
          backgroundPosition: '0 0, 7px 9px',
        }}
      />

      {/* Warm Aged Edge Vignette Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 58%, rgba(86, 44, 18, 0.14) 88%, rgba(56, 22, 10, 0.24) 100%)',
        }}
      />

      {/* Inner Ornamental Hairline Frame */}
      <div
        className={`absolute inset-2.5 sm:inset-3.5 rounded-xl border ${theme.borderInner} pointer-events-none`}
      />

      {/* Variant Decorative Corner Flourishes */}
      {variant === 'romance' || variant === 'forever' ? (
        <>
          <svg
            className="absolute top-3 left-3 w-8 h-8 pointer-events-none opacity-65"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 28 C4 12 12 4 28 4 M4 18 C10 18 18 10 18 4 M9 9 C13 13 13 17 9 19 C7 17 7 13 9 9Z"
              stroke={theme.cornerColor}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="absolute top-3 right-3 w-8 h-8 pointer-events-none opacity-65 -scale-x-100"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 28 C4 12 12 4 28 4 M4 18 C10 18 18 10 18 4 M9 9 C13 13 13 17 9 19 C7 17 7 13 9 9Z"
              stroke={theme.cornerColor}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="absolute bottom-3 left-3 w-8 h-8 pointer-events-none opacity-65 -scale-y-100"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 28 C4 12 12 4 28 4 M4 18 C10 18 18 10 18 4 M9 9 C13 13 13 17 9 19 C7 17 7 13 9 9Z"
              stroke={theme.cornerColor}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="absolute bottom-3 right-3 w-8 h-8 pointer-events-none opacity-65 scale-x-[-1] scale-y-[-1]"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 28 C4 12 12 4 28 4 M4 18 C10 18 18 10 18 4 M9 9 C13 13 13 17 9 19 C7 17 7 13 9 9Z"
              stroke={theme.cornerColor}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </>
      ) : (
        <>
          <div
            className="absolute top-3.5 left-3.5 w-6 h-6 border-t-2 border-l-2 pointer-events-none opacity-60"
            style={{ borderColor: theme.cornerColor }}
          />
          <div
            className="absolute top-3.5 right-3.5 w-6 h-6 border-t-2 border-r-2 pointer-events-none opacity-60"
            style={{ borderColor: theme.cornerColor }}
          />
          <div
            className="absolute bottom-3.5 left-3.5 w-6 h-6 border-b-2 border-l-2 pointer-events-none opacity-60"
            style={{ borderColor: theme.cornerColor }}
          />
          <div
            className="absolute bottom-3.5 right-3.5 w-6 h-6 border-b-2 border-r-2 pointer-events-none opacity-60"
            style={{ borderColor: theme.cornerColor }}
          />
        </>
      )}

      {/* Optional Envelope Fold Lines for Secret Variant */}
      {variant === 'secret' && (
        <svg
          className="absolute inset-x-0 top-0 w-full h-14 pointer-events-none opacity-15"
          viewBox="0 0 400 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 0 L200 36 L400 0" stroke="#5A2814" strokeWidth="1.2" fill="none" />
        </svg>
      )}

      {/* Optional Pressed Crimson Wax Seal Medallion */}
      {showWaxSeal && (
        <div className="relative z-10 flex flex-col items-center pt-5 pb-1">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.waxBg} border-2 border-[#D9B76E]/80 shadow-[0_4px_14px_rgba(64,10,24,0.45)] flex items-center justify-center`}
          >
            <Heart className="w-5 h-5 fill-[#D9B76E]/90 text-[#F8E2B0]" />
          </div>
          {waxSealLabel && (
            <span className="mt-1.5 font-cormorant text-[11px] uppercase tracking-[0.25em] font-bold text-[#6E122B]">
              {waxSealLabel}
            </span>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
