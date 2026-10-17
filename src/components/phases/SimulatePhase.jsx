// src/components/phases/SimulatePhase.jsx
import React, { useState, useEffect } from 'react';
import { FloatingSymbols } from '../shared/FloatingSymbols.jsx';
import { narrate, stopNarration, playClickSound } from '../../utils/audio.js';
import { SampleLab } from '../simulations/SampleLab.jsx';
import { BinTheData } from '../simulations/BinTheData.jsx';
import { SurveyPlanner } from '../simulations/SurveyPlanner.jsx';

const STATIONS = [
  {
    id: 0,
    letter: 'A',
    icon: '🏫',
    name: 'Station A: The Sample Lab',
    sub: 'Real-world school survey & bias discovery',
    Comp: SampleLab
  },
  {
    id: 1,
    letter: 'B',
    icon: '⏱️',
    name: 'Station B: Bin the Data',
    sub: 'Organise continuous commute data into equal classes',
    Comp: BinTheData
  },
  {
    id: 2,
    letter: 'C',
    icon: '📋',
    name: 'Station C: Survey Planner',
    sub: 'Build & audit complete school council survey plans',
    Comp: SurveyPlanner
  }
];

export function SimulatePhase({ muted, onNext, simCompleted = [false, false, false], onCompleteStation }) {
  const [stationIdx, setStationIdx] = useState(0);

  const currentStation = STATIONS[stationIdx];
  const CurrentComp = currentStation.Comp;

  useEffect(() => {
    if (!muted) {
      narrate(`Welcome to ${currentStation.name}. ${currentStation.sub}.`, true);
    }
    return () => stopNarration();
  }, [stationIdx, muted, currentStation]);

  const handleStationFinished = () => {
    if (onCompleteStation) {
      onCompleteStation(stationIdx);
    }
  };

  const handleSelectStation = (i) => {
    playClickSound();
    stopNarration();
    setStationIdx(i);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 relative overflow-hidden select-none z-10 w-full h-full">
      <FloatingSymbols />

      {/* Main Simulation Stations Card (Strictly Scroll-Free Layout) */}
      <div className="w-full max-w-6xl h-full max-h-[calc(100dvh-var(--header-h,56px)-16px)] sim-card bg-[#160b36]/95 border-2 border-purple-400/40 rounded-3xl p-3 sm:p-4 shadow-2xl backdrop-blur-md flex flex-col items-center fade-in-up z-20 my-auto overflow-hidden">
        {/* Cyan Accent Bar */}
        <div className="sim-accent w-20 h-1.5 bg-cyan-400 rounded-full mb-1.5 shadow-[0_0_16px_rgba(56,189,248,0.85)] shrink-0" />

        {/* Card Header Title */}
        <h2 className="sim-title font-display font-black text-lg sm:text-xl md:text-2xl text-white flex items-center gap-2 mb-2 shrink-0">
          <span className="text-xl sm:text-2xl">🧪</span>
          <span>Statistical Simulation Lab — 3 Investigation Stations</span>
        </h2>

        {/* 2-Column Grid Layout: Zero Scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 w-full items-stretch flex-1 min-h-0 overflow-hidden">
          {/* Left Column: Station Sidebar Tabs & Practice Phase CTA */}
          <div className="md:col-span-4 flex flex-col justify-between gap-2 shrink-0 overflow-hidden">
            <div className="flex flex-col gap-2">
              {STATIONS.map((st, i) => {
                const isSelected = stationIdx === i;
                const isDone = simCompleted[i];

                return (
                  <button
                    key={st.id}
                    onClick={() => handleSelectStation(i)}
                    className={`p-2.5 sm:p-3 rounded-2xl border-2 flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-[#1e2852] text-white shadow-[0_0_20px_rgba(56,189,248,0.35)] scale-[1.01]'
                        : isDone
                        ? 'border-emerald-400/40 bg-emerald-950/20 text-emerald-200 hover:border-emerald-400'
                        : 'border-purple-500/25 bg-[#13082b]/80 text-slate-300 hover:border-cyan-400/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${
                          isSelected ? 'bg-cyan-500/30 text-cyan-300' : 'bg-white/10 text-white'
                        }`}
                      >
                        {st.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="font-display font-black text-xs sm:text-sm leading-tight truncate">
                          {st.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] font-extrabold text-slate-300 mt-0.5 truncate">
                          {st.sub}
                        </p>
                      </div>
                    </div>
                    <span className="text-base sm:text-lg shrink-0 ml-1.5">
                      {isDone ? '✅' : '🔓'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Left CTA Button (Always Unlocked & Accessible) */}
            <div className="flex flex-col gap-1 mt-auto pt-1">
              <button
                onClick={onNext}
                className="btn-gold font-display font-black text-xs sm:text-sm py-2.5 px-5 shadow-[0_0_22px_rgba(250,204,21,0.65)] hover:scale-105 transition w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Go to Practice Phase!</span>
                <span>→</span>
              </button>
              <span className="text-[10px] text-emerald-300 font-extrabold text-center leading-tight">
                ✓ Practice Phase Unlocked! Play all 10 Game Worlds
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Station Workspace (Strictly overflow-hidden) */}
          <div className="sim-right md:col-span-8 bg-[#13092e]/95 border-2 border-purple-400/35 rounded-3xl p-3 sm:p-4 flex flex-col justify-between shadow-inner flex-1 min-h-0 overflow-hidden">
            <div className="flex flex-col flex-1 min-h-0 justify-between overflow-hidden">
              {/* Station Workspace Header */}
              <div className="sim-head flex items-center justify-between border-b border-white/15 pb-1.5 mb-1.5 shrink-0">
                <h3 className="font-display font-black text-sm sm:text-base md:text-lg text-cyan-300 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">{currentStation.icon}</span>
                  <span>{currentStation.name}</span>
                </h3>
                <span className="font-display font-black text-[11px] text-slate-200 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15">
                  Station {stationIdx + 1} of 3
                </span>
              </div>

              {/* Interactive Station Component (Strictly NO Scroll) */}
              <div className="sim-body flex-1 min-h-0 flex flex-col overflow-hidden">
                <CurrentComp
                  key={stationIdx}
                  onComplete={handleStationFinished}
                  audioEnabled={!muted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulatePhase;
