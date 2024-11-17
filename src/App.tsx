import { useState } from 'react';
import { MeditationPlayer } from './components/MeditationPlayer';

// Define the configuration types and defaults
type Category = 'Personal Growth' | 'Financial' | 'Relationship' | 'Goal';

interface MeditationConfig {
  category: Category;
  duration: number;
}

const defaultConfig: MeditationConfig = {
  category: 'Personal Growth',
  duration: 3,
};

function App() {
  const [config, setConfig] = useState<MeditationConfig>(defaultConfig);

  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen beach-bg flex flex-col items-center justify-start pt-10 p-4 bg-opacity-50">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Whisper Of Success
      </h1>

      <div className="bg-white/80 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-2/3">
              <label className="block text-gray-700 mb-2 text-xs">Category</label>
              <select
                name="category"
                value={config.category}
                onChange={handleConfigChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="Personal Growth">Personal Growth Affirmation</option>
                <option value="Financial">Financial Affirmation</option>
                <option value="Relationship">Relationship Affirmation</option>
                <option value="Goal">Goal Affirmation</option>
              </select>
            </div>
          
            <div className="w-1/3">
              <label className="block text-gray-700 mb-2 text-xs">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={config.duration}
                onChange={handleConfigChange}
                min="1"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <MeditationPlayer />
    </div>
  );
}

export default App;