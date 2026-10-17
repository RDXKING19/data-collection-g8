export function calcStars(correct) {
  if (correct >= 9) return 3;
  if (correct >= 7) return 2;
  if (correct >= 5) return 1;
  return 0;
}

export function calcStarsNormalised(correct, total) {
  if (!total || total <= 0) return 0;
  const scaled = Math.round((correct / total) * 10);
  return calcStars(scaled);
}

export function calcXP({ attempts = 1, hintsUsed = 0, streak = 0 } = {}) {
  let xp = 10;
  if (attempts > 1) xp = Math.max(2, xp - (attempts - 1) * 3);
  if (hintsUsed > 0) xp = Math.max(2, xp - hintsUsed * 2);
  const streakBonus = Math.min(10, Math.floor(streak / 2) * 2);
  return xp + streakBonus;
}
