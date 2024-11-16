import { useCallback, useEffect, useState } from 'react';

interface SpeechSegment {
  text: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  pause?: number;
}

export const useSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const createUtterance = useCallback(
    (segment: SpeechSegment, naturalVoice: SpeechSynthesisVoice | null) => {
      const utterance = new SpeechSynthesisUtterance(segment.text);
      if (naturalVoice) utterance.voice = naturalVoice;
      utterance.rate = segment.rate ?? 1;
      utterance.pitch = segment.pitch ?? 1;
      utterance.volume = segment.volume ?? 1;
      return utterance;
    },
    []
  );

  const speak = useCallback(
    (text: string) => {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Select the most natural-sounding voice
      const naturalVoice = voices.find(
        (voice) =>
          voice.lang.startsWith('en') &&
          (voice.name.includes('Samantha') || // macOS
           voice.name.includes('Google UK English Female') || // Chrome
           voice.name.includes('Microsoft Zira') || // Windows
           voice.name.includes('Karen')) // Safari
      ) || voices.find((voice) => voice.lang.startsWith('en'));

      // Process text for more natural delivery
      const words = text.split(' ');
      const processedText = words
        .map(word => {
          if (word.endsWith(',')) return word + ' ';
          if (word.endsWith('.')) return word + ' .. ';
          return word;
        })
        .join(' ');

      // Define speech segments for natural rhythm
      const segments: SpeechSegment[] = [
        // Gentle inhale
        { text: '', rate: 0.1, pitch: 0.7, volume: 0.04, pause: 800 },
        
        // Short centering pause
        { text: '', rate: 0.05, volume: 0, pause: 500 },
        
        // Main affirmation with natural prosody
        { 
          text: processedText,
          rate: 0.82,
          pitch: 1.05,
          volume: 0.85
        },
        
        // Reflective pause
        { text: '', rate: 0.1, volume: 0, pause: 600 },
        
        // Soft exhale
        { text: '', rate: 0.15, pitch: 0.65, volume: 0.03 }
      ];

      // Create and queue all speech segments
      segments.forEach(segment => {
        const utterance = createUtterance(segment, naturalVoice);

        // Add natural pauses between segments
        if (segment.pause) {
          utterance.onend = () => {
            setTimeout(() => {}, segment.pause);
          };
        }

        // Add subtle emphasis for important words
        if (segment.text.includes('am') || segment.text.includes('can')) {
          utterance.pitch = (segment.pitch || 1) * 1.1;
          utterance.rate = (segment.rate || 1) * 0.95;
        }

        speechSynthesis.speak(utterance);
      });
    },
    [voices, createUtterance]
  );

  const cancel = useCallback(() => {
    speechSynthesis.cancel();
  }, []);

  return { speak, cancel };
};