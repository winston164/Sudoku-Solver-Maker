import { FC } from 'react';
import { Button, Grid } from '@material-ui/core';

interface NumberPadProps {
  onClick: (value: number) => void;
}

const NumberPad: FC<NumberPadProps> = ({ onClick }) => {
  const handleClick = (value: number) => {
    onClick(value);
  };

  return (
    <Grid container spacing={1} style={{ border: '2px solid #1565c0', borderRadius: 4, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', padding: 8 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <Grid item xs={4} key={number}>
          <Button variant="contained" color="primary" onClick={() => handleClick(number)} style={{ width: '100%', backgroundColor: '#1565c0', color: '#fff', fontWeight: 'bold' }}>
            {number}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default NumberPad;
