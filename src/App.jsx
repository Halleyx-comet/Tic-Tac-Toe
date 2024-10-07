import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [itemArray, setItemArray] = useState(new Array(9).fill("empty"));
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  const drawItem = (itemNumber) => {
    if (itemArray[itemNumber] === "empty" && winMessage === '') {
      const newArray = [...itemArray];
      newArray[itemNumber] = isCross;
      setItemArray(newArray);
      setIsCross(!isCross);
      winGame(newArray);
    }
  };

  const chooseItemIcon = (itemNumber) => {
    if (itemArray[itemNumber] !== "empty") {
      return itemArray[itemNumber] ? "❌" : "⭕";
    }
    return "✏️";
  };

  const resetGame = () => {
    setItemArray(new Array(9).fill("empty"));
    setWinMessage("");
  };

  const winGame = (currentArray) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentArray[a] !== "empty" && currentArray[a] === currentArray[b] && currentArray[b] === currentArray[c]) {
        setWinMessage(currentArray[a] ? 'Cross wins!' : 'Circle wins!');
        
        // Reset game after 2 seconds
        setTimeout(resetGame, 2000);
        return;
      }
    }

    if (!currentArray.includes("empty")) {
      setWinMessage('It\'s a Draw!');
      
      // Reset game after 2 seconds
      setTimeout(resetGame, 2000);
    }
  };

  return (
    <div className="container">
      <div className="grid">
        {[0, 1, 2].map(row => (
          <div className="row" key={row}>
            {[0, 1, 2].map(col => {
              const index = row * 3 + col;
              return (
                <div className="item" key={col} onClick={() => drawItem(index)}>
                  {chooseItemIcon(index)}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="winMessage">{winMessage}</div>
      <button className="resetButton" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default App;