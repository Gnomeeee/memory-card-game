export default function DifficultyLevel({ onStart }) {
  const difficultyLvl = [
    {
      level: "Easy",
      emoji: "🌱",
      colors: "bg-green-100 hover:bg-green-200",
      pairs: "4 pairs",
      cards: "8 cards",
      lev_pill: "Beginner",
      pillColors: "bg-green-200 text-green-700",
      grid: "4x2 grid",
    },
    {
      level: "Medium",
      emoji: "🔥",
      colors: "bg-orange-100 hover:bg-orange-200",
      pairs: "8 pairs",
      cards: "16 cards",
      lev_pill: "Normal",
      pillColors: "bg-orange-200 text-orange-700",
      grid: "4x4 grid",
    },
    {
      level: "Hard",
      emoji: "💀",
      colors: "bg-red-100 hover:bg-red-200",
      pairs: "12 pairs",
      cards: "24 cards",
      lev_pill: "Expert",
      pillColors: "bg-red-200 text-red-700",
      grid: "6x4 grid",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
      <div className="flex items-center justify-center flex-col mb-5">
        <h1 className="text-2xl">Memory Game</h1>
        <p className="text-sm leading-relaxed text-gray-400">
          Choose your difficulty
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {difficultyLvl.map((dif) => (
          <div
            className={`flex max-w-full items-center justify-around px-3 py-3 transition-colors duration-75 ${dif.colors} rounded-xl cursor-pointer`}
            onClick={() => onStart(dif.level.toLowerCase())}
          >
            <span className="text-2xl">{dif.emoji}</span>
            <div className="text-left">
              <p className="text-md font-semibold ">{dif.level}</p>
              <p className="text-sm text-gray-700">
                {dif.pairs}·{dif.cards}·{dif.grid}
              </p>
            </div>
            <span className={`rounded-2xl text-xs ${dif.pillColors} px-2 py-1`}>
              {dif.lev_pill}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
