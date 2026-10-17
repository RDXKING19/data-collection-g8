// src/components/simulations/BinTheData.jsx
import React, { useState } from 'react';
import { playClickSound, playCorrectChime, narrate } from '../../utils/audio.js';

const COMMUTE_DATA = [
  12, 14, 15, 18, 19,
  21, 22, 23, 25, 26, 27, 28, 29,
  31, 32, 33, 34, 36, 37, 39,
  41, 42, 45, 48
];

export function BinTheData({ onComplete, audioEnabled = true }) {
  const [width, setWidth] = useState(10);
  const [boundaryAnswer, setBoundaryAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Derive intervals based on chosen width
  const intervals = [
    { lo: 10, hi: 10 + width, label: `10 ≤ t < ${10 + width}` },
    { lo: 10 + width, hi: 10 + width * 2, label: `${10 + width} ≤ t < ${10 + width * 2}` },
    { lo: 10 + width * 2, hi: 10 + width * 3, label: `${10 + width * 2} ≤ t < ${10 + width * 3}` },
    { lo: 10 + width * 3, hi: 10 + width * 4, label: `${10 + width * 3} ≤ t < ${10 + width * 4}` }
  ];

  const counts = intervals.map((inv) =>
    COMMUTE_DATA.filter((val) => val >= inv.lo && val < inv.hi).length
  );
  const totalBinned = counts.reduce((a, b) => a + b, 0);
  const isPerfect = width === 10;

  const handleWidthChange = (w) => {
    playClickSound();
    setWidth(w);
    if (audioEnabled) {
      narrate("Intervals configured! Equal class widths prevent misleading frequency distortions.", true);
    }
  };

  const handleBoundarySelect = (isCorrect) => {
    playClickSound();
    setBoundaryAnswer(isCorrect);
    if (isCorrect && isPerfect) {
      playCorrectChime();
      setIsCompleted(true);
      if (audioEnabled) {
        narrate("Station B complete! Equal classes and honest tallies turn raw commute times into clear data.", true);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden gap-2 text-white select-none">
      {/* 1. Header Banner */}
      <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-2.5 shadow-md shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xl">⏱️</span>
            <span className="font-display font-black text-sm text-cyan-300">
              Student Morning Commute Times (24 Students)
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/15 px-3 py-0.5 rounded-full border border-amber-400/40">
            Min: 12 min · Max: 48 min
          </span>
        </div>

        {/* Clean Data Summary Preview */}
        <div className="flex items-center justify-between bg-black/30 rounded-xl px-3 py-1.5 text-xs">
          <span className="text-slate-300 font-medium">Sample Values:</span>
          <div className="flex items-center gap-1.5 font-mono text-cyan-200 font-bold">
            <span className="bg-white/10 px-1.5 py-0.5 rounded">12m</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">18m</span>
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.5 rounded">20m</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">25m</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">33m</span>
            <span className="bg-white/10 px-1.5 py-0.5 rounded">48m</span>
            <span className="text-slate-400 font-normal">... (24 total)</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Binning Workbench (Left: Width choice, Right: Clean Table) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 flex-1 min-h-0">
        {/* Left Column: Width Controls & Rule (5 cols) */}
        <div className="md:col-span-5 bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-3 shadow-md flex flex-col justify-between">
          <div>
            <span className="font-display font-black text-xs text-amber-300 uppercase tracking-wide block mb-2">
              Step 1: Choose Class Interval Width
            </span>
            <div className="flex flex-col gap-2">
              {[
                { w: 5, label: '5 min width (Too narrow)' },
                { w: 10, label: '10 min width (Ideal: 4 equal classes) ⭐' },
                { w: 15, label: '15 min width (Too wide)' }
              ].map(({ w, label }) => (
                <button
                  key={w}
                  onClick={() => handleWidthChange(w)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition text-left cursor-pointer border ${
                    width === w
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md ring-2 ring-cyan-400/50'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/15'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Rule Guidance Note */}
          <div className="bg-[#0b041c] border border-white/15 rounded-xl p-2.5 text-xs">
            <span className="text-amber-300 font-bold block mb-1">📌 Standard Interval Rule:</span>
            <p className="font-mono text-cyan-200 font-bold mb-1">a ≤ t &lt; b</p>
            <p className="text-[11px] text-slate-300 leading-tight">
              Includes lower number <span className="text-emerald-300 font-bold">a</span>. Excludes upper number <span className="text-rose-300 font-bold">b</span>.
            </p>
          </div>
        </div>

        {/* Right Column: Clean Grouped Frequency Table (7 cols) */}
        <div className="md:col-span-7 bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-3 shadow-md flex flex-col justify-between">
          <div className="bg-[#0b041c] border border-white/15 rounded-xl p-2.5">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/20 text-slate-400 font-bold">
                  <th className="py-1">Class Interval (mins)</th>
                  <th className="py-1 text-center">Tally</th>
                  <th className="py-1 text-right">Students (f)</th>
                </tr>
              </thead>
              <tbody>
                {intervals.map((inv, i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="py-1.5 font-mono text-cyan-300 font-bold text-xs">
                      {inv.label} min
                    </td>
                    <td className="py-1.5 text-center font-mono text-amber-200 font-black">
                      {counts[i] === 5 ? '<s>||||</s>' : counts[i] === 8 ? '<s>||||</s> |||' : counts[i] === 7 ? '<s>||||</s> ||' : '||||'}
                    </td>
                    <td className="py-1.5 text-right font-mono font-black text-amber-300 text-sm">
                      {counts[i]}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-white/30 font-bold text-white">
                  <td className="py-1.5 font-mono">Total Students Grouped</td>
                  <td className="py-1.5 text-center text-slate-400">—</td>
                  <td className="py-1.5 text-right font-mono font-black text-emerald-300 text-sm">
                    {totalBinned} / 24 students (100%)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 3. Easy Boundary Rule Question (Step 2) */}
      <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-2.5 shadow-md shrink-0 flex flex-col gap-2">
        <h4 className="font-display font-extrabold text-xs sm:text-sm text-amber-300">
          Step 2: A student took exactly 20.0 minutes. Under <span className="font-mono text-white">a ≤ t &lt; b</span>, which class holds them?
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleBoundarySelect(true)}
            className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
              boundaryAnswer === true
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-md ring-2 ring-emerald-400'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
            }`}
          >
            <span className="block text-emerald-300 font-black mb-0.5">Option A (Correct) ✓</span>
            <span className="font-mono text-white text-xs block">20 ≤ t &lt; 30 min</span>
            <span className="text-[11px] text-slate-300">The lower boundary ≤ includes 20</span>
          </button>

          <button
            onClick={() => handleBoundarySelect(false)}
            className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
              boundaryAnswer === false
                ? 'bg-rose-950/90 border-rose-400 text-rose-200 ring-2 ring-rose-400'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
            }`}
          >
            <span className="block text-rose-300 font-black mb-0.5">Option B</span>
            <span className="font-mono text-white text-xs block">10 ≤ t &lt; 20 min</span>
            <span className="text-[11px] text-slate-300">The upper boundary &lt; excludes 20</span>
          </button>
        </div>

        {/* Completion Bar */}
        {isCompleted && (
          <div className="bg-emerald-950/90 border-2 border-emerald-400/70 rounded-xl px-4 py-2 flex items-center justify-between fade-in-up mt-0.5">
            <span className="text-xs sm:text-sm font-black text-emerald-300 flex items-center gap-2">
              <span>✓</span>
              <span>Station B Complete: Equal classes and non-overlapping boundaries!</span>
            </span>
            <button
              onClick={onComplete}
              className="btn-gold font-display font-black text-xs py-1.5 px-5 rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
            >
              Complete Station B ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BinTheData;
