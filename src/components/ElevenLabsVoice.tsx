import React from 'react';
import { useElevenLabsVoice } from '../hooks/useElevenLabsVoice';

interface ElevenLabsVoiceProps {
  text: string;
  isPlaying: boolean;
}

export const ElevenLabsVoice: React.FC<ElevenLabsVoiceProps> = ({ text, isPlaying }) => {
  const { speak, stop, isLoading, error } = useElevenLabsVoice();

  React.useEffect(() => {
    if (isPlaying && text) {
      speak(text);
    } else {
      stop();
    }

    return () => {
      stop();
    };
  }, [isPlaying, text, speak, stop]);

  if (isLoading) {
    return <div className="text-sm text-gray-500">Generating voice...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return null;
}; 