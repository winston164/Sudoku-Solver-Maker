import { FC, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import SudokuBoard from './SudokuBoard';
import NumberPad from './NumberPad';

const App: FC = () => {
  const [matrix, setMatrix] = useState<number[][]>([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);

  const handleCellClick = (rowIndex: number, colIndex: number, value: number) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SudokuBoard matrix={matrix} onCellClick={handleCellClick} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NumberPad onClick={(value) => handleCellClick(0, 2, value)} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
