
// Array of strings
const youtubeIDs = ['joRVkFrxuS4', 'YRJ6xoiRcpQ', 'kYissYTEjww', 'AEoci8pjC7Y', 'vELBkxa-8EQ'];
const randomIDs = youtubeIDs[Math.floor(Math.random() * youtubeIDs.length)];

export const MEDITATION_CONFIG = {
  // Peaceful meditation music (432Hz Miracle Tone - longer version)
  YOUTUBE_VIDEO_ID: randomIDs,
  // Duration in seconds (3 minutes)
  DURATION: 180,
  // Volume settings
  MUSIC_VOLUME: 30,
  VOICE_VOLUME: 50
} as const;