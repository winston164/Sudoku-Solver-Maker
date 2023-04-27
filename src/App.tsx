import React, { useState } from 'react';
import Board from './Board';
import DifficultySelector from './DifficultySelector';
import Timer from './Timer';
import CheckButton from './CheckButton';
import NewGameButton from './NewGameButton';
import { generatePuzzle, validatePuzzle } from './sudoku';
import { Difficulty } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
  // add difficulty later
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  const [solution, setSolution] = useState(puzzle.map(row => [...row]));
  const [difficulty, setDifficulty] = useState(Difficulty.Easy);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isSolved, setIsSolved] = useState(false);

  const handleSquareChange = (rowIndex: number, colIndex: number, value: number) => {
    const newPuzzle = puzzle.map(row => [...row]);
    newPuzzle[rowIndex][colIndex] = value;
    setPuzzle(newPuzzle);
  };

  const handleCheckSolution = () => {
    setIsSolved(validatePuzzle(puzzle, solution));
  };

  const handleNewGame = () => {
    const newPuzzle = generatePuzzle();
    setPuzzle(newPuzzle);
    setSolution(newPuzzle.map(row => [...row]));
    setIsSolved(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    handleNewGame();
  };

  const handleStartGame = () => {
    handleNewGame();
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsSolved(false);
  };

  const handleTick = () => {
    if (startTime && !isSolved) {
      const elapsedTime = Date.now() - startTime;
      setElapsedTime(elapsedTime);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Sudoku</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <Board puzzle={puzzle} onChange={handleSquareChange} />
            </div>
            <div className="card-footer text-center">
              <CheckButton onClick={handleCheckSolution} />
              <NewGameButton onClick={handleNewGame} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
            </div>
            {startTime && (
              <div className="card-body text-center">
                {elapsedTime != null && (
                  <Timer elapsed={elapsedTime} onTick={handleTick} />
                )}
                {isSolved && (
                  <div className="alert alert-success mt-3" role="alert">
                    Puzzle solved in {Math.round(elapsedTime / 1000)} seconds!
                  </div>
                )}
              </div>
            )}
            {!startTime && (
              <div className="card-footer text-center">
                <button className="btn btn-primary" onClick={handleStartGame}>
                  Start Game
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App
