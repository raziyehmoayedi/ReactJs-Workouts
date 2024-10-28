import React, { useState, useEffect } from "react";
import Player from "./componant/Player";
import "./style.css";

const App = () => {
  const [diceNumber1, setDiceNumber1] = useState(1);
  const [diceNumber2, setDiceNumber2] = useState(1);
  const [totalScores, setTotalScores] = useState([0, 0]);
  const [currentScores, setCurrentScores] = useState([0, 0]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [rollCount, setRollCount] = useState([0, 0]);
  const [isGameWon, setIsGameWon] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState("");
  const [lockRollDice, setLockRollDice] = useState(false);
  const [holdStatus, setHoldStatus] = useState([false, false]);
  const [isRolling, setIsRolling] = useState(false);

  const checkWinner = (totalScores) => {
    const player1Distance = 15 - totalScores[0];
    const player2Distance = 15 - totalScores[1];

    if (player1Distance < player2Distance && player1Distance >= 0) {
      setWinnerMessage("Player 1 wins by being closest to 15!");
      setIsGameWon(true);
    } else if (player2Distance < player1Distance && player2Distance >= 0) {
      setWinnerMessage("Player 2 wins by being closest to 15!");
      setIsGameWon(true);
    } else if (player1Distance === player2Distance) {
      if (rollCount[0] < rollCount[1]) {
        setWinnerMessage(`Player 1 wins because they have fewer rolls!`);
        setIsGameWon(true);
      } else if (rollCount[1] < rollCount[0]) {
        setWinnerMessage(`Player 2 wins because they have fewer rolls!`);
        setIsGameWon(true);
      } else {
        if (
          totalScores[0] === totalScores[1] &&
          rollCount[0] === rollCount[1]
        ) {
          setWinnerMessage("It's a draw!");
          setIsGameWon(true);
        }
      }
    }
  };

  const handleRollDice = () => {
    if (!isGameWon && rollCount[activePlayer] < 5) {
      const newDiceNumber1 = Math.floor(Math.random() * 6) + 1;
      const newDiceNumber2 = Math.floor(Math.random() * 6) + 1;

      setDiceNumber1(newDiceNumber1);
      setDiceNumber2(newDiceNumber2);
      setIsRolling(true); // شروع انیمیشن

      // تاخیر برای انیمیشن
      setTimeout(() => {
        const diceTotal = newDiceNumber1 + newDiceNumber2;

        setCurrentScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[activePlayer] += diceTotal;
          return newScores;
        });

        if (currentScores[activePlayer] + diceTotal === 15) {
          setTotalScores((prevScores) => {
            const newScores = [...prevScores];
            newScores[activePlayer] = 15;
            return newScores;
          });
          setWinnerMessage(
            `Player ${activePlayer + 1} wins by reaching 15 first!`
          );
          setIsGameWon(true);
          setIsRolling(false);
          return;
        } else if (currentScores[activePlayer] + diceTotal > 15) {
          setTotalScores((prevScores) => {
            const newScores = [...prevScores];
            newScores[activePlayer] = currentScores[activePlayer] + diceTotal;
            return newScores;
          });
          setWinnerMessage(
            `Player ${activePlayer === 0 ? 2 : 1} wins because ${
              currentScores[activePlayer] + diceTotal
            } is greater than 15!`
          );
          setIsGameWon(true);
          setIsRolling(false);
          return;
        }

        setRollCount((prevCounts) => {
          const newCounts = [...prevCounts];
          newCounts[activePlayer]++;
          return newCounts;
        });

        setIsRolling(false); // پایان انیمیشن
      }, 1000); // تاخیر یک ثانیه برای چرخش تاس
    }
  };

  // تابع برای نگه داشتن امتیازات
  const handleHoldScores = () => {
    if (!isGameWon) {
      setTotalScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[activePlayer] += currentScores[activePlayer];

        if (holdStatus[1 - activePlayer]) {
          checkWinner(newScores);
        }
        return newScores;
      });

      setCurrentScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[activePlayer] = 0;
        return newScores;
      });

      setHoldStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[activePlayer] = true;
        return newStatus;
      });

      setActivePlayer((prevPlayer) => (prevPlayer === 0 ? 1 : 0));
    }
  };

  // تابع ریست بازی
  const handleResetGame = () => {
    setTotalScores([0, 0]);
    setCurrentScores([0, 0]);
    setRollCount([0, 0]);
    setIsGameWon(false);
    setWinnerMessage("");
    setHoldStatus([false, false]);
    setActivePlayer(0);
  };

  return (
    <main>
      <Player
        playerIndex={0}
        totalScores={totalScores}
        currentScores={currentScores}
        activePlayer={activePlayer}
        diceNumber1={diceNumber1}
        diceNumber2={diceNumber2}
        isRolling={isRolling}
        isGameWon={isGameWon}
      />
      <Player
        playerIndex={1}
        totalScores={totalScores}
        currentScores={currentScores}
        activePlayer={activePlayer}
        diceNumber1={diceNumber1}
        diceNumber2={diceNumber2}
        isRolling={isRolling}
        isGameWon={isGameWon}
      />

      {isGameWon && <p className="winner-message">{winnerMessage}</p>}

      <button className="btn btn--new" onClick={handleResetGame}>
        🔄 New game
      </button>
      <button
        className="btn btn--roll"
        onClick={handleRollDice}
        disabled={isRolling}
      >
        🎲 Roll dice
      </button>
      <button className="btn btn--hold" onClick={handleHoldScores}>
        📥 Hold
      </button>
    </main>
  );
};

export default App;
