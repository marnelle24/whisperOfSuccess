import React from 'react';
import { MeditationPlayer } from './components/MeditationPlayer';

function App() {
  return (
    <div className="min-h-screen beach-bg flex flex-col items-center justify-center p-4 bg-opacity-50">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-20 text-center drop-shadow-lg">
        Whisper Of Success
      </h1>
      <br />
      <br />
      <MeditationPlayer />
    </div>
  );
}

export default App;