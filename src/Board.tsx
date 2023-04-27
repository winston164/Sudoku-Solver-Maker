import React from 'react';

interface BoardProps {
  puzzle: number[][];
  onChange: (rowIndex: number, colIndex: number, value: number) => void;
}

const Board: React.FC<BoardProps> = ({ puzzle, onChange }) => {
  const handleSquareChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rowIndex = parseInt(event.target.dataset.rowIndex!);
    const colIndex = parseInt(event.target.dataset.colIndex!);
    const value = parseInt(event.target.value);
    onChange(rowIndex, colIndex, value);
  };

  return (
    <table className="table table-bordered table-hover">
      <tbody>
        {puzzle.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((value, colIndex) => (
              <td key={colIndex}
              className={`text-center ${value ? 'fw-bold' : ''}`}
            >
              <input
                type="number"
                min="1"
                max="9"
                value={value || ''}
                data-row-index={rowIndex}
                data-col-index={colIndex}
                onChange={handleSquareChange}
                className={`form-control form-control-sm ${value ? 'text-primary' : ''}`}
                style={{ textAlign: 'center' }}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
};

export default Board;

