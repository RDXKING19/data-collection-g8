// src/components/quiz/BossBattleModal.jsx
import React from 'react';

export function BossBattleModal({ boss, lives = 3, onStart, onClose }) {
  if (!boss) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md fade-in-up">
      <div className="w-full max-w-lg bg-[#200b3b]/95 border-2 border-rose-500/60 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col items-center text-center">
        {/* Boss Emoji Avatar */}
        <div className="w-20 h-20 rounded-2xl bg-rose-950/80 border-2 border-rose-400 text-5xl flex items-center justify-center mb-2 shadow-[0_0_24px_rgba(244,63,94,0.6)] animate-pulse">
          {boss.emoji}
        </div>

        {/* Boss Tag */}
        <div className="bg-rose-950/80 border border-rose-400/50 text-rose-300 text-xs font-bold px-3 py-0.5 rounded-full mb-1.5 tracking-wide uppercase">
          🚨 STATISTICAL CHALLENGER
        </div>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
          {boss.name}
        </h2>

        <p className="text-slate-200 text-xs sm:text-sm mb-4 leading-relaxed font-semibold">
          This challenger spreads statistical misconceptions across the school! Answer 5 questions with 3 lives to resolve the case and earn the <span className="text-amber-300 font-bold font-display">"{boss.reward}"</span> badge!
        </p>

        {/* Lives indicator */}
        <div className="flex items-center gap-2 mb-5 bg-black/40 px-4 py-1.5 rounded-full border border-white/10">
          <span className="text-xs font-bold text-slate-300 uppercase mr-1">Insight Lives:</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className={`text-xl ${i < lives ? 'opacity-100' : 'opacity-25 grayscale'}`}>
              ❤️
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full justify-center">
          <button
            onClick={onClose}
            className="btn-secondary text-xs sm:text-sm py-2 px-5 rounded-full cursor-pointer"
          >
            Fall Back
          </button>
          <button
            onClick={onStart}
            className="btn-gold text-xs sm:text-sm font-extrabold py-2.5 px-6 rounded-full shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:scale-105 transition cursor-pointer"
          >
            Challenge Boss! ⚔️
          </button>
        </div>
      </div>
    </div>
  );
}
