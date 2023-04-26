            export type SudokuMatrix = number[][];

            export type GameDifficulty = 'easy' | 'medium' | 'hard';

            export type GameConfig = {
            difficulty: GameDifficulty;
            };

            export type GameState = {
            matrix: SudokuMatrix;
            history: SudokuMatrix[];
            selectedCell: [number, number] | null;
            isSolved: boolean;
            };



              