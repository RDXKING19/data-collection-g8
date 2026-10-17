// src/components/phases/WonderPhase.jsx
import React, { useEffect } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { DotCrowd } from '../shared/visuals/DotCrowd.jsx';
import { narrate, stopNarration } from '../../utils/audio.js';

export function WonderPhase({ muted, onNext }) {
  useEffect(() => {
    if (!muted) {
      narrate("Can 10 friends near the basketball court speak for 1 200 students? Good decisions need good data, and good data starts with a fair plan.", true);
    }
    return () => stopNarration();
  }, [muted]);

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      <div className="w-full max-w-3xl glass-card flex flex-col items-center text-center fade-in-up z-20 my-auto py-3 sm:py-4 px-4 sm:px-6 border-2 border-purple-400/40 rounded-3xl shadow-2xl bg-[#160b38]/95 max-h-[calc(100dvh-var(--header-h,56px)-12px)] overflow-y-auto overflow-x-hidden justify-between">
        {/* Glowing Phase Band */}
        <div className="phase-band phase-band--wonder w-24 h-1.5 bg-purple-400 rounded-full mb-1 shadow-[0_0_16px_rgba(192,132,252,0.8)] shrink-0" />

        <div className="flex items-center gap-2 mb-1 shrink-0">
          <span className="text-xl sm:text-2xl">🔍</span>
          <span className="text-purple-300 font-display font-extrabold text-xs sm:text-sm tracking-wider uppercase">
            Phase 1: Wonder & Curiosity
          </span>
        </div>

        <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-purple-100 mb-1.5 max-w-2xl shrink-0">
          Can 10 Students Speak for 1 200?
        </h2>

        {/* Feature Visual Box */}
        <div className="w-full bg-[#1e143c]/90 border border-purple-400/30 rounded-2xl p-2.5 sm:p-3 mb-2 flex flex-col items-center shadow-xl shrink-0">
          <div className="w-full max-w-md flex items-center justify-center mb-1">
            <DotCrowd total={120} highlightCount={10} title="1 200 Total Students (1 dot = 10 students)" />
          </div>
          <div className="text-amber-300 font-mono font-black text-xs sm:text-sm mb-1">
            Jun Hao surveyed 10 teammates · 1 190 voices unheard!
          </div>
          <p className="text-slate-200 text-xs sm:text-sm max-w-xl leading-relaxed font-semibold">
            The principal wants to know what food the whole school desires. Jun Hao asked 10 basketball friends who all voted for burgers. But Priya wonders: does this represent all 1 200 students across Sec 1 to 4?
          </p>
        </div>

        {/* Mascot Thinking Bubble */}
        <div className="flex items-center gap-2.5 bg-[#14082c]/90 border border-purple-500/40 rounded-2xl px-3.5 py-1.5 mb-2.5 shrink-0 max-w-xl shadow-md">
          <div className="w-8 h-8 rounded-xl bg-purple-500/30 text-purple-200 flex items-center justify-center font-bold text-base shrink-0">
            🦉
          </div>
          <p className="text-slate-100 text-xs sm:text-sm font-bold text-left leading-snug">
            "A bigger biased sample never fixes an unfair method. How do we collect data fairly?"
          </p>
        </div>

        <button
          onClick={onNext}
          className="btn-gold text-xs sm:text-sm md:text-base font-black px-8 py-2.5 rounded-full flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105 transition shrink-0"
        >
          <span>Discover the 4-Step Cycle</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
