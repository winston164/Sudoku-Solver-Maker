#ifndef SUDOKU_H
#define SUDOKU_H
#include <vector>
using namespace std;
/***************************************************
 * Finish your .cpp according to this header file. *
 * You can modify this file if needed.             *
 ***************************************************/

class Sudoku
{
public:
    Sudoku();
    
    // Get Matrix
    vector<int> getMtrx();

    //Set Matrix
    void setMtrx(vector<int> vec);
    
    // generate
    static Sudoku generate();

    // transform
    void swapNum(int x, int y);
    void swapRow(int x, int y);
    void swapCol(int x, int y);
    void rotate(int x);
    void flip(int x);

    // solve
    int solve();

private:
    int solve(vector<struct cell> & vecRef);
    vector<struct cell> findClueGrid();
    vector<int> cellVals(int x, int y);
    int mtrx[9][9];
};

#endif // SUDOKU_H
