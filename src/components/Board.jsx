/* eslint-disable react/jsx-key */
/* eslint-disable for-direction */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button
      onClick={onSquareClick}
      className="bg-white border border-gray-300 h-12 w-12 m-1 text-lg leading-9"
    >
      {value}
    </button>
  );
}
function Board({ square, xIsNext, onPlay }) {
  const winner = winnerCalculation(square);
  let status;
  if (winner) {
    status = `Winner : ${winner}`;
  } else {
    status = `Next Player : ${xIsNext ? "x" : "0"}`;
  }
  function handleClick(i) {
    if (square[i] || winnerCalculation(square)) {
      return;
    }
    const nextSquare = square.slice();
    if (xIsNext) {
      nextSquare[i] = "x";
    } else {
      nextSquare[i] = "0";
    }
    onPlay(nextSquare);
  }
  console.log(square);
  return (
    <>
      <div className="">
        <div>{status}</div>
        <div className="flex">
          <Square value={square[0]} onSquareClick={() => handleClick(0)} />
          <Square value={square[1]} onSquareClick={() => handleClick(1)} />
          <Square value={square[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex">
          <Square value={square[3]} onSquareClick={() => handleClick(3)} />
          <Square value={square[4]} onSquareClick={() => handleClick(4)} />
          <Square value={square[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex">
          <Square value={square[6]} onSquareClick={() => handleClick(6)} />
          <Square value={square[7]} onSquareClick={() => handleClick(7)} />
          <Square value={square[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
}

function winnerCalculation(square) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquare = history[currentMove];

  function handlePlay(nextSquare) {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const move = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move # ${move}`;
    } else {
      description = `Go to start the Game`;
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <>
      <div className="block md:flex gap-10 p-5 justify-center">
        <div>
          <Board square={currentSquare} xIsNext={xIsNext} onPlay={handlePlay} />
        </div>
        <div className="border p-2 inline-block mt-5 md:mt-0">
          <ol>{move}</ol>
        </div>
      </div>
    </>
  );
}
