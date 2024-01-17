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
export default function Board() {
  const [square, setSquare] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = winnerCalculation(square);
  let status;
  if (winner) {
    status = `Winner : <b>${winner}</b>`;
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
    setSquare(nextSquare);
    setXIsNext(!xIsNext);
  }
  console.log(square);
  return (
    <>
      <div className="p-5">
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
