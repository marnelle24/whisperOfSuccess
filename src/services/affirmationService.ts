import { supabase } from '../lib/supabase';
import { Affirmation } from '../types/affirmation';
import { MEDITATION_CONFIG } from '../config/constants';
import { AFFIRMATIONS_POOL } from '../data/affirmations';

export const fetchAffirmations = async (selectedCategory: string): Promise<Affirmation[]> => {
  const timeInterval = Math.floor(MEDITATION_CONFIG.DURATION / 10);
  const category = selectedCategory; // filter here
  try {
    const { data, error } = await supabase
      .from('affirmations')
      .select('*')
      .eq('category', category)
      .limit(10);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error('No affirmations found');
    }

    const timeInterval = Math.floor(MEDITATION_CONFIG.DURATION / 10);

    console.log(data);

    return data.map((aff, index) => ({
      id: aff.id,
      text: aff.text,
      timing: index * timeInterval
    }));

  } catch (error) {
    console.error('Error fetching affirmations:', error);
    // Fallback to local affirmations
    return AFFIRMATIONS_POOL.slice(0, 10).map((text, index) => ({
      id: index + 1,
      text,
      timing: index * timeInterval
    }));
  }
};