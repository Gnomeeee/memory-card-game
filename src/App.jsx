import { useState } from "react";
import Game from "./components/Game";
import DifficultyLevel from "./components/DifficultyLevel";

export default function App() {
  const [difficulty, setDifficulty] = useState(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {difficulty === null ? (
        <DifficultyLevel onStart={setDifficulty} />
      ) : (
        <Game difficulty={difficulty} onBack={() => setDifficulty(null)} />
      )}
    </div>
  );
}
