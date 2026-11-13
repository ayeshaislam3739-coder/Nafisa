import React, { useState, useCallback, Suspense, lazy } from 'react';
import confetti from 'canvas-confetti';
import { OpeningExperience } from './components/OpeningExperience';
import { AtmosphereBackground } from './components/AtmosphereBackground';
import { RosePetalSystem } from './components/RosePetalSystem';
import { HeartCursorTrail } from './components/HeartCursorTrail';
import { Navigation } from './components/Navigation';
import { BirthdayHero } from './components/BirthdayHero';
import { WebsiteBackgroundRose } from './components/WebsiteBackgroundRose';
import { WebsiteShowcaseSection } from './components/WebsiteShowcaseSection';
import { SectionDivider } from './components/SectionDivider';

// Code splitting: Lazy load below-the-fold sections for instant initial loading
const HiddenHeartSecret = lazy(() => import('./components/HiddenHeartSecret').then(m => ({ default: m.HiddenHeartSecret })));
const MemoriesGallerySection = lazy(() => import('./components/MemoriesGallerySection').then(m => ({ default: m.MemoriesGallerySection })));
const LoveLetter = lazy(() => import('./components/LoveLetter').then(m => ({ default: m.LoveLetter })));
const BeginningOfForeverSection = lazy(() => import('./components/BeginningOfForeverSection').then(m => ({ default: m.BeginningOfForeverSection })));
const FlowerBoutique = lazy(() => import('./components/FlowerBoutique').then(m => ({ default: m.FlowerBoutique })));
const OrbitingHeart3D = lazy(() => import('./components/OrbitingHeart3D').then(m => ({ default: m.OrbitingHeart3D })));
const AncientNotesCollection = lazy(() => import('./components/AncientNotesCollection').then(m => ({ default: m.AncientNotesCollection })));
const PersonalizedExperiencesSection = lazy(() => import('./components/PersonalizedExperiencesSection').then(m => ({ default: m.PersonalizedExperiencesSection })));
const MinimalManifestoSection = lazy(() => import('./components/MinimalManifestoSection').then(m => ({ default: m.MinimalManifestoSection })));
const FinalCelebration = lazy(() => import('./components/FinalCelebration').then(m => ({ default: m.FinalCelebration })));

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [petalDensity, setPetalDensity] = useState(1);

  const handleEnterWorld = useCallback(() => {
    setHasEntered(true);
  }, []);

  const handlePetalSurge = useCallback(() => {
    setPetalDensity(1.8);
    setTimeout(() => {
      setPetalDensity(1);
    }, 4500);
  }, []);

  const handleCelebrateAction = useCallback(() => {
    handlePetalSurge();
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.3 },
      colors: ['#D9B76E', '#FFF4EA', '#F7C5D0', '#E88CA8'],
    });

    const el = document.getElementById('finale');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [handlePetalSurge]);

  const handleDiscover = useCallback(() => {
    const el = document.getElementById('introducing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="relative min-h-screen text-[#FFF4EA] selection:bg-[#E88CA8]/30 selection:text-[#FFF4EA] overflow-x-hidden">
      {/* Multi-Layered Atmosphere Background */}
      <AtmosphereBackground />

      {/* Center Background Rose: Exact uploaded background-removed red rose */}
      <WebsiteBackgroundRose />

      {/* Lightweight Glowing Heart Cursor Trail for desktop */}
      <HeartCursorTrail />

      {/* Optimized Realistic Falling Rose Petals (Always Active, Paused on Tab Hide) */}
      <RosePetalSystem densityMultiplier={petalDensity} />

      {/* Cinematic Opening Screen (Until Nafisa enters) */}
      {!hasEntered ? (
        <OpeningExperience onEnter={handleEnterWorld} />
      ) : (
        <div className="relative z-10 transition-opacity duration-700">
          {/* Top Navigation Bar (Tap NAFISA for Secret Name Reveal) */}
          <Navigation onCelebrateClick={handleCelebrateAction} />

          {/* SECTION 01 — Cinematic Introduction */}
          <BirthdayHero onDiscover={handleDiscover} />

          {/* SECTION 02 — Introducing Project Nafisa ("MORE THAN JUST A WEBSITE...") */}
          <WebsiteShowcaseSection />

          {/* Below-the-fold sections with smooth Suspense boundary */}
          <Suspense fallback={<div className="min-h-[120px]" />}>
            {/* Floating Secret Keepsake Button */}
            <HiddenHeartSecret />

            <SectionDivider subtle />

            {/* SECTION 03 — Our Memories Split Editorial & 6-Photo Gallery */}
            <MemoriesGallerySection />

            <SectionDivider />

            {/* SECTION 04 — Love Letter Split Editorial & Ancient Parchment */}
            <LoveLetter />

            <SectionDivider />

            {/* SECTION 05 — The Beginning of Forever & Live Chronometer */}
            <BeginningOfForeverSection />

            <SectionDivider />

            {/* Luxury Romantic Flower Boutique & Curated Bouquets */}
            <FlowerBoutique />

            <SectionDivider />

            {/* SECTION 06 — Interactive Breaking Heart Note Reveal */}
            <OrbitingHeart3D />

            <SectionDivider />

            {/* SECTION 07 — Ancient Love Note Collection (All 4 Preserved Templates) */}
            <AncientNotesCollection />

            <SectionDivider />

            {/* SECTION 08 — Personalized Experiences Showcase & Interactive Keepsakes */}
            <PersonalizedExperiencesSection onPetalSurge={handlePetalSurge} />

            <SectionDivider />

            {/* SECTION 09 — Minimal Emotional Statement */}
            <MinimalManifestoSection />

            <SectionDivider subtle />

            {/* SECTION 10 — Final Romantic Message & Forever Celebration */}
            <FinalCelebration onPetalSurge={handlePetalSurge} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
