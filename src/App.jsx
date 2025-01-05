import { useState } from "react";

import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurns, setGameTurns] = useState([]); // gameTurns is an array of objects

  const activePlayer = deriveActivePlayer(gameTurns);

  // with that we make sure that we're editing a brand new array
  // and not the one that's stored in the state
  // this way we can avoid mutating the state
  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    // if 'let gameBoard = initialGameBoard;' was used instead of 'let gameBoard = [...initialGameBoard.map((array) => [...array])];'
    // the gameBoard would be mutated and the game would not work as expected
    // because the gameBoard would be pointing to the same array as initialGameBoard
    // and we would be mutating the initialGameBoard array
    // So when restart is clicked, the initialGameBoard would not be reset to the original state
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol]; // accessing the prop where the prop name is not hardcoded but stored in some variable or constant
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurnes = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer }, // first item of this array is latest turn
        ...prevTurns,
      ];

      return updatedTurnes;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [playerSymbol]: newName, // [] sets the property dynamically
      };
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
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
