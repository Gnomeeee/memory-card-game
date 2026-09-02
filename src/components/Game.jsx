import { useEffect, useState } from "react";
import GameStats from "./GameStats";
import Board from "./Board";
import allCards from "../data/cards";
import { prepareCards } from "../utils/shuffle";
import ResultBanner from "./ResultBanner";

export default function Game({ difficulty, onBack }) {
  const [cards, setCards] = useState(() => {
    const levels = difficulty === "easy" ? 4 : difficulty === "medium" ? 8 : 12;
    return prepareCards(allCards.slice(0, levels));
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [moved, setMoved] = useState(0);
  const [started, setStarted] = useState(false);
  const bestScoreKey = `bestScore_${difficulty}`;
  const [bestScore, setBestScore] = useState(() => {
    const storeBestScore = localStorage.getItem(bestScoreKey);
    return storeBestScore ? Number(storeBestScore) : null;
  });

  useEffect(() => {
    const stored = localStorage.getItem(bestScoreKey);
    setBestScore(stored ? Number(stored) : null);
  }, [difficulty]);

  useEffect(() => {
    const isFinished = matched.length === cards.length / 2 && cards.length > 0;
    if (!isFinished) return;

    if (bestScore === null || moved < bestScore) {
      setBestScore(moved);
      localStorage.setItem(bestScoreKey, moved);
    }
  }, [matched]);

  useEffect(() => {
    if (!started || matched.length === cards.length / 2) return;
    const timer = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time, started, matched]);

  function handleFlip(id) {
    if (!started) setStarted(true);

    const card = cards.find((c) => c.id === id);

    if (flipped.length === 2) return;
    if (flipped.includes(id)) return;
    if (matched.includes(card.matchId)) return;

    setFlipped((prev) => [...prev, id]);

    const newFlipped = [...flipped, id];

    if (newFlipped.length === 2) {
      setMoved((prev) => prev + 1);

      const cardA = cards.find((c) => c.id === newFlipped[0]);
      const cardB = cards.find((c) => c.id === newFlipped[1]);

      if (cardA.matchId === cardB.matchId) {
        setMatched((prev) => [...prev, cardA.matchId]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  }

  function handleRestart() {
    const levels = difficulty === "easy" ? 4 : difficulty === "medium" ? 8 : 12;
    setCards(prepareCards(allCards.slice(0, levels)));
    setFlipped([]);
    setMatched([]);
    setTime(0);
    setMoved(0);
    setStarted(false);
    onBack();
  }

  return (
    <div>
      <GameStats
        moves={moved}
        pairs={`${matched.length}/${cards.length / 2}`}
        time={time}
        bestScore={bestScore}
        onBack={onBack}
      />

      {matched.length === cards.length / 2 && cards.length > 0 && (
        <ResultBanner
          totalMoves={moved}
          seconds={time}
          onRestart={handleRestart}
        />
      )}

      <Board
        cards={cards}
        flipped={flipped}
        matched={matched}
        onFlip={handleFlip}
      />
    </div>
  );
}
