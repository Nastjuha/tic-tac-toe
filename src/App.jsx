import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]); // gameTurns is an array of objects
  const [activePlayer, setActivePLayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePLayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = "X";

      // if latest turn in our existing turn 'prevTurns' was performed by 'X' player
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }

      const updatedTurnes = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, // first item of this array is latest turn
        ...prevTurns,
      ];

      return updatedTurnes;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          // activePlayerSymbol={activePlayer}
          turns={gameTurns}
        />
      </div>
      <Log />
    </main>
  );
}

export default App;
