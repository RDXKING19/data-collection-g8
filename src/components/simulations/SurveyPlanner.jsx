// src/components/simulations/SurveyPlanner.jsx
import React, { useState } from 'react';
import { playClickSound, playCorrectChime, narrate } from '../../utils/audio.js';

export function SurveyPlanner({ onComplete, audioEnabled = true }) {
  const [dataType, setDataType] = useState(null);
  const [samplingMethod, setSamplingMethod] = useState(null);
  const [questionDesign, setQuestionDesign] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const isTypeCorrect = dataType === 'continuous';
  const isSampleCorrect = samplingMethod === 'systematic';
  const isQuestionCorrect = questionDesign === 'neutral';
  const isAllAnswered = dataType !== null && samplingMethod !== null && questionDesign !== null;
  const isAllCorrect = isTypeCorrect && isSampleCorrect && isQuestionCorrect;

  const handleAudit = () => {
    playClickSound();
    if (isAllCorrect) {
      playCorrectChime();
      setIsCompleted(true);
      if (audioEnabled) {
        narrate("Survey plan audited and 100 percent validated! Continuous measurement, systematic sampling, and neutral wording.", true);
      }
    }
  };

  const handleSelectType = (val) => {
    playClickSound();
    setDataType(val);
  };

  const handleSelectSample = (val) => {
    playClickSound();
    setSamplingMethod(val);
  };

  const handleSelectQuestion = (val) => {
    playClickSound();
    setQuestionDesign(val);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between overflow-hidden gap-2 text-white select-none">
      {/* 1. Header Banner */}
      <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-2.5 shadow-md shrink-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <span className="font-display font-black text-sm text-cyan-300">
              Student Council Mission: Canteen Queue Audit
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-400/15 px-3 py-0.5 rounded-full border border-cyan-400/40">
            Target: 60 Students / 1 200 Total Population
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-tight">
          Help the Insight Desk build a fair survey plan by choosing the 3 best decisions below:
        </p>
      </div>

      {/* 2. 3 Clean Decision Pillars (3 Columns Side-by-Side) */}
      <div className="grid grid-cols-3 gap-2.5 flex-1 min-h-0">
        {/* Step 1: Data Type */}
        <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-3 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-display font-black text-amber-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs">1</span>
              <span>Data Type</span>
            </div>
            <p className="text-xs text-slate-300 font-semibold mb-2">Queue time in minutes is:</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSelectType('continuous')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                dataType === 'continuous'
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-md ring-2 ring-emerald-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
              }`}
            >
              <span className="block text-emerald-300 font-black mb-0.5">⏱️ Continuous ✓</span>
              <span className="text-[11px] text-slate-300">Measured on unbroken time scale</span>
            </button>

            <button
              onClick={() => handleSelectType('discrete')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                dataType === 'discrete'
                  ? 'bg-rose-950/90 border-rose-400 text-rose-200 ring-2 ring-rose-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
              }`}
            >
              <span className="block text-slate-300 font-black mb-0.5">🔢 Discrete</span>
              <span className="text-[11px] text-slate-400">Counted in whole steps</span>
            </button>
          </div>
        </div>

        {/* Step 2: Sampling Strategy */}
        <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-3 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-display font-black text-amber-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs">2</span>
              <span>Sample Selection</span>
            </div>
            <p className="text-xs text-slate-300 font-semibold mb-2">Pick 60 of 1 200 students:</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSelectSample('systematic')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                samplingMethod === 'systematic'
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-md ring-2 ring-emerald-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
              }`}
            >
              <span className="block text-emerald-300 font-black mb-0.5">🎯 Systematic ✓</span>
              <span className="text-[11px] text-slate-300">Every 20th student on register</span>
            </button>

            <button
              onClick={() => handleSelectSample('convenience')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                samplingMethod === 'convenience'
                  ? 'bg-rose-950/90 border-rose-400 text-rose-200 ring-2 ring-rose-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
              }`}
            >
              <span className="block text-slate-300 font-black mb-0.5">🚪 Convenience</span>
              <span className="text-[11px] text-slate-400">First 60 at the door</span>
            </button>
          </div>
        </div>

        {/* Step 3: Question Phrasing */}
        <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-3 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-display font-black text-amber-300 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 flex items-center justify-center text-xs">3</span>
              <span>Neutral Question</span>
            </div>
            <p className="text-xs text-slate-300 font-semibold mb-2">Question phrasing:</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleSelectQuestion('neutral')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                questionDesign === 'neutral'
                  ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-md ring-2 ring-emerald-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
              }`}
            >
              <span className="block text-emerald-300 font-black mb-0.5">⚖️ Neutral Wording ✓</span>
              <span className="text-[11px] text-slate-300">"How many minutes do you queue?"</span>
            </button>

            <button
              onClick={() => handleSelectQuestion('leading')}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition cursor-pointer ${
                questionDesign === 'leading'
                  ? 'bg-rose-950/90 border-rose-400 text-rose-200 ring-2 ring-rose-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-slate-200'
              }`}
            >
              <span className="block text-slate-300 font-black mb-0.5">🗣️ Leading Wording</span>
              <span className="text-[11px] text-slate-400">"Isn't the queue way too slow?"</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Live 3-Pillar Validation Console */}
      <div className="bg-[#120728]/95 border border-purple-400/30 rounded-2xl p-2.5 shadow-md shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦉</span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-extrabold text-xs sm:text-sm text-white">
                Tally's Plan Audit:
              </span>
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className={`px-2.5 py-0.5 rounded-full border ${isTypeCorrect ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' : 'bg-white/5 text-slate-500 border-white/10'}`}>
                  {isTypeCorrect ? '✓ Continuous' : '○ 1. Type'}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full border ${isSampleCorrect ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' : 'bg-white/5 text-slate-500 border-white/10'}`}>
                  {isSampleCorrect ? '✓ Systematic' : '○ 2. Sample'}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full border ${isQuestionCorrect ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50' : 'bg-white/5 text-slate-500 border-white/10'}`}>
                  {isQuestionCorrect ? '✓ Neutral' : '○ 3. Question'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              {!isAllAnswered
                ? 'Select an option for all 3 decisions above.'
                : isAllCorrect
                ? '✓ 100% Validated! Unbiased question, continuous scale, and systematic sampling.'
                : '⚠️ Review any choices highlighted in red.'}
            </p>
          </div>
        </div>

        {isAllCorrect ? (
          <button
            onClick={() => {
              handleAudit();
              if (onComplete) onComplete();
            }}
            className="btn-gold font-display font-black text-xs sm:text-sm py-2 px-6 rounded-full shadow-[0_0_18px_rgba(250,204,21,0.6)] hover:scale-105 transition cursor-pointer shrink-0"
          >
            Complete Station C ✓
          </button>
        ) : (
          <button
            disabled={!isAllAnswered}
            onClick={handleAudit}
            className="btn-secondary text-xs py-2 px-5 rounded-full opacity-60 cursor-not-allowed shrink-0"
          >
            Audit Survey Plan
          </button>
        )}
      </div>
    </div>
  );
}

export default SurveyPlanner;
