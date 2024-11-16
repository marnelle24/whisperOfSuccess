import { useState, useEffect, useCallback } from 'react';
import { Affirmation } from '../types/affirmation';
import { fetchAffirmations } from '../services/affirmationService';

export const useAffirmations = () => {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [currentAffirmation, setCurrentAffirmation] = useState<Affirmation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshAffirmations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchAffirmations();
      setAffirmations(data);
      setCurrentAffirmation(data[0]);
    } catch (err) {
      setError('Failed to load affirmations. Using default ones.');
      console.error('Error in refreshAffirmations:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshAffirmations();
  }, [refreshAffirmations]);

  return {
    affirmations,
    currentAffirmation,
    setCurrentAffirmation,
    isLoading,
    error,
    refreshAffirmations
  };
};