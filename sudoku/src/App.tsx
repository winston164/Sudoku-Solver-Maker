import { useState } from 'react'
import './App.css'

type SudokuMatrix = number[][];

// add setMatrix function later

const initialMatrix: SudokuMatrix = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

function App() {
  const [matrix] = useState<SudokuMatrix>(initialMatrix);

  const renderRow = (row: number[]) => {
    return (
      <div className="sudoku-row">
        {row.map((cell, index) => (
          <div key={index} className="sudoku-cell">
            {cell === 0 ? "" : cell}
          </div>
        ))}
      </div>
    );
  };

  const renderSudoku = () => {
    return (
      <div className="sudoku">
        {matrix.map((row, index) => (
          <div key={index}>{renderRow(row)}</div>
        ))}
      </div>
    );
  };

  return <div>{renderSudoku()}</div>;
}

export default App;