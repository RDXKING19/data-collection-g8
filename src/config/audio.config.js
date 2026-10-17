// config/audio.config.js — Audio presets and configuration

export const ELEVENLABS_VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice
export const ELEVENLABS_MODEL = 'eleven_multilingual_v2';

export const STYLE_PRESETS = {
  statement: { stability: 0.5, similarity_boost: 0.75, style: 0.0 },
  instruction: { stability: 0.5, similarity_boost: 0.75, style: 0.0 },
  question: { stability: 0.45, similarity_boost: 0.75, style: 0.2 },
  encouragement: { stability: 0.4, similarity_boost: 0.8, style: 0.35 },
  emphasis: { stability: 0.6, similarity_boost: 0.8, style: 0.1 },
  thinking: { stability: 0.5, similarity_boost: 0.7, style: 0.15 },
  celebration: { stability: 0.35, similarity_boost: 0.85, style: 0.5 }
};
