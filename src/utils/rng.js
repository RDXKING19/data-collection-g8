// Seeded pseudo-random number generator (mulberry32)
export function createRNG(seed = Date.now()) {
  let s = Math.floor(Math.abs(seed)) || 1;
  const next = () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const rng = {
    next,
    random: next,
    int: (min, max) => Math.floor(next() * (max - min + 1)) + min,
    pick: (arr) => {
      if (!arr || arr.length === 0) return null;
      return arr[Math.floor(next() * arr.length)];
    },
    shuffle: (arr) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },
    sample: (arr, k) => {
      if (!arr) return [];
      const sh = rng.shuffle(arr);
      return sh.slice(0, Math.min(k, arr.length));
    }
  };

  return rng;
}

export class Rng {
  constructor(seed = Date.now()) {
    const inst = createRNG(seed);
    Object.assign(this, inst);
  }
}
