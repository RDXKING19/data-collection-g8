// scripts/generate_audio.js
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const API_KEY = process.env.VITE_ELEVENLABS_API_KEY || 'sk_6e97c38c0116892c6308d73e4e92636009018a0a414d459e';
const VOICE_ID = process.env.VITE_ELEVENLABS_VOICE_ID || 'Xb7hH8MSUJpSbSDYk0k2';
const MODEL_ID = 'eleven_multilingual_v2';

const AUDIO_DIR = path.resolve('public/assets/audio');
const MAP_FILE = path.resolve('src/utils/audioMap.js');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

// All major narrations across the module
const PHRASES = [
  // Wonder Phase
  "Can 10 friends near the basketball court speak for 1 200 students? Good decisions need good data, and good data starts with a fair plan.",
  "Welcome to the Sunbird Insight Desk!",
  "Jun Hao asked ten basketball teammates, and nine said yes to a chicken-rice stall.",
  "What if the answer depends more on who you ask than on what the whole school thinks?",

  // Story Phase Panels (Full combined narration strings used in StoryPhase.jsx)
  "The Council's Big Question. The principal asked Sunbird Secondary's Insight Desk: 'Should we add a new canteen stall?' Jun Hao asked 10 basketball teammates who all cheered yes! But Priya points out: 10 friends do not speak for 1 200 students. To advise the school fairly, they must follow the 4-step survey cycle: Plan, Collect, Organise, and Present. Key takeaway: Good decisions start with good data, and good data starts with a fair plan.",
  "What Kind of Data Is It?. Before collecting responses, the team classifies what they need. Categorical data names groups or labels (favourite food, CCA club). Numerical data measures or counts quantities: Discrete data is counted in distinct whole steps (number of siblings, drinks bought), while Continuous data is measured on a continuous scale (travel time in minutes, queue duration). Even if a bus or locker has a number, it is just a label — so it is categorical! Key takeaway: Count it or measure it? Counting gives discrete steps; measuring gives continuous flow.",
  "Where Does Data Come From & Who To Ask?. Primary data is collected first-hand through questionnaires, interviews, or observations. Secondary data comes from existing school logs or past reports. A full census of all 1 200 students takes too much time and resources, so we take a representative sample. Jun Hao's basketball friends was a convenience sample — biased and unfair! A fair sample uses random, systematic, or stratified sampling so every group gets represented. Key takeaway: A bigger biased sample never fixes an unfair method. Represent everyone fairly!",
  "Organising with Tally & Frequency. Raw survey slips are messy until organised systematically. We use tally marks in tidy bundles of five (four vertical strokes crossed by a diagonal) and build frequency tables. For continuous data spanning a range of values, like travel times, we group numbers into equal-width, non-overlapping class intervals (such as 10 to under 20 minutes) with clear boundary rules. Now the student council can present accurate, trustworthy findings! Key takeaway: Equal classes and honest tallies turn messy feedback into clear truth.",

  // Story Phase Segmented alternatives from narration.js
  "The principal asked the Insight Desk: Should the canteen add a new food stall?",
  "Good decisions start with good data, and good data starts with a fair plan.",
  "Before gathering numbers, we must classify our data.",
  "Count it or measure it? Counting gives discrete steps; measuring gives continuous flow. And remember, labels like bus numbers are categorical!",
  "Primary data is collected first-hand, while secondary data comes from existing records.",
  "A fair sample gives everyone an equal chance. A bigger sample cannot fix an unfair method!",
  "Raw survey answers become useful truth when organized into tallies and frequency tables.",
  "Equal classes and honest tallies turn messy feedback into clear truth.",

  // Simulate Phase Station Intros
  "Welcome to Station A: The Sample Lab. Real-world school survey & bias discovery.",
  "Welcome to Station B: Bin the Data. Organise continuous commute data into equal classes.",
  "Welcome to Station C: Survey Planner. Build & audit complete school council survey plans.",

  // Station A Feedback
  "Convenience sample drawn: 20 court players give 90 percent support, showing heavy bias!",
  "Fair random sample drawn: 4 students from each of the 5 zones give 50 percent support, matching the school truth!",
  "Station A complete! Fairness beats raw sample size.",

  // Station B Feedback
  "Intervals configured! Equal class widths prevent misleading frequency distortions.",
  "Boundary rule mastered! In left-closed intervals, 20 belongs in 20 to 30.",
  "Station B complete! Equal classes and honest tallies turn raw commute times into clear data.",

  // Station C Feedback
  "Survey plan audited and 100 percent validated! Continuous measurement, systematic sampling, and neutral wording.",
  "Station C complete! You designed a fair and unbiased survey plan.",

  // Play / Practice Phase Feedback & Chimes
  "Spot on! That is statistically sound thinking.",
  "Correct! That is great insight.",
  "Not quite. Review the principles of fair sampling and data classification.",
  "Review the principle: How a sample is chosen matters more than how big it is.",
  "Consider whether the data is counted or measured.",
  "Think about which students are being included or excluded.",
  "Challenger resolved! You have mastered Data Desk!",
  "Challenger resolved! You have mastered Source Street!",
  "Challenger resolved! You have mastered Population Plaza!",
  "Challenger resolved! You have mastered Fair Draw Fountain!",
  "Challenger resolved! You have mastered Bias Bay!",
  "Challenger resolved! You have mastered Question Quarter!",
  "Challenger resolved! You have mastered Tally Terrace!",
  "Challenger resolved! You have mastered Interval Island!",
  "Challenger resolved! You have mastered Council Chamber!",
  "Challenger resolved! You have mastered Grand Survey Finale!",
  "World completed! You earned stars!",

  // Reflect Phase
  "Reflect Phase. Consolidate your statistical data collection insights with Tally the Owl.",
  "Congratulations! You have completed the SurveyQuest Data Collection mission!",
  "Incredible work! You are now a certified Data Detective!"
];

function sanitizeFilename(text) {
  const hash = crypto.createHash('md5').update(text).digest('hex').slice(0, 10);
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, 30);
  return `audio_${slug}_${hash}.mp3`;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generatePhrase(text) {
  const filename = sanitizeFilename(text);
  const filepath = path.join(AUDIO_DIR, filename);

  if (fs.existsSync(filepath) && fs.statSync(filepath).size > 1000) {
    console.log(`[CACHED] "${text.slice(0, 40)}..." -> ${filename}`);
    return { text, url: `/assets/audio/${filename}` };
  }

  console.log(`[GENERATING] "${text.slice(0, 50)}..." via ElevenLabs`);
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[ERROR] Status ${res.status}: ${errText}`);
      return null;
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(filepath, buffer);
    console.log(`[SAVED] ${filename} (${buffer.length} bytes)`);
    await sleep(400); // polite rate limit
    return { text, url: `/assets/audio/${filename}` };
  } catch (err) {
    console.error(`[EXCEPTION]`, err.message);
    return null;
  }
}

async function main() {
  console.log(`Starting Audio Generation Pipeline with Voice ID: ${VOICE_ID}`);
  console.log(`Total phrases to process: ${PHRASES.length}`);

  const currentMap = {};
  if (fs.existsSync(MAP_FILE)) {
    const content = fs.readFileSync(MAP_FILE, 'utf-8');
    const match = content.match(/export const audioMap = (\{[\s\S]*?\});/);
    if (match) {
      try {
        const parsed = eval(`(${match[1]})`);
        Object.assign(currentMap, parsed);
      } catch (e) {}
    }
  }

  for (const phrase of PHRASES) {
    const result = await generatePhrase(phrase);
    if (result) {
      currentMap[result.text] = result.url;
    }
  }

  const fileContent = `// Auto-generated audio map for pre-generated audio files\nexport const audioMap = ${JSON.stringify(currentMap, null, 2)};\n`;
  fs.writeFileSync(MAP_FILE, fileContent, 'utf-8');
  console.log(`Updated ${MAP_FILE} with ${Object.keys(currentMap).length} audio mappings.`);
}

main();
