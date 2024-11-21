import axios from 'axios';

const ELEVEN_LABS_API_KEY = import.meta.env.VITE_ELEVEN_LABS_API_KEY;
const ELEVEN_LABS_VOICE_ID = 'pNInz6obpgDQGcFmaJgB'; // Example voice ID for "Rachel"

interface TextToSpeechResponse extends ArrayBuffer {
  audio: ArrayBuffer;
}

export const elevenLabsService = {
  async convertTextToSpeech(text: string): Promise<ArrayBuffer> {
    try {
      const response = await axios.post<TextToSpeechResponse>(
        `https://api.elevenlabs.io/v1/text-to-speech/${ELEVEN_LABS_VOICE_ID}`,
        {
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': ELEVEN_LABS_API_KEY,
          },
          responseType: 'arraybuffer',
        }
      );

      return response.data;
    } catch (error) {
      console.error('ElevenLabs API Error:', error);
      throw new Error('Failed to convert text to speech');
    }
  },
}; 