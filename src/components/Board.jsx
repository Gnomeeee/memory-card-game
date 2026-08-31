import Card from "./Card";

export default function Board({ cards, flipped, matched, onFlip }) {
  const isMisMatch = flipped.length === 2;

  return (
    <div className="grid grid-cols-4 gap-2">
      {cards.map((crd) => (
        <Card
          key={crd.id}
          card={crd}
          isFlipped={flipped.includes(crd.id)}
          isMatched={matched.includes(crd.matchId)}
          isWrong={
            isMisMatch &&
            flipped.includes(crd.id) &&
            !matched.includes(crd.matchId)
          }
          onClick={() => onFlip(crd.id)}
        />
      ))}
    </div>
  );
}
