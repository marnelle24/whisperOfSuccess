import { useState } from 'react';
import { MeditationPlayer } from './components/MeditationPlayer';
import { CategorySelect } from './components/CategorySelect';
import { MeditationConfig } from './types/categories';

function App() {
  const [config, setConfig] = useState<MeditationConfig>({
    category: 'Relationship',
  });

  const [key, setKey] = useState(0); // Add this to force re-render of MeditationPlayer

  const handleConfigChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      [name]: value
    }));
    if (name === 'category') {
      setKey(prev => prev + 1); // Force re-render when category changes
    }
  };

  return (
    <div className="min-h-screen beach-bg flex flex-col items-center justify-start pt-10 p-4 bg-opacity-50">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center drop-shadow-lg">
        Whisper Of Success
      </h1>

      <div className="bg-white/80 p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="space-y-4">
          <div className="flex gap-4">
            <CategorySelect
              value={config.category}
              onChange={handleConfigChange}
            />
            <div className="w-1/3">
              <label className="block text-gray-700 mb-2 text-xs">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                value={config.category}
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
      <MeditationPlayer category={config.category} key={key} />
    </div>
  );
}

export default App;