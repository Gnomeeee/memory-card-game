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
      className={`flex items-center justify-center transition-all duration-200 cursor-pointer rounded-xl h-30 w-30 text-3xl ${bgColor}`}
      onClick={onClick}
    >
      {isFlipped || isMatched ? <span>{card.emoji}</span> : <TbCards />}
    </div>
  );
}
