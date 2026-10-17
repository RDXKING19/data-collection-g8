// src/components/simulations/kit.jsx
import React from 'react';

const TONES = {
  cyan:    'border-cyan-400 bg-cyan-950/80 text-cyan-100 shadow-[0_0_16px_rgba(56,189,248,0.45)]',
  amber:   'border-amber-400 bg-amber-950/80 text-amber-100 shadow-[0_0_16px_rgba(251,191,36,0.45)]',
  emerald: 'border-emerald-400 bg-emerald-950/80 text-emerald-100 shadow-[0_0_16px_rgba(52,211,153,0.45)]',
  rose:    'border-rose-400 bg-rose-950/80 text-rose-100 shadow-[0_0_16px_rgba(244,63,94,0.45)]',
  purple:  'border-purple-400 bg-purple-950/80 text-purple-100 shadow-[0_0_16px_rgba(168,85,247,0.45)]',
  ghost:   'border-white/20 border-dashed bg-white/5 text-white/40'
};

export function Panel({ children, className = '' }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 bg-[#1e1342]/95 border-2 border-cyan-400/30 rounded-2xl p-2.5 sm:p-3.5 shadow-xl flex-1 min-h-0 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function Node({ tone = 'cyan', children, w = 'w-24', className = '' }) {
  return (
    <div
      className={`${w} h-11 rounded-2xl border-2 font-display font-extrabold text-base sm:text-lg flex items-center justify-center text-center transition-all duration-300 ${TONES[tone] || TONES.cyan} ${className}`}
    >
      {children}
    </div>
  );
}

export function Msg({ tone = 'emerald', children }) {
  const cls = {
    emerald: 'bg-emerald-950/90 text-emerald-300 border-emerald-400/60 shadow-[0_0_14px_rgba(52,211,153,0.3)]',
    rose: 'bg-rose-950/90 text-rose-300 border-rose-400/60 shadow-[0_0_14px_rgba(244,63,94,0.3)]',
    amber: 'bg-amber-950/90 text-amber-200 border-amber-400/50 shadow-[0_0_14px_rgba(251,191,36,0.3)]',
    cyan: 'bg-cyan-950/90 text-cyan-200 border-cyan-400/50 shadow-[0_0_14px_rgba(56,189,248,0.3)]'
  }[tone] || 'bg-cyan-950/90 text-cyan-200 border-cyan-400/50';

  return (
    <div className={`w-full px-3 py-1.5 rounded-xl border-2 text-xs sm:text-sm font-bold text-center fade-in-up shrink-0 ${cls}`}>
      {children}
    </div>
  );
}

export const GoldBtn = ({ children, onClick, disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`btn-gold text-xs sm:text-sm font-extrabold px-5 py-2 shadow-lg hover:scale-105 transition cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export const GhostBtn = ({ children, onClick, disabled = false, active = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`font-display font-extrabold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border transition cursor-pointer shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
      active
        ? 'bg-cyan-400 text-slate-950 border-cyan-200 shadow-[0_0_14px_rgba(56,189,248,0.6)]'
        : 'bg-purple-900/80 hover:bg-purple-800 border-purple-400/40 text-purple-100'
    } ${className}`}
  >
    {children}
  </button>
);

/**
 * Accessible Stepper component (- / range / +)
 */
export function Stepper({
  label = '',
  unit = '',
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className = ''
}) {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  return (
    <div className={`flex items-center gap-2 bg-[#13082b]/90 border border-white/15 px-3 py-1.5 rounded-xl ${className}`}>
      {label && (
        <span className="font-display font-bold text-xs text-slate-300 whitespace-nowrap">
          {label}: <span className="text-amber-300 font-mono font-black">{value} {unit}</span>
        </span>
      )}

      <button
        onClick={dec}
        disabled={value <= min}
        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-black text-sm flex items-center justify-center transition disabled:opacity-30 cursor-pointer"
        aria-label={`Decrease ${label}`}
      >
        −
      </button>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 accent-amber-400 cursor-pointer h-1.5"
        aria-valuetext={`${value} ${unit}`}
      />

      <button
        onClick={inc}
        disabled={value >= max}
        className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-black text-sm flex items-center justify-center transition disabled:opacity-30 cursor-pointer"
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  );
}
