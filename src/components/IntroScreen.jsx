// src/components/IntroScreen.jsx
import React from 'react';
import { FloatingSymbols } from './shared/FloatingSymbols.jsx';

export function IntroScreen({ onBegin }) {
  return (
    <div className="w-full h-full flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 relative overflow-hidden select-none z-10">
      <FloatingSymbols />

      {/* Main Intro Content Card */}
      <div className="relative w-full max-w-4xl flex flex-col items-center text-center fade-in-up z-20 my-auto justify-between overflow-hidden py-1">
        {/* Curriculum Pill Badge */}
        <div className="bg-[#1c0d38] border-2 border-amber-400/50 text-amber-300 text-xs sm:text-sm font-extrabold px-5 py-1 rounded-full shadow-lg mb-2.5 tracking-wide shrink-0">
          ✨ Grade 8 · Statistics & Data Collection
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white text-center leading-tight tracking-tight mb-2 shrink-0">
          SurveyQuest
          <span className="text-amber-300 font-black block drop-shadow-[0_4px_16px_rgba(250,204,21,0.45)] mt-0.5">
            Sunbird Secondary Insight Desk
          </span>
        </h1>

        {/* Mascot Avatar & Speech Pill */}
        <div className="flex items-center gap-2.5 mb-3 shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border-2 border-amber-400 text-amber-300 flex items-center justify-center text-xl shadow-[0_0_16px_rgba(250,204,21,0.4)] shrink-0">
            🦉
          </div>
          <div className="bg-white rounded-full px-5 py-1.5 text-[#0c031d] font-display font-extrabold text-xs sm:text-sm md:text-base shadow-xl flex items-center gap-1.5">
            <span>Ready to collect honest, unbiased data?</span>
            <span>📋</span>
          </div>
        </div>

        {/* Subtitle text */}
        <p className="text-slate-200 text-xs sm:text-sm md:text-base max-w-2xl text-center leading-relaxed mb-3.5 font-semibold drop-shadow-sm shrink-0">
          Join Priya, Jun Hao, and Tally the Owl to master data classification, representative sampling, bias elimination, and organized frequency tables!
        </p>

        {/* YOUR LEARNING JOURNEY Flow Card */}
        <div className="w-full max-w-3xl bg-[#14082c]/95 border-2 border-purple-400/40 rounded-3xl p-3.5 sm:p-4 shadow-2xl backdrop-blur-md flex flex-col items-center mb-4 shrink-0">
          <p className="text-amber-400 text-xs sm:text-sm font-display font-extrabold tracking-wider text-center mb-3 uppercase">
            YOUR 5-PHASE STATISTICAL QUEST
          </p>

          <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full text-center">
            {/* Wonder */}
            <div className="flex flex-col items-center p-1 rounded-2xl bg-white/5 border border-purple-400/20">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-purple-400 bg-purple-950/90 text-purple-200 flex items-center justify-center text-base shadow-[0_0_12px_rgba(192,132,252,0.5)] mb-1">
                🔍
              </div>
              <p className="font-display font-extrabold text-white text-xs sm:text-sm">Wonder</p>
              <p className="text-purple-200 text-[10px] sm:text-xs font-bold leading-tight mt-0.5">Spark Question</p>
            </div>

            {/* Story */}
            <div className="flex flex-col items-center p-1 rounded-2xl bg-white/5 border border-amber-400/20">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-amber-400 bg-amber-950/90 text-amber-200 flex items-center justify-center text-base shadow-[0_0_12px_rgba(251,191,36,0.5)] mb-1">
                📖
              </div>
              <p className="font-display font-extrabold text-white text-xs sm:text-sm">Story</p>
              <p className="text-amber-200 text-[10px] sm:text-xs font-bold leading-tight mt-0.5">4-Step Cycle</p>
            </div>

            {/* Simulate */}
            <div className="flex flex-col items-center p-1 rounded-2xl bg-white/5 border border-teal-400/20">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-teal-400 bg-teal-950/90 text-teal-200 flex items-center justify-center text-base shadow-[0_0_12px_rgba(45,212,191,0.5)] mb-1">
                🧪
              </div>
              <p className="font-display font-extrabold text-white text-xs sm:text-sm">Simulate</p>
              <p className="text-teal-200 text-[10px] sm:text-xs font-bold leading-tight mt-0.5">3 Labs (A, B, C)</p>
            </div>

            {/* Practice */}
            <div className="flex flex-col items-center p-1 rounded-2xl bg-white/5 border border-emerald-400/20">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-emerald-400 bg-emerald-950/90 text-emerald-200 flex items-center justify-center text-base shadow-[0_0_12px_rgba(52,211,153,0.5)] mb-1">
                🎮
              </div>
              <p className="font-display font-extrabold text-white text-xs sm:text-sm">Practice</p>
              <p className="text-emerald-200 text-[10px] sm:text-xs font-bold leading-tight mt-0.5">10 Worlds</p>
            </div>

            {/* Reflect */}
            <div className="flex flex-col items-center p-1 rounded-2xl bg-white/5 border border-indigo-400/20">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-indigo-400 bg-indigo-950/90 text-indigo-200 flex items-center justify-center text-base shadow-[0_0_12px_rgba(129,140,248,0.5)] mb-1">
                📝
              </div>
              <p className="font-display font-extrabold text-white text-xs sm:text-sm">Reflect</p>
              <p className="text-indigo-200 text-[10px] sm:text-xs font-bold leading-tight mt-0.5">Recap & Badges</p>
            </div>
          </div>
        </div>

        {/* Begin Button */}
        <button
          onClick={onBegin}
          className="btn-gold font-display font-black text-lg sm:text-xl px-12 py-3.5 rounded-full shadow-[0_0_24px_rgba(250,204,21,0.5)] hover:scale-105 transition cursor-pointer shrink-0"
        >
          Begin Quest 🚀
        </button>
      </div>
    </div>
  );
}
