// src/components/shared/FloatingSymbols.jsx
import React from 'react';

export function FloatingSymbols() {
  const symbols = [
    { text: "📊", top: "12%", left: "6%", size: "28px" },
    { text: "a ≤ x < b", top: "18%", left: "84%", size: "18px" },
    { text: "k = N ÷ n", top: "75%", left: "8%", size: "20px" },
    { text: "👥", top: "82%", left: "84%", size: "26px" },
    { text: "⚖️", top: "45%", left: "92%", size: "24px" },
    { text: "Σf = N", top: "25%", left: "48%", size: "18px" },
    { text: "📋", top: "68%", left: "48%", size: "22px" },
    { text: "🏷️", top: "88%", left: "32%", size: "24px" },
    { text: "🦉", top: "35%", left: "4%", size: "24px" }
  ];

  return (
    <div className="floating-bg-container pointer-events-none select-none z-0" aria-hidden="true">
      {symbols.map((s, idx) => (
        <span
          key={idx}
          className="floating-bg-item opacity-15 font-mono select-none"
          style={{
            top: s.top,
            left: s.left,
            fontSize: s.size,
            animationDelay: `${idx * 2}s`
          }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
