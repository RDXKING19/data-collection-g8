// components/shared/visuals/SourceCard.jsx
import React from 'react';

export function SourceCard({
  sourceType = 'primary', // 'primary' | 'secondary'
  method = 'Questionnaire',
  scenario = ''
}) {
  const isPrimary = sourceType === 'primary';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 select-none">
      <div className="w-full max-w-md bg-[#180a35]/90 border-2 border-purple-400/40 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
        {/* Header Badges */}
        <div className="flex items-center justify-between">
          <div
            className={`px-3 py-1 rounded-full font-display font-black text-xs sm:text-sm flex items-center gap-1.5 ${
              isPrimary
                ? 'bg-amber-400/20 border border-amber-400 text-amber-300'
                : 'bg-cyan-400/20 border border-cyan-400 text-cyan-300'
            }`}
          >
            <span>{isPrimary ? '🔭 Primary Data' : '📚 Secondary Data'}</span>
          </div>

          <div className="text-xs text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
            Method: <strong className="text-white">{method}</strong>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-black/30 border border-white/10 rounded-xl p-3 text-left">
          <div className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
            Collection Context
          </div>
          <div className="text-sm sm:text-base text-slate-100 font-bold leading-snug">
            {scenario || (isPrimary ? 'Collected first-hand directly by the investigator' : 'Retrieved from existing recorded archives')}
          </div>
        </div>

        {/* Indicator flow */}
        <div className="flex items-center justify-around text-xs font-bold text-slate-300 pt-1 border-t border-white/10">
          <div className="flex items-center gap-1">
            <span>{isPrimary ? '👤 First-Hand' : '🗄️ Existing Source'}</span>
          </div>
          <span>➜</span>
          <div className="flex items-center gap-1 text-emerald-300">
            <span>🎯 Tailored for Insight</span>
          </div>
        </div>
      </div>
    </div>
  );
}
