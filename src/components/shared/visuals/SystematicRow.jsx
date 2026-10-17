// components/shared/visuals/SystematicRow.jsx
import React from 'react';

export function SystematicRow({
  total = 20,
  stepK = 4,
  start = 2
}) {
  const items = Array.from({ length: total }, (_, i) => i + 1);
  const selected = items.filter((n) => (n - start) % stepK === 0 && n >= start);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-3 select-none">
      <div className="text-xs font-bold text-amber-300 mb-2 uppercase tracking-wider">
        Systematic Sampling Register (Interval k = {stepK}, Start = #{start})
      </div>

      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full p-2 bg-[#12082b] border border-white/15 rounded-2xl shadow-inner">
        {items.map((n) => {
          const isChosen = selected.includes(n);
          return (
            <div
              key={n}
              className={`w-7 h-8 sm:w-8 sm:h-9 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-xs transition-all ${
                isChosen
                  ? 'bg-amber-400 text-slate-950 shadow-[0_0_12px_#facc15] font-black scale-110 ring-2 ring-white'
                  : 'bg-white/10 text-slate-400'
              }`}
            >
              <span>{n}</span>
              {isChosen && <span className="text-[9px] -mt-1">✓</span>}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs font-bold text-slate-300">
        <span className="text-amber-400 font-extrabold">Jump: +{stepK} every pick</span>
        <span>•</span>
        <span>Chosen: {selected.map((n) => `#${n}`).join(', ')}</span>
      </div>
    </div>
  );
}
