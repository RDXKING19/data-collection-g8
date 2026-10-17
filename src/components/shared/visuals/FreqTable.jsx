// components/shared/visuals/FreqTable.jsx
import React from 'react';
import { TallyMarks } from './TallyMarks.jsx';

export function FreqTable({
  title = 'Canteen Lunch Preferences',
  rows = [
    { category: 'Chicken Rice', tally: 14, freq: 14 },
    { category: 'Nasi Lemak', tally: 8, freq: 8 },
    { category: 'Pasta', tally: 5, freq: 5 },
    { category: 'Vegetarian', tally: 3, freq: 3 }
  ],
  missingIdx = null
}) {
  const total = rows.reduce((s, r) => s + (r.freq || 0), 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 select-none overflow-x-auto">
      <div className="text-xs sm:text-sm font-display font-black text-amber-300 mb-1.5">
        {title}
      </div>

      <table className="w-full max-w-md border-collapse border border-white/20 text-xs sm:text-sm rounded-xl overflow-hidden bg-[#150930]/90 shadow-xl">
        <thead>
          <tr className="bg-[#24134e] text-slate-200 border-b border-white/20">
            <th className="py-2 px-3 text-left font-display">Category</th>
            <th className="py-2 px-3 text-center font-display">Tally</th>
            <th className="py-2 px-3 text-right font-display">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition-colors">
              <td className="py-1.5 px-3 font-semibold text-slate-200">{r.category}</td>
              <td className="py-1.5 px-3 text-center">
                <TallyMarks count={r.tally} showTotal={false} />
              </td>
              <td className="py-1.5 px-3 text-right font-mono font-black text-amber-400">
                {missingIdx === i ? (
                  <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400 animate-pulse">
                    ?
                  </span>
                ) : (
                  r.freq
                )}
              </td>
            </tr>
          ))}
          <tr className="bg-[#1f0e42] font-black border-t-2 border-white/25 text-white">
            <td className="py-2 px-3 font-display">Total</td>
            <td className="py-2 px-3 text-center text-slate-400 text-xs">—</td>
            <td className="py-2 px-3 text-right font-mono text-cyan-400 text-sm">{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
