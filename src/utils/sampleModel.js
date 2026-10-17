// utils/sampleModel.js — Station A population and sampling model

export const ZONES = [
  { id: 'hall', name: 'Sports Hall', size: 40, yes: 36, color: '#f43f5e' },
  { id: 'cant', name: 'Canteen', size: 40, yes: 28, color: '#fb923c' },
  { id: 'class', name: 'Classrooms', size: 40, yes: 20, color: '#facc15' },
  { id: 'lib', name: 'Library', size: 40, yes: 12, color: '#38bdf8' },
  { id: 'music', name: 'Music Room', size: 40, yes: 4, color: '#c084fc' }
];

export const SIZES = [10, 20, 40, 60];
export const CONVENIENCE_POOL_ZONES = ['hall', 'cant'];

export function buildPopulation() {
  const pop = [];
  let id = 0;
  for (const z of ZONES) {
    for (let i = 0; i < z.size; i++) {
      pop.push({
        id: id++,
        zone: z.id,
        zoneName: z.name,
        color: z.color,
        yes: i < z.yes
      });
    }
  }
  return pop;
}

export const truePopulationPct = 50; // 100 of 200 = 50%
export const conveniencePoolPct = 80; // 64 of 80 = 80%

export function drawSample(pop, mode, n, rng) {
  const pool = mode === 'convenience'
    ? pop.filter((p) => CONVENIENCE_POOL_ZONES.includes(p.zone))
    : pop;

  const shuffled = rng.shuffle(pool);
  const chosen = shuffled.slice(0, Math.min(n, pool.length));
  const yesCount = chosen.filter((p) => p.yes).length;
  const pct = Math.round((yesCount / chosen.length) * 100);

  return {
    chosen,
    yes: yesCount,
    total: chosen.length,
    pct,
    mode,
    size: n
  };
}
