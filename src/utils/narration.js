// utils/narration.js — Segment creators and phase narration generators

export const say = (text) => ({ text, style: 'statement' });
export const ask = (text) => ({ text, style: 'question' });
export const cheer = (text) => ({ text, style: 'encouragement' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think = (text) => ({ text, style: 'thinking' });
export const celebrate = (text) => ({ text, style: 'celebration' });

export function wonderNarration() {
  return [
    say("Welcome to the Sunbird Insight Desk!"),
    ask("Jun Hao asked ten basketball teammates, and nine said yes to a chicken-rice stall."),
    emphasize("What if the answer depends more on who you ask than on what the whole school thinks?")
  ];
}

export function storyNarration(slideIdx) {
  const stories = [
    [
      say("The principal asked the Insight Desk: Should the canteen add a new food stall?"),
      emphasize("Good decisions start with good data, and good data starts with a fair plan.")
    ],
    [
      say("Before gathering numbers, we must classify our data."),
      emphasize("Count it or measure it? Counting gives discrete steps; measuring gives continuous flow. And remember, labels like bus numbers are categorical!")
    ],
    [
      say("Primary data is collected first-hand, while secondary data comes from existing records."),
      emphasize("A fair sample gives everyone an equal chance. A bigger sample cannot fix an unfair method!")
    ],
    [
      say("Raw survey answers become useful truth when organized into tallies and frequency tables."),
      emphasize("Equal classes and honest tallies turn messy feedback into clear truth.")
    ]
  ];
  return stories[slideIdx] || [say("Keep exploring the data collection journey!")];
}

export function simStationIntro(stationIdx) {
  const intros = [
    [
      say("Welcome to Station A: The Sample Lab!"),
      emphasize("Compare a convenience sample near the sports hall with a fair random sample across all five school zones.")
    ],
    [
      say("Welcome to Station B: Bin The Data!"),
      emphasize("Group real student measurements into equal class intervals using the starting boundary and width steppers.")
    ],
    [
      say("Welcome to Station C: The Survey Planner!"),
      emphasize("Build complete, sound survey plans for real school decisions with four green validation lamps.")
    ]
  ];
  return intros[stationIdx] || [say("Explore this simulation lab station!")];
}

export function playCorrectNarration() {
  return [cheer("Spot on! That is statistically sound thinking.")];
}

export function playWrongNarration() {
  return [think("Not quite. Review the principles of fair sampling and data classification.")];
}

export function playHint1Narration(hint) {
  return [say(hint || "Consider whether the data is counted or measured.")];
}

export function playHint2Narration(hint) {
  return [say(hint || "Think about which students are being included or excluded.")];
}

export function districtCompleteNarration(worldName, stars) {
  return [celebrate(`Incredible work! You earned ${stars} stars in ${worldName}!`)];
}

export function bossWinNarration(bossName) {
  return [celebrate(`Outstanding! You defeated ${bossName} and protected data integrity!`)];
}
