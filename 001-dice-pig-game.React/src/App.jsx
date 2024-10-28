import React, { useEffect, useState } from "react";
import "./style.css";

const App = () => {
  const [diceNumber, setDiceNumber] = useState(2);
  const [activPlayer, setActivPlayer] = useState(0);
  const [p1CurrentScore, setP1CurrentScore] = useState(0);
  const [p2CurrentScore, setP2CurrentScore] = useState(0);
  const [p1TotalScore, setP1TotalScore] = useState(0);
  const [p2TotalScore, setP2TotalScore] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [lockRollDice, setLockRollDice] = useState(false);
  

  useEffect(() => {
    if (isRolling) {
      const timer = setTimeout(() => setIsRolling(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isRolling]);

  const handlerRollDice = () => {
    if (lockRollDice) return;

    setLockRollDice(true);
    setIsRolling(true);

    let rollCount = 0;

    const intervalId = setInterval(() => {
      rollCount++;

      const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(randomDiceNumber);
      console.log(`randomDiceNumber:${randomDiceNumber}`);

      if (randomDiceNumber === 1) {
        chengeActivePlayer();
      } else {
        sumCurrentScore(randomDiceNumber);
      }

      if (rollCount === 3) {
        clearInterval(intervalId);
        setIsRolling(false);
        setLockRollDice(false);
      }
    }, 300);
  };


  const chengeActivePlayer = () => {

    activPlayer === 0 ? setP1CurrentScore(0) : setP2CurrentScore(0);

    setActivPlayer((prevPlayer) => {
      const newPlayer = prevPlayer === 0 ? 1 : 0;
      const newRandomDiceNumber = Math.floor(Math.random() * 6) + 1;
      console.log(`newRandomDiceNumber:${newRandomDiceNumber}`);
      setDiceNumber(newRandomDiceNumber);
      return newPlayer;
    });
  };

  const sumCurrentScore = (randomDiceNumber) => {
    activPlayer === 0
      ? setP1CurrentScore((prevScore) => prevScore + randomDiceNumber)
      : setP2CurrentScore((prevScore) => prevScore + randomDiceNumber);
  };

  const handleHoldBtn = () => {
    if (activPlayer === 0) {
      setP1TotalScore((prevTotalScore) => {
        const newTotal = prevTotalScore + p1CurrentScore;
        return newTotal >= 100 ? 100 : newTotal;
      });
      setP1CurrentScore(0);
    } else {
      setP2TotalScore((prevTotalScore) => {
        const newTotal = prevTotalScore + p2CurrentScore;
        return newTotal >= 100 ? 100 : newTotal;
      });
      setP2CurrentScore(0);
    }

    chengeActivePlayer();
    setLockRollDice(false);
  };

  const isGameWon = p1TotalScore >= 100 || p2TotalScore >= 100;

  const handleResetGame = () => {
    chengeActivePlayer(0);
    setP1CurrentScore(0);
    setP2CurrentScore(0);
    setP1TotalScore(0);
    setP2TotalScore(0);
    isGameWon(false);
    setLockRollDice(false);
  };


  const renderCurrentScore = (player) => {
    return activPlayer === player ? (
      <p className="current-score">{player === 0 ? p1CurrentScore : p2CurrentScore}</p>
    ) : (
      <p className="current-score">-</p>
    );
  };
  return (
      <main>
        <section
          className={`player player--0 ${
            activPlayer === 0 ? "player--active" : ""
          } ${p1TotalScore >= 100 ? "player--winner" : ""}`}
        >
          <h2 className="name" id="name--0">
            Player 1
          </h2>
          <p className="score" id="score--0">
            {p1TotalScore}
          </p>
          <div className="current">
            <p className="current-label">Current</p>

            <p className="current-score" id="current--0">
              {activPlayer === 0 ? p1CurrentScore : 0}
            </p>
          </div>
        </section>

        <section
          className={`player player--1 ${
            activPlayer === 1 ? "player--active" : ""
          } ${p2TotalScore >= 100 ? "player--winner" : ""} `}
        >
          <h2 className="name" id="name--1">
            Player 2
          </h2>
          <p className="score" id="score--1">
            {p2TotalScore}
          </p>
          <div className="current">
            <p className="current-label">Current</p>
            <p className="current-score" id="current--1">
              {activPlayer === 1 ? p2CurrentScore : 0}
            </p>
          </div>
        </section>

        {isGameWon ? (
          <p className="winner-message">{`${
            p1TotalScore >= 100 ? "player 1" : "player 2"
          } wins 🍷😎🏆`}</p>
        ) : (
          <img
            src={`./public/images/dice-${diceNumber}.png`}
            alt={`Dice showing ${diceNumber}`}
            className={`dice dice--${activPlayer} ${
              isRolling ? "rolling" : ""
            }`}
          />
        )}

        <button className="btn btn--new" onClick={handleResetGame}>
          🔄 New game
        </button>
        <button
          className="btn btn--roll"
          onClick={handlerRollDice}
          disabled={lockRollDice}
        >
          🎲 Roll dice
        </button>
        <button className="btn btn--hold" onClick={handleHoldBtn}>
          📥 Hold
        </button>
      </main>


  );
};

export default App;
