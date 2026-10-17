// src/components/phases/StoryPhase.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { narrate, stopNarration } from '../../utils/audio.js';
import { STORY_PANELS } from '../../data/storyContent.js';

export function StoryPhase({ muted, onDone, onSlideChange }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const [imageError, setImageError] = useState(false);
  const slide = STORY_PANELS[slideIdx];

  const slideChangeRef = useRef(onSlideChange);
  slideChangeRef.current = onSlideChange;

  useEffect(() => {
    if (slideChangeRef.current) {
      slideChangeRef.current(slideIdx + 1, STORY_PANELS.length);
    }
    setImageError(false);
  }, [slideIdx]);

  useEffect(() => {
    if (!muted) {
      narrate(`${slide.title}. ${slide.text} Key takeaway: ${slide.highlight}`, true);
    }
    return () => stopNarration();
  }, [slideIdx, muted, slide]);

  const goNext = () => {
    if (slideIdx < STORY_PANELS.length - 1) {
      setSlideIdx((i) => i + 1);
    } else {
      onDone();
    }
  };

  const goPrev = () => {
    if (slideIdx > 0) setSlideIdx((i) => i - 1);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      {/* Main Story Glass Card (No vertical scroll) */}
      <div className="w-full max-w-5xl max-h-[calc(100dvh-var(--header-h,56px)-18px)] h-full bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between fade-in-up z-20 my-auto overflow-hidden">
        {/* Top Header Row: Slide Counter & Title */}
        <div className="w-full flex items-center justify-between border-b border-white/15 pb-2.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="text-amber-400 text-sm sm:text-base font-black uppercase tracking-wider">
              Slide {slide.panel} of {STORY_PANELS.length}
            </span>
            <span className="text-white/30">•</span>
            <span className="text-purple-300 text-sm sm:text-base font-extrabold">
              Sunbird Secondary Insight Desk
            </span>
          </div>

          <div className="flex items-center gap-2">
            {STORY_PANELS.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  i === slideIdx ? 'bg-amber-400 w-8 shadow-[0_0_10px_rgba(250,204,21,0.7)]' : 'bg-white/20 hover:bg-white/40 w-3'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Middle Two-Column Body Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch flex-1 min-h-0 py-2.5 overflow-hidden">
          {/* Left Column: Graphic / Illustration Container */}
          <div className="md:col-span-5 flex flex-col h-full justify-between gap-3 overflow-hidden">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 flex-1 w-full bg-black/40 flex items-center justify-center min-h-[170px]">
              {!imageError ? (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div
                  style={{ backgroundColor: slide.imageBg || '#1e0e45' }}
                  className="w-full h-full flex flex-col items-center justify-center p-4 text-center select-none"
                >
                  <span className="text-5xl sm:text-6xl mb-2 drop-shadow-lg animate-bounce">
                    {slide.imageEmoji}
                  </span>
                  <span className="font-display font-black text-lg sm:text-xl text-amber-300">
                    {slide.title}
                  </span>
                  <span className="text-xs text-slate-300 mt-1">
                    Insight Phase • Slide #{slide.panel}
                  </span>
                </div>
              )}
            </div>

            {/* Character Dialogue Bubble - Increased Text Size & Clarity */}
            <div className="w-full bg-[#1e0e45]/95 border-2 border-amber-400/50 rounded-2xl px-3.5 py-2.5 flex items-center gap-3 backdrop-blur-md shadow-lg shrink-0">
              <span className="text-2xl sm:text-3xl shrink-0">{slide.characterEmoji}</span>
              <div className="text-left flex-1">
                <span className="text-xs font-mono font-black text-amber-400 block tracking-wider uppercase mb-0.5">
                  {slide.character}:
                </span>
                <span className="text-sm sm:text-base font-extrabold text-amber-100 leading-snug block">
                  "{slide.bubble}"
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Typography & Takeaway Pill - Enhanced Large Text */}
          <div className="md:col-span-7 flex flex-col justify-between h-full gap-3 overflow-hidden">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-amber-300 leading-tight mb-3 drop-shadow-[0_2px_12px_rgba(250,204,21,0.3)]">
                {slide.title}
              </h2>

              <p className="text-slate-100 text-sm sm:text-base md:text-lg lg:text-[1.18rem] leading-relaxed sm:leading-loose font-bold tracking-normal">
                {slide.text}
              </p>
            </div>

            {/* Pull-Quote Sparkle Pill */}
            <div className="w-full bg-[#200f48]/90 border-2 border-amber-400/60 rounded-2xl px-4 py-3 text-center text-amber-300 font-display font-black text-sm sm:text-base md:text-lg flex items-center justify-center gap-2.5 shadow-xl shrink-0">
              <span className="text-lg">✨</span>
              <span className="leading-snug">{slide.highlight}</span>
              <span className="text-lg">✨</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons Row */}
        <div className="w-full flex items-center justify-between pt-2.5 border-t border-white/15 shrink-0">
          <button
            onClick={goPrev}
            disabled={slideIdx === 0}
            className="btn-secondary text-sm sm:text-base font-extrabold px-6 py-2.5 rounded-full cursor-pointer transition disabled:opacity-30 disabled:cursor-not-allowed shadow-md"
          >
            ← Back
          </button>

          <span className="text-xs sm:text-sm font-extrabold text-slate-300 hidden sm:inline">
            {slide.character}: <strong className="text-white">{slide.title}</strong>
          </span>

          <button
            onClick={goNext}
            className="btn-gold font-display font-black text-sm sm:text-base px-7 py-2.5 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.6)] hover:scale-105 transition cursor-pointer flex items-center gap-2"
          >
            <span>
              {slideIdx === STORY_PANELS.length - 1 ? 'Enter Simulation Lab 🧪' : 'Next Slide'}
            </span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
