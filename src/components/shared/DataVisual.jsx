// src/components/shared/DataVisual.jsx
import React from 'react';
import { TypeTree } from './visuals/TypeTree.jsx';
import { SourceCard } from './visuals/SourceCard.jsx';
import { DotCrowd } from './visuals/DotCrowd.jsx';
import { SystematicRow } from './visuals/SystematicRow.jsx';
import { StrataBlocks } from './visuals/StrataBlocks.jsx';
import { SurveyCard } from './visuals/SurveyCard.jsx';
import { TallyMarks } from './visuals/TallyMarks.jsx';
import { FreqTable } from './visuals/FreqTable.jsx';
import { IntervalLine } from './visuals/IntervalLine.jsx';

export function DataVisual({ type = 'none', data = {}, compact = false }) {
  if (!type || type === 'none') {
    return null;
  }

  const containerClasses = `w-full flex items-center justify-center transition-all ${
    compact ? 'py-1' : 'py-1 sm:py-1.5'
  }`;

  return (
    <div className={containerClasses} role="img" aria-label={`Visual diagram: ${type}`}>
      {type === 'type-tree' && (
        <TypeTree
          highlight={data.highlight || (data.path ? data.path[data.path.length - 1] : 'discrete')}
          label={data.variable || data.label || ''}
        />
      )}

      {type === 'source-card' && (
        <SourceCard
          sourceType={data.source || data.sourceType || 'primary'}
          method={data.method || 'Questionnaire'}
          scenario={data.scenario || data.caption || ''}
        />
      )}

      {type === 'dot-crowd' && (
        <DotCrowd
          total={data.N || data.total || 100}
          highlightCount={data.n || data.highlightCount || 10}
          zones={data.zones || null}
          highlightZone={data.highlightZone || null}
          highlightIndices={data.highlightIndices || null}
          title={data.title || data.label || ''}
        />
      )}

      {type === 'systematic-row' && (
        <SystematicRow
          total={data.N || data.total || 20}
          stepK={data.k || data.stepK || 4}
          start={data.start || 1}
        />
      )}

      {type === 'strata-blocks' && (
        <StrataBlocks
          strata={data.strata || [
            { label: 'Sec 1', size: 300, alloc: 30, color: '#f472b6' },
            { label: 'Sec 2', size: 280, alloc: 28, color: '#fb923c' },
            { label: 'Sec 3', size: 260, alloc: 26, color: '#fbbf24' },
            { label: 'Sec 4', size: 160, alloc: 16, color: '#4ade80' }
          ]}
          totalSample={data.n || data.totalSample || 100}
        />
      )}

      {type === 'survey-card' && (
        <SurveyCard
          question={data.question || 'Survey Question'}
          options={data.options || ['Option A', 'Option B', 'Option C', 'Option D']}
          isBiased={data.isBiased || false}
          flawTag={data.flawTag || ''}
        />
      )}

      {type === 'tally' && (
        <div className="bg-[#14082e] border border-white/15 rounded-2xl p-4 shadow-xl">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 text-center">
            {data.label || 'Tally Record'}
          </div>
          <TallyMarks count={data.count || 12} showTotal={data.showTotal !== false} />
        </div>
      )}

      {type === 'freq-table' && (
        <FreqTable
          title={data.title || 'Frequency Table'}
          rows={data.rows || [
            { category: 'A', tally: 5, freq: 5 },
            { category: 'B', tally: 10, freq: 10 },
            { category: 'C', tally: 15, freq: 15 }
          ]}
          missingIdx={data.unknownIdx !== undefined ? data.unknownIdx : data.missingIdx}
        />
      )}

      {type === 'interval-line' && (
        <IntervalLine
          min={data.min || 0}
          max={data.max || 40}
          width={data.width || 10}
          markerValue={data.markerValue !== undefined ? data.markerValue : data.marker}
          convention={data.convention || 'left-closed'}
        />
      )}
    </div>
  );
}
