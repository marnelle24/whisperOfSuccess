// Array of peaceful meditation music IDs
const MEDITATION_MUSIC_IDS = [
  'tNkZsRW7h2c', // Peaceful meditation music
  '77ZF50ve6rM', // Deep meditation
  'FjHGZj2IjBk', // Calm meditation
  'DTJkQB5oc9o', // Relaxing meditation
  '1ZYbU82GVz4', // Ambient meditation
] as const;

export const MEDITATION_CONFIG = {
  // Randomly select one of the meditation tracks
  YOUTUBE_VIDEO_ID: MEDITATION_MUSIC_IDS[Math.floor(Math.random() * MEDITATION_MUSIC_IDS.length)],
  
  // Duration in seconds (3 minutes)
  DURATION: 180,
  
  // Volume settings (0-100)
  MUSIC_VOLUME: 25, // Reduced to be less intrusive
  VOICE_VOLUME: 75,
  
  // Playback settings
  LOOP: true,
  AUTOPLAY: true,
} as const;