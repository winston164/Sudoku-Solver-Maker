import React from 'react';

import { Difficulty } from './types';

interface DifficultySelectorProps {
  value: Difficulty;
  onChange: (value: Difficulty) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ value, onChange }) => {
  const handleDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDifficulty = parseInt(event.target.value) as Difficulty;
    onChange(newDifficulty);
  };

  return (
    <div className="form-group mb-4">
      <label htmlFor="difficulty-select" className="form-label">
        Difficulty
      </label>
      <select
        id="difficulty-select"
        value={value}
        onChange={handleDifficultyChange}
        className="form-select"
      >
        <option value={Difficulty.Easy}>Easy</option>
        <option value={Difficulty.Medium}>Medium</option>
        <option value={Difficulty.Hard}>Hard</option>
      </select>
    </div>
  );
};

export default DifficultySelector;
