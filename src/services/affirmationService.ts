import { supabase } from '../lib/supabase';
import { Affirmation } from '../types/affirmation';
import { AFFIRMATIONS_POOL } from '../data/affirmations';

export const fetchAffirmations = async ({ selectedCategory, duration }: { selectedCategory: string, duration: number }): Promise<Affirmation[]> => {
  const timeInterval = Math.floor(duration / 10);
  const category = selectedCategory; // filter here
  try {
    const { data, error } = await supabase
      .from('affirmations')
      .select('*')
      .eq('category', category)
      .limit(10);
    
    while (data && data.length < 10) {
      const randomIndex = Math.floor(Math.random() * AFFIRMATIONS_POOL.length);
      const randomAffirmation = AFFIRMATIONS_POOL[randomIndex];
      data.push({
        id: data.length + 1,
        text: randomAffirmation,
        category: 'default'
      });
    }

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      throw new Error('No affirmations found');
    }

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