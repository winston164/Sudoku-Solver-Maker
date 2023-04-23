// Import the useState hook from the 'react' module
import { useState } from 'react';
// Import the 'App.css' stylesheet
import './App.css';

// Define a type alias for a Sudoku matrix
type SudokuMatrix = number[][];

// Define an initial Sudoku matrix
const initialSudokuMatrix: SudokuMatrix = [
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

// Define the App component
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
const cellClassName = sudoku-cell${isCellHighlighted ? ' highlighted' : ''};
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
return (
<div>
{renderSudoku()}
</div>
);
}

// Export the App component as the default export of this module
export default App;
