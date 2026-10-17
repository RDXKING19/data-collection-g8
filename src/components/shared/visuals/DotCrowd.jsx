// components/shared/visuals/DotCrowd.jsx
import React from 'react';

export function DotCrowd({
  total = 100,
  highlightCount = 10,
  zones = null,
  highlightZone = null,
  highlightIndices = null,
  title = ''
}) {
  const dots = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 select-none">
      {title && (
        <div className="text-xs sm:text-sm font-display font-extrabold text-amber-300 mb-2">
          {title}
        </div>
      )}

      {zones ? (
        /* Zone-based Layout (Station A or Zone Visual) */
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-lg">
          {zones.map((z) => {
            const isHighlightZ = highlightZone === z.id;
            return (
              <div
                key={z.id}
                className={`p-2 rounded-xl border flex flex-col items-center transition-all ${
                  isHighlightZ
                    ? 'bg-rose-950/50 border-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                    : 'bg-black/30 border-white/10'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-200 mb-1 flex items-center justify-between w-full">
                  <span>{z.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{z.size}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 justify-center">
                  {Array.from({ length: Math.min(z.size, 16) }).map((_, di) => {
                    const isLit = isHighlightZ && di < 8;
                    return (
                      <span
                        key={di}
                        className={`w-2 h-2 rounded-full transition-transform ${
                          isLit
                            ? 'bg-rose-400 shadow-[0_0_6px_#f43f5e] scale-110'
                            : 'bg-slate-500/50'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid Crowd (Wide horizontal layout) */
        <div className="bg-[#14082e] border border-purple-400/30 rounded-2xl p-2.5 shadow-inner flex flex-wrap gap-1.5 justify-center max-w-md max-h-32 sm:max-h-36 overflow-hidden">
          {dots.map((d) => {
            const isSelected = highlightIndices
              ? highlightIndices.includes(d)
              : d < highlightCount;

            return (
              <span
                key={d}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  isSelected
                    ? 'bg-amber-400 shadow-[0_0_8px_#facc15] scale-125 ring-1 ring-white'
                    : 'bg-slate-600/40'
                }`}
              />
            );
          })}
        </div>
      )}

      {/* Summary Footer */}
      <div className="flex items-center gap-4 mt-2 text-xs font-bold text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#facc15]" />
          <span>Sampled ({highlightIndices ? highlightIndices.length : highlightCount})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600/50" />
          <span>Unsampled Remaining ({Math.max(0, total - (highlightIndices ? highlightIndices.length : highlightCount))})</span>
        </div>
      </div>
    </div>
  );
}
