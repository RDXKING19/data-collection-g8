// components/shared/visuals/TypeTree.jsx
import React from 'react';

export function TypeTree({ highlight = 'discrete', label = '' }) {
  const isCategorical = highlight === 'categorical';
  const isDiscrete = highlight === 'discrete';
  const isContinuous = highlight === 'continuous';

  return (
    <div className="w-full flex flex-col items-center justify-center py-1 px-2 select-none">
      {/* Root Node */}
      <div className="bg-[#24134e] border-2 border-purple-400/50 rounded-xl px-3.5 py-1 shadow-lg text-xs sm:text-sm font-display font-extrabold text-white flex items-center gap-1.5 shrink-0">
        <span>📊</span>
        <span>Statistical Data</span>
      </div>

      {/* SVG Connecting Branches */}
      <svg className="w-56 h-6 my-0.5 shrink-0" viewBox="0 0 256 24" fill="none">
        <path d="M 128 0 L 128 8 L 64 8 L 64 24" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
        <path d="M 128 0 L 128 8 L 192 8 L 192 24" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" />
      </svg>

      {/* Level 1: Categorical vs Numerical */}
      <div className="flex items-center gap-4 sm:gap-8 shrink-0">
        {/* Categorical Node */}
        <div
          className={`px-3 py-1 rounded-xl border-2 font-display text-xs sm:text-sm font-bold flex flex-col items-center transition-all ${
            isCategorical
              ? 'bg-pink-600/35 border-pink-400 text-pink-200 shadow-[0_0_16px_rgba(244,114,182,0.6)] scale-105'
              : 'bg-[#150a2e] border-white/20 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span>🏷️</span>
            <span>Categorical</span>
          </div>
          <span className="text-[10px] text-pink-300/90 font-medium">Labels & groups</span>
        </div>

        {/* Numerical Node */}
        <div
          className={`px-3 py-1 rounded-xl border-2 font-display text-xs sm:text-sm font-bold flex flex-col items-center transition-all ${
            isDiscrete || isContinuous
              ? 'bg-cyan-600/35 border-cyan-400 text-cyan-200 shadow-[0_0_16px_rgba(56,189,248,0.6)] scale-105'
              : 'bg-[#150a2e] border-white/20 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <span>🔢</span>
            <span>Numerical</span>
          </div>
          <span className="text-[10px] text-cyan-300/90 font-medium">Quantities</span>
        </div>
      </div>

      {/* Level 2 Sub-branches for Numerical */}
      <svg className="w-52 h-5 my-0.5 ml-24 sm:ml-32 shrink-0" viewBox="0 0 160 20" fill="none">
        <path d="M 80 0 L 80 6 L 24 6 L 24 20" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <path d="M 80 0 L 80 6 L 136 6 L 136 20" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
      </svg>

      <div className="flex items-center gap-3 ml-20 sm:ml-28 shrink-0">
        {/* Discrete Node */}
        <div
          className={`px-2.5 py-1 rounded-xl border-2 font-display text-[11px] sm:text-xs font-bold transition-all ${
            isDiscrete
              ? 'bg-amber-500/35 border-amber-400 text-amber-200 shadow-[0_0_14px_rgba(251,191,36,0.6)] scale-105'
              : 'bg-[#150a2e] border-white/20 text-slate-300'
          }`}
        >
          <span>🎯 Discrete (Counted)</span>
        </div>

        {/* Continuous Node */}
        <div
          className={`px-2.5 py-1 rounded-xl border-2 font-display text-[11px] sm:text-xs font-bold transition-all ${
            isContinuous
              ? 'bg-emerald-500/35 border-emerald-400 text-emerald-200 shadow-[0_0_14px_rgba(74,222,128,0.6)] scale-105'
              : 'bg-[#150a2e] border-white/20 text-slate-300'
          }`}
        >
          <span>⏱️ Continuous (Measured)</span>
        </div>
      </div>

      {label && (
        <div className="mt-1.5 text-xs font-bold text-amber-300 bg-black/50 px-3 py-0.5 rounded-full border border-amber-400/40 shrink-0">
          Example: {label}
        </div>
      )}
    </div>
  );
}
