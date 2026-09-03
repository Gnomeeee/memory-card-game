import { useEffect, useState } from "react";
import GameStats from "./GameStats";
import Board from "./Board";
import allCards from "../data/cards";
import { prepareCards } from "../utils/shuffle";
import ResultBanner from "./ResultBanner";
import ProgressBar from "./ProgressBar";

const DIFFICULTY_CONFIG = {
  easy: { cardCount: 4, maxMoves: 10 },
  medium: { cardCount: 8, maxMoves: 20 },
  hard: { cardCount: 12, maxMoves: 25 },
};

export default function Game({ difficulty, onBack }) {
  const { cardCount, maxMoves } = DIFFICULTY_CONFIG[difficulty];
  const bestScoreKey = `bestScore_${difficulty}`;

  const [cards, setCards] = useState(() => {
    return prepareCards(allCards.slice(0, cardCount));
  });

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [moved, setMoved] = useState(0);
  const [started, setStarted] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const storeBestScore = localStorage.getItem(bestScoreKey);
    return storeBestScore ? Number(storeBestScore) : null;
  });

  const isWon = matched.length === cards.length / 2 && cards.length > 0;
  const isLost = moved >= maxMoves && !isWon;

  useEffect(() => {
    const isFinished = isWon;
    if (!isFinished) return;

    if (bestScore === null || moved < bestScore) {
      setBestScore(moved);
      localStorage.setItem(bestScoreKey, moved);
    }
  }, [isWon]);

  useEffect(() => {
    if (!started || matched.length === cards.length / 2) return;
    const timer = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [time, started, isWon]);

  function handleFlip(id) {
    if (isLost) return;
    if (!started) setStarted(true);
    if (flipped.length === 2) return;
    if (flipped.includes(id)) return;

    const card = cards.find((c) => c.id === id);
    if (matched.includes(card.matchId)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

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
    setCards(prepareCards(allCards.slice(0, cardCount)));
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
        maxMoves={maxMoves}
        moves={moved}
        pairs={`${matched.length}/${cards.length / 2}`}
        time={time}
        bestScore={bestScore}
        onBack={onBack}
      />

      <ProgressBar moves={moved} maxMoves={maxMoves} />

      {(isWon || isLost) && (
        <ResultBanner
          totalMoves={moved}
          seconds={time}
          onRestart={handleRestart}
          maxMoves={maxMoves}
          isWon={isWon}
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
