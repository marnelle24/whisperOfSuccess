import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { AudioPlayer } from './AudioPlayer';
import { CircularProgress } from './CircularProgress';
import { useSpeech } from '../hooks/useSpeech';
import { useAffirmations } from '../hooks/useAffirmations';
import { Timer } from './Timer';

interface MeditationPlayerProps {
  category: string,
  duration: number;
}

export const MeditationPlayer: React.FC<MeditationPlayerProps> = ({ category, duration }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [timeLeft, setTimeLeft] = useState<number>(duration);

  // const [currentIndex, setCurrentIndex] = useState(0);
  const { speak, cancel } = useSpeech();
  const { 
    affirmations, 
    currentAffirmation, 
    setCurrentAffirmation,
    isLoading,
    error,
    refreshAffirmations
  } = useAffirmations(category, duration);

  // Add this effect to handle category changes
  useEffect(() => {
    // Stop playing if active
    if (isPlaying) {
      setIsPlaying(false);
      cancel();
    }
    // Reset timer
    setTimeLeft(duration);
    // Refresh affirmations for new category
    refreshAffirmations();
  }, [category, cancel, refreshAffirmations, duration]);


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
  }, [isPlaying, timeLeft, speak, cancel, affirmations, setCurrentAffirmation, duration]);

  const togglePlay = () => {
    if (!isPlaying) {
      if (timeLeft === 0) {
        setTimeLeft(duration);
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
    setTimeLeft(duration);
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
          <CircularProgress
            currentTime={timeLeft}
            duration={duration}
          />
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
      <br />
      <Timer timeLeft={timeLeft} />

      <AudioPlayer isPlaying={isPlaying} />
    </div>
  );
};