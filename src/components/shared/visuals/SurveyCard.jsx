// components/shared/visuals/SurveyCard.jsx
import React from 'react';

export function SurveyCard({
  question = 'How many hours of homework do you complete on a weeknight?',
  options = ['Under 1 h', '1 to under 2 h', '2 to under 3 h', '3 h or more'],
  isBiased = false,
  flawTag = ''
}) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 select-none">
      <div
        className={`w-full max-w-md bg-[#160a33] border-2 rounded-2xl p-4 shadow-xl text-left ${
          isBiased ? 'border-rose-400/60' : 'border-purple-400/40'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Survey Questionnaire Slip
          </span>
          {isBiased && (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
              ⚠️ {flawTag || 'Flawed Instrument'}
            </span>
          )}
        </div>

        <div className="text-sm sm:text-base font-bold text-white mb-3">
          "{question}"
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-200"
            >
              <div className="w-3.5 h-3.5 rounded-full border border-amber-400/60 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
              </div>
              <span className="font-semibold">{opt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
