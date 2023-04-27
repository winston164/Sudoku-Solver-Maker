import React from 'react';

interface CheckButtonProps {
  onClick: () => void;
}

const CheckButton: React.FC<CheckButtonProps> = ({ onClick }) => {
  return (
    <button className="btn btn-primary me-3" onClick={onClick}>
      Check Solution
    </button>
  );
};

export default CheckButton;
