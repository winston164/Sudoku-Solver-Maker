import { useState } from 'react';
import './App.css';

// Define a type for a SudokuMatrix which is a 2D array of numbers.
type SudokuMatrix = number[][];

// Define an initial SudokuMatrix.
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

// Define the App component.
function App() {
  // Use the useState hook to set up a state variable for the SudokuMatrix
  const [matrix] = useState<SudokuMatrix>(initialMatrix);
  // Use the useState hook to set up a state variable for the highlighted cell
  const [highlightedCell, setHighlightedCell] = useState<number[]>([]);

  // Define a function that renders a row of the Sudoku matrix
  const renderRow = (row: number[], rowIndex: number) => {
    return (
      <div className="sudoku-row" key={rowIndex}>
        {row.map((cell, cellIndex) => {
          // Determine if the cell should be highlighted
          const isHighlighted =
            highlightedCell[0] === rowIndex || highlightedCell[1] === cellIndex;
          // Set the appropriate class for the cell
          const cellClass = `sudoku-cell${isHighlighted ? ' highlighted' : ''}`;
          // Render the cell
          return (
            <div
              key={cellIndex}
              className={cellClass}
              onMouseEnter={() => setHighlightedCell([rowIndex, cellIndex])}
              onMouseLeave={() => setHighlightedCell([])}
            >
              {cell === 0 ? '' : cell}
            </div>
          );
        })}
      </div>
    );
  };

  // Define a function that renders the entire Sudoku matrix
  const renderSudoku = () => {
    return (
      <div className="sudoku">
        {matrix.map((row, index) => (
          <div key={index}>{renderRow(row, index)}</div>
        ))}
      </div>
    );
  };

  // Render the Sudoku matrix inside a div
  return <div>{renderSudoku()}</div>;
}

// Export the App component as the default export
export default App;
