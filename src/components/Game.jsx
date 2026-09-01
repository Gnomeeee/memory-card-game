import { useEffect, useState } from "react";
import GameStats from "./GameStats";
import Board from "./Board";
import allCards from "../data/cards";
import { prepareCards } from "../utils/shuffle";
import ResultBanner from "./ResultBanner";

export default function Game() {
  const [cards, setCards] = useState(() => {
    const shuffleCard = allCards;
    return prepareCards(shuffleCard);
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [time, setTime] = useState(0);
  const [moved, setMoved] = useState(0);
  const [started, setStarted] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const storeBestScore = localStorage.getItem("bestScore");
    return storeBestScore ? Number(storeBestScore) : null;
  });

  useEffect(() => {
    const isFinished = matched.length === cards.length / 2 && cards.length > 0;
    if (!isFinished) return;

    if (bestScore === null || moved < bestScore) {
      setBestScore(moved);
      localStorage.setItem("bestScore", moved);
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
    setCards(prepareCards(allCards));
    setFlipped([]);
    setMatched([]);
    setTime(0);
    setMoved(0);
    setStarted(false);
  }

  return (
    <div className="game-wrapper">
      <GameStats
        moves={moved}
        pairs={`${matched.length}/${cards.length / 2}`}
        time={time}
        bestScore={bestScore}
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
