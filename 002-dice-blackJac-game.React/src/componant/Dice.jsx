import React from "react";

const Dice = ({ diceNumber, isRolling, position }) => {
  return (
    <img
      src={`./public/images/dice-${diceNumber}.png`}
      alt={`Dice showing ${diceNumber}`}
      className={`dice dice--${position} ${isRolling ? "dice--rolling" : ""}`}
    />
  );
};

export default Dice;
