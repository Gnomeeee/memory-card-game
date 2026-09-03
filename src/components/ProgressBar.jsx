export default function ProgressBar({ moves, maxMoves }) {
  const percentage = (moves / maxMoves) * 100;

  return (
    <div className="h-1.5 bg-gray-100 rounded-full flex-1 overflow-hidden mb-5">
      <div
        className={`bg-green-100 h-full rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
