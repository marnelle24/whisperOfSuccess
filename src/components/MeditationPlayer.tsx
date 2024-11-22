import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { AudioPlayer } from './AudioPlayer';
import { CircularProgress } from './CircularProgress';
import { useElevenLabsVoice } from '../hooks/useElevenLabsVoice';
import { useAffirmations } from '../hooks/useAffirmations';
import { Timer } from './Timer';

interface MeditationPlayerProps {
  category: string;
  duration: number;
}

export const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ category, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isMusicReady, setIsMusicReady] = useState(false);


  const { speak, stop, isLoading: isVoiceLoading } = useElevenLabsVoice();
  
  const { 
    affirmations, 
    currentAffirmation, 
    setCurrentAffirmation,
    isLoading: isAffirmationsLoading,
    error,
    refreshAffirmations
  } = useAffirmations(category, duration);

  // Handle category changes
  useEffect(() => {
    if (isPlaying) {
      setIsPlaying(false);
      stop();
    }
    setTimeLeft(duration);
    refreshAffirmations();
  }, [category, stop, refreshAffirmations, duration]);

  // Handle meditation timer and affirmations
  useEffect(() => {
    let timer: number;

    if (isPlaying && timeLeft > 0 && affirmations.length > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      const elapsedTime = duration - timeLeft;
      const nextAffirmation = affirmations.find(
        (aff) => aff.timing === elapsedTime
      );

      if (nextAffirmation) {
        setCurrentAffirmation(nextAffirmation);
        speak(nextAffirmation.text);
      }
    }

    if (timeLeft === 0) {
      setIsPlaying(false);
      stop();
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, timeLeft, speak, stop, affirmations, setCurrentAffirmation, duration]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (timeLeft === 0) {
        setTimeLeft(duration);
        refreshAffirmations();
      }
    } else {
      stop();
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    stop();
    setTimeLeft(duration);
    setCurrentAffirmation(null);
    refreshAffirmations();
  };



  const isLoading = isAffirmationsLoading || isVoiceLoading || !isMusicReady;

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div className="relative">
        <CircularProgress
          currentTime={duration - timeLeft}
          duration={duration}
          size={500}
          strokeWidth={15}
        />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <Timer timeLeft={timeLeft} />
          <br />  
          
          {currentAffirmation && (
            <div className="mt-4 text-3xl drop-shadow-sm text-white/90 font-medium max-w-md">
              {currentAffirmation.text}
            </div>
          )}

          <div className="mt-20 flex gap-8 justify-center">
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-white/40 hover:bg-white/30 transition-colors text-white"
              disabled={isVoiceLoading}
            >
              {isPlaying ? <FaPause size={30} /> : <FaPlay size={30} />}
            </button>
            
            <button
              onClick={handleReset}
              className="p-4 rounded-full bg-white/40 hover:bg-white/30 transition-colors text-white"
              disabled={isVoiceLoading}
            >
              <FaRedo size={30} />
            </button>
          </div>
        </div>
      </div>

      <AudioPlayer 
        isPlaying={isPlaying} 
        onReady={() => setIsMusicReady(true)} 
      />
      
      {isVoiceLoading && (
        <div className="absolute inset-0 left-4 text-white/70 text-sm">
          Generating voice...
        </div>
      )}
    </div>
  );
};