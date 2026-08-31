export default function GameStats({ moves, pairs, time }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-base font-medium text-gray-800">Memory game</h1>
        <p className="text-xs text-gray-400">Find all matching pairs</p>
      </div>

      <div className="flex gap-2 text-center">
        <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-center min-w-14 shadow-sm">
          <p className="text-base font-medium text-gray-800">{moves}</p>
          <p className="text-xs text-gray-400 mt-0.5">moves</p>
        </div>
        <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-center min-w-14 shadow-sm">
          <p className="text-base font-medium text-gray-800">{pairs}</p>
          <p className="text-xs text-gray-400 mt-0.5">pairs</p>
        </div>
        <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-center min-w-14 shadow-sm">
          <p className="text-base font-medium text-gray-800">{time}s</p>
          <p className="text-xs text-gray-400 mt-0.5">time</p>
        </div>
      </div>
    </div>
  );
}
