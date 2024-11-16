import { Affirmation } from '../types/affirmation';
import { MEDITATION_CONFIG } from '../config/constants';

const AFFIRMATIONS_POOL = [
  "I am worthy of love, respect, and happiness",
  "I believe in my abilities and trust my inner wisdom",
  "I am getting stronger and healthier every day",
  "I attract positive energy and positive people",
  "I am confident and capable in everything I do",
  "I choose to be happy and successful",
  "I am surrounded by love and support",
  "I trust in my journey and welcome all possibilities",
  "I radiate positive energy and inspire others",
  "My potential is limitless, and I can achieve anything",
  "I embrace change and welcome new opportunities",
  "I am grateful for all the abundance in my life",
  "I create my own happiness and success",
  "I am at peace with who I am",
  "I trust my intuition and inner guidance",
  "I am deserving of all good things",
  "I choose to see the beauty in every moment",
  "I am resilient and overcome all challenges",
  "I attract success naturally",
  "I am filled with endless possibilities"
];

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const fetchAffirmations = async (): Promise<Affirmation[]> => {
  try {
    // Get 10 random affirmations from the pool
    const selectedAffirmations = shuffleArray(AFFIRMATIONS_POOL).slice(0, 10);
    const timeInterval = Math.floor(MEDITATION_CONFIG.DURATION / 10);
    
    return selectedAffirmations.map((text, index) => ({
      id: index + 1,
      text,
      timing: index * timeInterval
    }));
    
  } catch (error) {
    console.error('Error generating affirmations:', error);
    // Return the first 10 affirmations as fallback
    return AFFIRMATIONS_POOL.slice(0, 10).map((text, index) => ({
      id: index + 1,
      text,
      timing: index * timeInterval
    }));
  }
};