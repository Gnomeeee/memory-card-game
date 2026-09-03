import { TbCards } from "react-icons/tb";

export default function Card({ card, isFlipped, isMatched, isWrong, onClick }) {
  const bgColor = isMatched
    ? "bg-cyan-200"
    : isWrong
      ? "bg-red-200"
      : isFlipped
        ? "bg-white"
        : "bg-gray-100";

  return (
    <div
      className="relative cursor-pointer h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
      style={{ perspective: "600px" }}
      onClick={onClick}
    >
      <div
        className={`card-inner absolute inset-0 rounded-xl ${isFlipped || isMatched ? "flipped" : ""} ${isMatched ? "card-matched" : ""} ${bgColor}`}
      >
        <div className="card-front absolute inset-0 flex items-center justify-center text-2xl md:text-3xl rounded-xl">
          {card.emoji}
        </div>

        <div className="card-back absolute inset-0 flex items-center justify-center text-2xl text-gray-400 rounded-xl">
          <TbCards />
        </div>
      </div>
    </div>
  );
}
