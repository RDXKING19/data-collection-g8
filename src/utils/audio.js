// utils/audio.js — High fidelity audio engine (ElevenLabs + Web Audio effects)
import { audioMap } from './audioMap.js';

let isMuted = false;
let currentAudio = null;
let audioQueue = [];
let isPlayingQueue = false;
let currentPlaybackSession = 0;

// Web Audio API context for tactile click feedback
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Crisp tactile click sound
export function playClickSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    // ignore
  }
}

// Chime sound for correct answers
export function playCorrectChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.12, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  } catch (e) {
    // ignore
  }
}

export function setMuted(muted) {
  isMuted = muted;
  if (isMuted) {
    stopNarration();
  }
}

export function isAudioMuted() {
  return isMuted;
}

// Hard-stop any playing audio and invalidate ongoing playback sessions to PREVENT overlapping voices
export function stopNarration() {
  currentPlaybackSession++;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio.src = '';
    currentAudio = null;
  }
  audioQueue = [];
  isPlayingQueue = false;
}

const dynamicAudioCache = new Map();
const ELEVENLABS_VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const API_KEY = import.meta.env?.VITE_ELEVENLABS_API_KEY || 'sk_6e97c38c0116892c6308d73e4e92636009018a0a414d459e';

// Resolve audio URL from static map or in-memory dynamic cache
export function getAudioUrl(text) {
  if (!text) return null;
  if (audioMap && audioMap[text]) {
    return audioMap[text];
  }
  if (dynamicAudioCache.has(text)) {
    return dynamicAudioCache.get(text);
  }
  return null;
}

// Fetch dynamic audio on-demand via ElevenLabs API if not pre-generated
export async function resolveAudioUrl(text) {
  if (!text) return null;
  const staticUrl = getAudioUrl(text);
  if (staticUrl) return staticUrl;

  if (!API_KEY) return null;

  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (res.ok) {
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      dynamicAudioCache.set(text, blobUrl);
      return blobUrl;
    }
  } catch (e) {
    // Silently fall back
  }
  return null;
}

export function narrate(segments, restart = true) {
  if (isMuted) return;
  if (restart) {
    stopNarration();
  }
  if (!segments || segments.length === 0) return;

  const queue = Array.isArray(segments) ? [...segments] : [segments];
  audioQueue = queue;

  if (!isPlayingQueue) {
    playNextInQueue();
  }
}

async function playNextInQueue() {
  if (isMuted || audioQueue.length === 0) {
    isPlayingQueue = false;
    currentAudio = null;
    return;
  }

  // Capture current playback session ID
  const sessionId = currentPlaybackSession;
  isPlayingQueue = true;

  const item = audioQueue.shift();
  const text = typeof item === 'string' ? item : item?.text;
  if (!text) {
    playNextInQueue();
    return;
  }

  let url = getAudioUrl(text);
  if (!url) {
    url = await resolveAudioUrl(text);
  }

  // If session changed while fetching, immediately abort
  if (sessionId !== currentPlaybackSession) {
    return;
  }

  if (!url) {
    playNextInQueue();
    return;
  }

  // Terminate any previous audio object before creating new one
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio = null;
  }

  try {
    const audio = new Audio(url);
    currentAudio = audio;

    audio.onended = () => {
      if (sessionId === currentPlaybackSession) {
        currentAudio = null;
        playNextInQueue();
      }
    };

    audio.onerror = () => {
      if (sessionId === currentPlaybackSession) {
        currentAudio = null;
        playNextInQueue();
      }
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        if (sessionId === currentPlaybackSession) {
          playNextInQueue();
        }
      });
    }
  } catch (err) {
    if (sessionId === currentPlaybackSession) {
      playNextInQueue();
    }
  }
}
