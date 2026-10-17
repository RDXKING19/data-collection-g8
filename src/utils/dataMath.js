// utils/dataMath.js — statistical single source of truth for SurveyQuest

export const INTERVAL_CONVENTION = 'left-closed'; // 'left-closed': a ≤ x < b | 'right-closed': a < x ≤ b
export const CLEAN_TOTALS = [10, 20, 25, 50, 100];
export const SAMPLING_FRACTIONS = [
  { num: 1, den: 20 },
  { num: 1, den: 10 },
  { num: 1, den: 5 },
  { num: 1, den: 4 }
];
export const SYSTEMATIC_K = [4, 5, 8, 10, 20, 25];
export const CLASS_WIDTHS = [5, 10, 20];
export const MAX_TALLY = 25;

export const sum = (arr) => arr.reduce((s, x) => s + x, 0);
export const isInt = Number.isInteger;

// Format numbers with narrow space for thousands (e.g. 1 200)
export function fmtNum(n) {
  if (typeof n !== 'number') return n;
  return n.toLocaleString('en-US').replace(/,/g, ' ');
}

/* ---------- percentages ---------- */
export function percentOf(freq, total) {
  const p = (freq * 100) / total;
  return Math.round(p);
}

/* ---------- systematic sampling ---------- */
export function systematicInterval(N, n) {
  if (!isInt(N) || !isInt(n) || n <= 0 || N % n !== 0) {
    return Math.round(N / n);
  }
  return N / n;
}

export function genSystematic(rng) {
  const k = rng.pick(SYSTEMATIC_K) || 10;
  const nPool = [20, 25, 30, 40, 50].filter((n) => n * k <= 1200);
  const n = rng.pick(nPool) || 30;
  const N = n * k;
  const start = rng.int(1, k);
  const picks = Array.from({ length: Math.min(n, 12) }, (_, i) => start + i * k);
  return { N, n, k, start, picks };
}

/* ---------- stratified sampling ---------- */
export function stratifiedAllocation(sizes, n) {
  const N = sum(sizes);
  return sizes.map((s) => {
    const a = Math.round((s * n) / N);
    return a;
  });
}

export function genStrata(rng, count = 3, maxN = 1200) {
  const frac = rng.pick(SAMPLING_FRACTIONS) || { num: 1, den: 10 };
  const mMin = 4;
  const mMax = Math.min(30, Math.floor(maxN / frac.den / count));
  const mult = Array.from({ length: count }, () => rng.int(mMin, mMax));
  const sizes = mult.map((m) => m * frac.den);
  const N = sum(sizes);
  const n = (N * frac.num) / frac.den;
  const alloc = sizes.map((s) => (s * frac.num) / frac.den);
  return { sizes, N, n, alloc, frac };
}

/* ---------- class intervals ---------- */
export function makeClasses(start, width, count) {
  return Array.from({ length: count }, (_, i) => ({
    lo: start + i * width,
    hi: start + (i + 1) * width
  }));
}

export function classLabel(c, kind = 'continuous', v = 'x', conv = INTERVAL_CONVENTION) {
  if (kind === 'discrete') return `${c.lo}–${c.hi - 1}`;
  return conv === 'left-closed' ? `${c.lo} ≤ ${v} < ${c.hi}` : `${c.lo} < ${v} ≤ ${c.hi}`;
}

export function classIndex(value, classes, conv = INTERVAL_CONVENTION) {
  return classes.findIndex((c) =>
    conv === 'left-closed' ? value >= c.lo && value < c.hi : value > c.lo && value <= c.hi
  );
}

export function binData(data, classes, conv = INTERVAL_CONVENTION) {
  const counts = classes.map(() => 0);
  const uncovered = [];
  for (const v of data) {
    const i = classIndex(v, classes, conv);
    if (i < 0) uncovered.push(v);
    else counts[i]++;
  }
  return { counts, uncovered, total: sum(counts) };
}

/* ---------- tally / frequency tables ---------- */
export const tallyGroups = (n) => ({
  fives: Math.floor(n / 5),
  rest: n % 5
});

/* ---------- binning-station evaluator + generator (Station B) ---------- */
export function evaluateBinning({ data, start, width }, conv = INTERVAL_CONVENTION) {
  const max = Math.max(...data);
  const count = max >= start ? Math.floor((max - start) / width) + 1 : 1;
  const classes = makeClasses(start, width, count);
  const { counts, uncovered } = binData(data, classes, conv);
  const covered = uncovered.length === 0;
  const empties = counts.filter((c) => c === 0).length;
  let status = 'off';
  if (covered && count >= 5 && count <= 7 && empties <= 1) status = 'exact';
  else if (covered && (count === 4 || count === 8) && empties <= 1) status = 'near';
  return { classes, counts, uncovered, covered, count, status };
}

export function genBinData(rng, round = 1, size = 24) {
  const width = round === 3 ? 5 : (round === 2 ? 10 : 20);
  const count = 6;
  const start = width * (round === 1 ? 0 : 1);
  const lo = start;
  const hi = start + width * count;
  const boundaries = Array.from({ length: count - 1 }, (_, i) => start + (i + 1) * width);

  const data = [lo, hi - 2];
  if (round >= 2) data.push(boundaries[0]);
  if (round === 3) data.push(boundaries[1]);

  while (data.length < size) {
    data.push(rng.int(lo + 1, hi - 2));
  }
  const shuffled = rng.shuffle(data);
  return { data: shuffled, target: { start, width, count } };
}

/* ---------- distractors generator ---------- */
export function makeDistractors(correct, candidates, rng, count = 3, { valid = () => true, step = 1 } = {}) {
  const out = [];
  for (const c of candidates) {
    if (c != null && String(c) !== String(correct) && valid(c) && !out.includes(c)) {
      out.push(c);
    }
    if (out.length === count) return out;
  }
  for (let k = 1; out.length < count && k < 50; k++) {
    const num = Number(correct);
    if (!isNaN(num)) {
      for (const c of [num + k * step, num - k * step]) {
        if (valid(c) && String(c) !== String(correct) && !out.includes(c)) {
          out.push(c);
        }
        if (out.length === count) break;
      }
    }
  }
  return out.slice(0, count);
}
