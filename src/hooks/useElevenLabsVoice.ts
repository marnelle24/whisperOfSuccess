import { useState, useCallback } from 'react';
import { elevenLabsService } from '../services/elevenLabsService';

export const useElevenLabsVoice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioContext] = useState(() => new (window.AudioContext || window.webkitAudioContext)());

  const speak = useCallback(async (text: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const audioData = await elevenLabsService.convertTextToSpeech(text);
      const audioBuffer = await audioContext.decodeAudioData(audioData);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate speech');
      console.error('Speech generation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [audioContext]);

  const stop = useCallback(() => {
    audioContext.close();
  }, [audioContext]);

  return {
    speak,
    stop,
    isLoading,
    error
  };
}; 