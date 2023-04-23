import { useState } from 'react';
import './App.css';

// Define a type alias for a Sudoku matrix 2D
type SudokuMatrix = number[][];

// Define an initial Sudoku matrix
const initialSudokuMatrix: SudokuMatrix = [
  [0, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 0, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 0, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

function App() {
  // Define a state variable for the Sudoku matrix
  const [sudokuMatrix] = useState<SudokuMatrix>(initialSudokuMatrix);
  // Define a state variable for the highlighted cell
  const [highlightedCell, setHighlightedCell] = useState<[number, number]>([-1, -1]);

  // Define a function that renders a row of cells in the Sudoku grid
  const renderRow = (row: number[], rowIndex: number) => {
    return (
      <div className="sudoku-row" key={rowIndex}>
        {row.map((cell, cellIndex) => {
          // Check if the cell is highlighted
          const isCellHighlighted = highlightedCell[0] === rowIndex || highlightedCell[1] === cellIndex;
          // Define the class name for the cell
          const cellClassName = `sudoku-cell${isCellHighlighted ? ' highlighted' : ''}`;
          // Define the value of the cell
          const cellValue = cell === 0 ? '' : cell;
          return (
            <div
              key={cellIndex}
              className={cellClassName}
              onMouseEnter={() => setHighlightedCell([rowIndex, cellIndex])}
              onMouseLeave={() => setHighlightedCell([-1, -1])}
            >
              {cellValue}
            </div>
          );
        })}
      </div>
    );
  };

  // Define a function that renders the Sudoku grid
  const renderSudoku = () => {
    return (
      <div className="sudoku">
        {sudokuMatrix.map((row, rowIndex) => (
          <div key={rowIndex}>{renderRow(row, rowIndex)}</div>
        ))}
      </div>
    );
  };

  // Render the Sudoku grid inside a container
  return <div>{renderSudoku()}</div>;
}

// Export the App component as the default export of this module
export default App;
