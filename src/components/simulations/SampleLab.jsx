// src/components/simulations/SampleLab.jsx
import React, { useState } from 'react';
import { playClickSound, playCorrectChime, narrate } from '../../utils/audio.js';

const CAMPUS_ZONES = [
  { id: 'hall', name: 'Sports Hall', icon: '🏀', color: '#f43f5e' },
  { id: 'cant', name: 'Canteen', icon: '🍜', color: '#fb923c' },
  { id: 'class', name: 'Classrooms', icon: '📚', color: '#facc15' },
  { id: 'lib', name: 'Library', icon: '📖', color: '#38bdf8' },
  { id: 'music', name: 'Music Room', icon: '🎵', color: '#c084fc' }
];

export function SampleLab({ onComplete, audioEnabled = true }) {
  const [method, setMethod] = useState('convenience'); // 'convenience' | 'random'
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const isConvenience = method === 'convenience';
  const resultPct = isConvenience ? 90 : 50;
  const resultYes = isConvenience ? 18 : 10;

  const handleSelectMethod = (m) => {
    playClickSound();
    setMethod(m);
    if (audioEnabled) {
      if (m === 'convenience') {
        narrate("Convenience sample drawn: 20 court players give 90 percent support, showing heavy bias!", true);
      } else {
        narrate("Fair random sample drawn: 4 students from each of the 5 zones give 50 percent support, matching the school truth!", true);
      }
    }
  };

  const handleAnswerQuiz = (isCorrect) => {
    playClickSound();
    setQuizAnswer(isCorrect);
    if (isCorrect) {
      playCorrectChime();
      setIsCompleted(true);
      if (audioEnabled) {
        narrate("Station A complete! Fairness beats raw sample size.", true);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between gap-2 text-white select-none overflow-hidden">
      {/* 1. Campus Zones Banner */}
      <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-2 shadow-md shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">🏫</span>
            <span className="font-display font-black text-xs sm:text-sm text-cyan-300">
              Sunbird Campus (200 Students Across 5 Zones)
            </span>
          </div>
          <span className="text-[11px] font-mono font-black text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/40">
            True School Mean: 50% YES
          </span>
        </div>

        {/* 5 Clean Zone Chips */}
        <div className="grid grid-cols-5 gap-1.5">
          {CAMPUS_ZONES.map((z) => {
            const isSampled = isConvenience ? z.id === 'hall' : true;
            const count = isConvenience ? (z.id === 'hall' ? 20 : 0) : 4;

            return (
              <div
                key={z.id}
                style={{ borderColor: isSampled ? z.color : 'rgba(255,255,255,0.12)' }}
                className={`rounded-xl p-1.5 flex flex-col items-center text-center transition-all duration-200 ${
                  isSampled
                    ? 'bg-[#241152] border-2 shadow-sm'
                    : 'bg-black/30 border opacity-40'
                }`}
              >
                <span className="text-base">{z.icon}</span>
                <span className="text-[11px] font-black truncate w-full">{z.name}</span>
                <span className="text-[10px] text-amber-200 font-bold">
                  {isSampled ? `${count} voices` : '0 voices'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Interactive Comparison & Gauge (Strictly contained, no overflow) */}
      <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-2.5 shadow-md flex flex-col justify-between gap-1.5 shrink-0 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-display font-black text-xs text-amber-300 uppercase tracking-wide">
            Step 1: Test Both Sampling Methods (n = 20)
          </span>
          <span className="text-[11px] text-slate-300">Click to compare:</span>
        </div>

        {/* 2 Strategy Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleSelectMethod('convenience')}
            className={`p-2 rounded-xl border-2 flex items-center justify-between transition cursor-pointer ${
              isConvenience
                ? 'bg-rose-950/80 border-rose-400 text-white shadow-md ring-2 ring-rose-400/50'
                : 'bg-white/5 hover:bg-white/10 border-white/20 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 text-left">
              <span className="text-xl">🏀</span>
              <div>
                <p className="font-display font-black text-xs text-rose-300 leading-tight">
                  Convenience (Court Only)
                </p>
                <p className="text-[10px] text-slate-300">Ask 20 basketball friends</p>
              </div>
            </div>
            <span className="font-mono font-black text-xs text-rose-300 bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-400/40">
              90% YES
            </span>
          </button>

          <button
            onClick={() => handleSelectMethod('random')}
            className={`p-2 rounded-xl border-2 flex items-center justify-between transition cursor-pointer ${
              !isConvenience
                ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md ring-2 ring-emerald-400/50'
                : 'bg-white/5 hover:bg-white/10 border-white/20 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 text-left">
              <span className="text-xl">🎲</span>
              <div>
                <p className="font-display font-black text-xs text-emerald-300 leading-tight">
                  Fair Random (All 5 Zones)
                </p>
                <p className="text-[10px] text-slate-300">Ask 4 students per zone</p>
              </div>
            </div>
            <span className="font-mono font-black text-xs text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/40">
              50% YES
            </span>
          </button>
        </div>

        {/* Clean Static Gauge (Zero overflow) */}
        <div className="bg-[#0b041c] border border-white/15 rounded-xl p-2 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px] font-bold">
            <span className="text-cyan-300 font-mono">🎯 True School Mean: 50%</span>
            <span className={`font-mono font-black ${isConvenience ? 'text-rose-400' : 'text-emerald-400'}`}>
              Sample Result: {resultYes}/20 ({resultPct}% YES)
            </span>
          </div>

          <div className="relative w-full h-4 bg-white/10 rounded-full flex items-center px-0.5 border border-white/15 overflow-hidden">
            <div style={{ left: '50%' }} className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_8px_#38bdf8] z-10" />
            <div
              style={{ width: `${resultPct}%` }}
              className={`h-full rounded-full transition-all duration-300 ${
                isConvenience ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
            />
          </div>

          <p className={`text-[11px] font-bold text-center leading-tight py-0.5 ${isConvenience ? 'text-rose-300' : 'text-emerald-300'}`}>
            {isConvenience
              ? '⚠️ Heavy Bias (+40% error): Asking only court players ignores the rest of the school!'
              : '🎯 Perfectly Representative (0% error): Drawing from all 5 zones matches the true school average!'}
          </p>
        </div>
      </div>

      {/* 3. Comprehension Question & Complete Action (Fixed container, cannot overlap) */}
      <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-2.5 shadow-md shrink-0 flex flex-col gap-1.5 overflow-hidden">
        <div className="flex items-center justify-between">
          <h4 className="font-display font-extrabold text-xs sm:text-sm text-amber-300">
            Step 2: Why did Jun Hao's court survey give the wrong answer?
          </h4>
          {isCompleted && (
            <span className="text-xs font-black text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-400/50">
              ✓ Solved!
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleAnswerQuiz(true)}
            className={`p-2 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
              quizAnswer === true
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-md ring-2 ring-emerald-400'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
            }`}
          >
            <span className="block text-emerald-300 font-black mb-0.5">Option A (Correct) ✓</span>
            <span className="text-[11px] text-slate-200 block leading-tight">
              It only asked court players and excluded other students. Bigger sample size cannot fix this!
            </span>
          </button>

          <button
            onClick={() => handleAnswerQuiz(false)}
            className={`p-2 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
              quizAnswer === false
                ? 'bg-rose-950/90 border-rose-400 text-rose-200 ring-2 ring-rose-400'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
            }`}
          >
            <span className="block text-rose-300 font-black mb-0.5">Option B</span>
            <span className="text-[11px] text-slate-200 block leading-tight">
              Jun Hao should have asked 500 court players instead of 10.
            </span>
          </button>
        </div>

        {/* Inline Completion Button */}
        {isCompleted && (
          <div className="flex items-center justify-between bg-emerald-950/90 border border-emerald-400/60 rounded-xl px-3 py-1.5 mt-0.5 fade-in-up">
            <span className="text-xs font-black text-emerald-300">
              Station A Complete: Fair representation beats raw sample size!
            </span>
            <button
              onClick={onComplete}
              className="btn-gold font-display font-black text-xs py-1 px-4 rounded-full shadow-lg hover:scale-105 transition cursor-pointer"
            >
              Complete Station A ✓
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SampleLab;
