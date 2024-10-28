import React from "react";
import Dice from "./Dice";

const Player = ({
  playerIndex,
  totalScores,
  currentScores,
  activePlayer,
  diceNumber1,
  diceNumber2,
  isRolling,
  isGameWon,
}) => {
  return (
    <section
      className={`player player--${playerIndex} ${
        activePlayer === playerIndex ? "player--active" : ""
      } ${totalScores[playerIndex] === 15 ? "player--winner" : ""}`}
    >
      <h2 className="name">Player {playerIndex + 1}</h2>
      <p className="score">{totalScores[playerIndex]}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score">
          {activePlayer === playerIndex ? currentScores[playerIndex] : 0}
        </p>
      </div>
      <div className="dice">
        {activePlayer === playerIndex && !isGameWon && (
          <Dice
            diceNumber={playerIndex === 0 ? diceNumber1 : diceNumber2}
            isRolling={isRolling}
            position={playerIndex}
          />
        )}
      </div>
    </section>
  );
};

export default Player;
