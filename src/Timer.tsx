import React, { useEffect } from 'react';

interface TimerProps {
  elapsed: number;
  onTick: () => void;
}

const Timer: React.FC<TimerProps> = ({ elapsed, onTick }) => {
  useEffect(() => {
    const intervalId = setInterval(onTick, 1000);
    return () => clearInterval(intervalId);
  }, [onTick]);

  const formatTime = (elapsed: number) => {
    const totalSeconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div className="h3">{formatTime(elapsed)}</div>;
};

export default Timer;
