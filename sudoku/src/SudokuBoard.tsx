import { FC } from 'react';
import { Grid } from '@material-ui/core';

interface SudokuBoardProps {
  matrix: number[][];
  onCellClick: (rowIndex: number, colIndex: number, value: number) => void;
}

const SudokuBoard: FC<SudokuBoardProps> = ({ matrix, onCellClick }) => {
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const value = matrix[rowIndex][colIndex] === 9 ? 1 : matrix[rowIndex][colIndex] + 1;
    onCellClick(rowIndex, colIndex, value);
  };

  return (
    <Grid container className="sudoku-board" justify="center" alignItems="center">
      {matrix.map((row, rowIndex) => (
        <Grid container item xs={12} key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <Grid
              item
              xs={1}
              key={colIndex}
              className={`sudoku-cell ${colIndex === 2 || colIndex === 5 ? 'sudoku-cell-right' : ''} ${rowIndex === 2 || rowIndex === 5 ? 'sudoku-cell-bottom' : ''}`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.backgroundColor = '';
              }}
            >
              <span>{cell === 0 ? '' : cell}</span>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default SudokuBoard;
