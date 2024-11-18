import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { AudioPlayer } from './AudioPlayer';
import { CircularProgress } from './CircularProgress';
import { MEDITATION_CONFIG } from '../config/constants';
import { useSpeech } from '../hooks/useSpeech';
import { useAffirmations } from '../hooks/useAffirmations';

interface MeditationPlayerProps {
  category: string;
}

export const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ category }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(MEDITATION_CONFIG.DURATION);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const { speak, cancel } = useSpeech();
  const { 
    affirmations, 
    currentAffirmation, 
    setCurrentAffirmation,
    isLoading,
    error,
    refreshAffirmations
  } = useAffirmations(category);

  const progress = ((MEDITATION_CONFIG.DURATION - timeLeft) / MEDITATION_CONFIG.DURATION) * 100;

  useEffect(() => {
    let timer: number;

    if (isPlaying && timeLeft > 0 && affirmations.length > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      const elapsedTime = MEDITATION_CONFIG.DURATION - timeLeft;
      const nextAffirmation = affirmations.find(
        (aff) => aff.timing === elapsedTime
      );

      if (nextAffirmation) {
        setCurrentAffirmation(nextAffirmation);
        speak(nextAffirmation.text);
        // setCurrentIndex((prev) => (prev + 1) % affirmations.length);
      }
    }

    if (timeLeft === 0) {
      setIsPlaying(false);
      cancel();
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, timeLeft, speak, cancel, affirmations, setCurrentAffirmation]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (timeLeft === 0) {
        setTimeLeft(MEDITATION_CONFIG.DURATION);
        // setCurrentIndex(0);
      }
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      cancel();
    }
  };

  const handleRefresh = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      cancel();
    }
    setTimeLeft(MEDITATION_CONFIG.DURATION);
    // setCurrentIndex(0);
    await refreshAffirmations();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <div className="relative flex items-center justify-center">
        <div className="absolute bg-white/50 backdrop-blur-sm rounded-full w-[320px] h-[320px]" />
        <div className="absolute">
          <CircularProgress progress={progress} />
        </div>
        <div className="relative z-10 text-center min-h-[80px] p-4 rounded-lg w-[250px]">
          <p className="text-lg text-gray-800 font-medium italic">
            {currentAffirmation?.text || "Press play to start your meditation journey"}
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="w-16 h-16 flex items-center justify-center bg-gray-300/50 hover:bg-white/50 rounded-full text-white transition-colors duration-300 shadow-lg"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
          <button
            onClick={handleRefresh}
            className="w-16 h-16 flex items-center justify-center bg-gray-300/50 hover:bg-white/50 rounded-full text-white transition-colors duration-300 shadow-lg"
          >
            <FaRedo size={20} />
          </button>
        </div>
      </div>

      <AudioPlayer isPlaying={isPlaying} />
    </div>
  );
};