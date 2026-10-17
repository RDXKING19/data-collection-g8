// components/shared/visuals/TallyMarks.jsx
import React from 'react';

export function TallyMarks({ count = 13, showTotal = true }) {
  const fives = Math.floor(count / 5);
  const rest = count % 5;

  return (
    <div className="flex items-center gap-2.5 flex-wrap justify-center p-1">
      {/* Groups of 5 */}
      {Array.from({ length: fives }).map((_, gi) => (
        <svg
          key={`five-${gi}`}
          viewBox="0 0 34 32"
          className="w-7 h-7 sm:w-8 sm:h-8 stroke-amber-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]"
          strokeWidth="2.8"
          strokeLinecap="round"
        >
          {/* 4 vertical strokes */}
          <line x1="6" y1="4" x2="6" y2="28" />
          <line x1="13" y1="4" x2="13" y2="28" />
          <line x1="20" y1="4" x2="20" y2="28" />
          <line x1="27" y1="4" x2="27" y2="28" />
          {/* 1 diagonal strike through all four */}
          <line x1="2" y1="24" x2="31" y2="8" stroke="#f43f5e" strokeWidth="3.2" />
        </svg>
      ))}

      {/* Remainder strokes */}
      {rest > 0 && (
        <svg
          viewBox={`0 0 ${rest * 8 + 8} 32`}
          className="h-7 sm:h-8 stroke-amber-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]"
          style={{ width: `${rest * 7 + 8}px` }}
          strokeWidth="2.8"
          strokeLinecap="round"
        >
          {Array.from({ length: rest }).map((_, ri) => (
            <line key={`rest-${ri}`} x1={6 + ri * 7} y1="4" x2={6 + ri * 7} y2="28" />
          ))}
        </svg>
      )}

      {showTotal && (
        <span className="font-mono font-black text-sm sm:text-base text-amber-300 ml-1">
          = {count}
        </span>
      )}
    </div>
  );
}
