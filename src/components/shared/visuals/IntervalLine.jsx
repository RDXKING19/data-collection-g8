// components/shared/visuals/IntervalLine.jsx
import React from 'react';

export function IntervalLine({
  min = 10,
  max = 50,
  width = 10,
  markerValue = 20,
  convention = 'left-closed' // 'left-closed': [a, b)
}) {
  const classes = [];
  for (let x = min; x < max; x += width) {
    classes.push({ lo: x, hi: x + width });
  }

  const range = max - min;
  const markerPct = Math.max(0, Math.min(100, ((markerValue - min) / range) * 100));

  return (
    <div className="w-full flex flex-col items-center justify-center py-1 px-3 select-none">
      <div className="text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-3">
        <span>Convention: <strong className="text-cyan-300">{convention === 'left-closed' ? 'a ≤ x < b (Left-Closed)' : 'a < x ≤ b'}</strong></span>
        {markerValue !== undefined && (
          <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/40 font-mono">
            Value = {markerValue}
          </span>
        )}
      </div>

      <div className="w-full max-w-lg relative py-3 my-1">
        {/* Main Base Line */}
        <div className="w-full h-1 bg-white/30 rounded-full" />

        {/* Class Brackets */}
        {classes.map((c, i) => {
          const leftPct = ((c.lo - min) / range) * 100;
          const widthPct = (width / range) * 100;

          return (
            <div
              key={i}
              style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
              className="absolute top-1 h-9 border-b-2 border-cyan-400/80 flex items-center justify-between px-1"
            >
              <span className="text-cyan-300 font-mono font-black text-sm -ml-1">
                {convention === 'left-closed' ? '[' : '('}
              </span>
              <span className="text-cyan-300 font-mono font-black text-sm -mr-1">
                {convention === 'left-closed' ? ')' : ']'}
              </span>
            </div>
          );
        })}

        {/* Tick Labels */}
        {classes.map((c, i) => {
          const leftPct = ((c.lo - min) / range) * 100;
          return (
            <div
              key={`tick-${i}`}
              style={{ left: `${leftPct}%` }}
              className="absolute top-7 -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-0.5 h-2 bg-white/60 mb-0.5" />
              <span className="font-mono text-xs text-slate-300 font-bold">{c.lo}</span>
            </div>
          );
        })}

        {/* Max Tick Label */}
        <div
          style={{ left: '100%' }}
          className="absolute top-7 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-0.5 h-2 bg-white/60 mb-0.5" />
          <span className="font-mono text-xs text-slate-300 font-bold">{max}</span>
        </div>

        {/* Data Marker Dot */}
        {markerValue !== undefined && (
          <div
            style={{ left: `${markerPct}%` }}
            className="absolute -top-1 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
          >
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-amber-400/30 shadow-[0_0_12px_#facc15]" />
            <span className="font-mono text-[9px] font-black text-amber-300">
              ▼
            </span>
          </div>
        )}
      </div>

      <div className="text-[11px] text-slate-400 mt-2 text-center">
        Bracket <span className="text-cyan-300 font-bold">[</span> includes the number; bracket <span className="text-cyan-300 font-bold">)</span> excludes it.
      </div>
    </div>
  );
}
