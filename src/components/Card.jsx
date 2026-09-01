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
      className={`card-inner flex items-center justify-center transition-all duration-200 cursor-pointer rounded-xl h-16 w-16 sm:h-20 sm:w-20 sm:text-2xl md:h-24 md:w-24 md:text-2xl lg:h-30 lg:w-30 lg:text-3xl text-xl ${isFlipped || isMatched ? "flipped" : ""} ${bgColor}`}
      onClick={onClick}
    >
      <div className="card-front absolute inset-0 flex items-center justify-center">
        {card.emoji}
      </div>
      <div className="card-back absolute inset-0 flex items-center justify-center">
        <TbCards />
      </div>
    </div>
  );
}
