export default function ResultBanner({ totalMoves, seconds, onRestart }) {
  const movesMessage =
    totalMoves <= 10
      ? "Perfect Memory!"
      : totalMoves <= 20
        ? "Good job!"
        : "Room to improve!";

  const secondsMessage =
    seconds <= 20
      ? "Incredible"
      : seconds <= 40
        ? "Well Played!"
        : "Keep practicing!";

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40 transition-all duration-100"></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6 sm:p-8 z-50 flex flex-col items-center gap-3 w-[85vw] max-w-80 text-center">
        <p className="text-2xl font-medium text-gray-800">{secondsMessage}</p>
        <p className="text-sm text-gray-500 leading-relaxed">
          Finished in <strong>{totalMoves} moves</strong> and {seconds} seconds
        </p>

        <p className="text-xs text-gray-400">{movesMessage}</p>

        <button
          className="mt-2 bg-green-500 text-white text-sm px-8 py-2.5 rounded-xl cursor-pointer hover:bg-green-600 transition-colors"
          onClick={() => onRestart()}
        >
          Play Again
        </button>
      </div>
    </>
  );
}
