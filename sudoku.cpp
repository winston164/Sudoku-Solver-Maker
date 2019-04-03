#include "sudoku.h"
#include <iostream>
#include <vector>
#include <cstdlib>
#include <time.h>
#include <string>
using namespace std;


//Constructor-----------------------------------------------------
Sudoku::Sudoku() {
    //initialize
    for(int i = 0; i < 9; ++i)
        for(int j = 0; j < 9; ++j)
            mtrx[i][j] = 0;
}



//get and set sudoku----------------------------------------------
vector<int> Sudoku::getMtrx() {
    vector<int> vec;
    int k = 0;
    for(int i = 0; i < 9; ++i)
        for(int j = 0; j < 9; ++j)
            vec.push_back(mtrx[j][i]);
    return vec;
}

void Sudoku::setMtrx(vector<int> vec) {
    int k = 0;
    for(int i = 0; i < 9; ++i)
        for(int j = 0; j < 9; ++j)
            mtrx[j][i] = vec.at(k++);
}



//solving and generating requirements----------------------------

struct cell {
    bool solved;
    vector<int> cands; //first item (0) is quantity of candidates
};

vector<int> Sudoku::cellVals(int x, int y) { //x and y values should be recieved as array index
    vector<int> vec(10);
    int compAr[9] = {1,1,1,1,1,1,1,1,1};
    int i;


    //row check
    for(i = 0; i < 9; ++i)
        if(mtrx[i][y]!= 0)
            --compAr[mtrx[i][y] - 1];

    //column check
    for(i = 0; i < 9; ++i)
        if(mtrx[x][i] != 0)
            --compAr[mtrx[x][i] -1];


    //block check
    int j, kx, ky;
    kx = x -(x%3);
    ky = y -(y%3);
    for(i = kx; i < (kx + 3); ++i) {
        for(j = ky; j < (ky + 3); j++) {
            if(mtrx[i][j] != 0)
                --compAr[mtrx[i][j] - 1];
        }
    }
    for(i = 0; i < 9 ; ++i) {
        if(compAr[i] == 1) {
            vec.at(i + 1) = i + 1;
            ++vec.at(0);
        } else
            vec.at(i + 1) = 0;
    }

    return vec;

}

vector<struct cell> Sudoku::findClueGrid() {
    static vector<struct cell> grid(81);
    vector<int> empty(0);
    struct cell aux;
    for(int i = 0; i < 9; ++i)
        for(int j = 0; j < 9; ++j) {
            if(mtrx[j][i] == 0) {
                aux.solved = false;
                aux.cands = cellVals(j,i);
            } else {
                aux.solved = true;
                aux.cands = empty;
            }
            grid.at((i*9) + j) = aux;
        }
    return grid;
}

vector<struct cell> updateGrid(int x, int y, int val, vector<struct cell> vec) {
    int i;
    //row column modify
    for(i = 0; i < 9; ++i) {
        struct cell & ref1 = vec.at((9*y) + i);
        if((!ref1.solved) && (ref1.cands.at(val) != 0)) {
            ref1.cands.at(val) = 0;
            --ref1.cands.at(0);
        }

        struct cell & ref2 = vec.at((9*i) + x);
        if((!ref2.solved) && (ref2.cands.at(val) != 0)) {
            ref2.cands.at(val) = 0;
            --ref2.cands.at(0);
        }
    }


    //block modify
    int j, kx, ky;
    kx = x -(x%3);
    ky = y -(y%3);
    for(i = kx; i < (kx + 3); ++i) {
        for(j = ky; j < (ky + 3); j++) {
            struct cell & ref = vec.at((9*j) + i);
            if((!ref.solved) && (ref.cands.at(val) != 0)) {
                ref.cands.at(val) = 0;
                --ref.cands.at(0);
            }
        }
    }

    return vec;
}
//set the used value "val" to "solved" before calling previous function

//solve------------------------------------------------------------

int Sudoku::solve(vector<struct cell> & vecRef) {
    //choose a  cell with the lowest number of values
    int cands = 20;
    int cellNum = 0;
    for(int i = 0; i < 81; ++i) {
        struct cell & cellRef = vecRef.at(i);
        if(!(cellRef.solved))
            if(cellRef.cands.at(0) < cands) {
                cands = cellRef.cands.at(0);
                cellNum = i;
            }
    }
    if(cands == 0) { // If there ae no candidadets the branch is unsolvable
        return 0;
    }
    if(cands == 20) {//If "cands" was not changed the puzzle is completed
        return 1;
    }

    int res = 0, cand = 1, candF;
    struct cell & cellRef = vecRef.at(cellNum);
    cellRef.solved = true;
    do {
        if(cand < 10)
            if(cellRef.cands.at(cand) != 0 ) {
                vector<struct cell> newVec(updateGrid(
                                               (cellNum%9),
                                               (cellNum/9),
                                               cellRef.cands.at(cand),
                                               vecRef));
                cellRef.cands.at(cand) = 0;
                if(res < 1) candF = cand;
                res += solve(newVec);
            }
        ++cand;
    } while((res < 2) && (cand < 10));

    if(res == 0) return 0;

    if(res >= 2) return 2;


    mtrx[cellNum%9][cellNum/9] =  candF;
    return 1;
}

int Sudoku::solve() {
    //validate grid
    int compAr[9] = {1,1,1,1,1,1,1,1,1};
    int i, j;


    //row check
    for(i = 0; i < 9; ++i) {
        for(j = 0; j < 9 ; ++j) {
            if(mtrx[i][j] != 0)
                --compAr[mtrx[i][j] - 1];
        }
        for(j = 0; j < 9 ; ++j) {
            if(compAr[j] == -1)
                return 0;
            compAr[j] = 1;
        }
    }

    //column check
    for(i = 0; i < 9; ++i) {
        for(j = 0; j < 9 ; ++j) {
            if(mtrx[j][i] != 0)
                --compAr[mtrx[j][i] - 1];
        }
        for(j = 0; j < 9 ; ++j) {
            if(compAr[j] == -1)
                return 0;
            compAr[j] = 1;
        }
    }

    //block check
    for(i = 0; i < 9; ++i) {
        int f = 27*(i/3) + 3*(i%3);
        for(j = (f%9); j < ((f%9) + 3); ++j)
            for(int k = f/9; k < ((f/9) + 3); ++k) {
                if(mtrx[j][k] != 0)
                    --compAr[mtrx[j][k] - 1];
            }
        for(j = 0; j < 9 ; ++j) {
            if(compAr[j] == -1)
                return 0;
            compAr[j] = 1;
        }
    }

    vector<struct cell> vec;
    vec = findClueGrid();
    return solve(vec);
}


//Generate------------------------------------------------------

bool Sudoku::cellValid(int x, int y) { //x and y values should be recieved as array index
    int compAr[9] = {0,0,0,0,0,0,0,0,0};
    int i;


    //row check
    for(i = 0; i < 9; ++i)
        if(mtrx[i][y]!= 0)
            ++compAr[mtrx[i][y] - 1];
    for(i = 0; i < 9; ++i) {
        if(compAr[i] > 1)
            return false;
        compAr[i] = 0;
    }

    //column check
    for(i = 0; i < 9; ++i)
        if(mtrx[x][i] != 0)
            ++compAr[mtrx[x][i] -1];
    for(i = 0; i < 9; ++i) {
        if(compAr[i] > 1)
            return false;
        compAr[i] = 0;
    }

    //block check
    int j, kx, ky;
    kx = x -(x%3);
    ky = y -(y%3);
    for(i = kx; i < (kx + 3); ++i)
        for(j = ky; j < (ky + 3); j++)
            if(mtrx[i][j] != 0)
                ++compAr[mtrx[i][j] - 1];

    for(i = 0; i < 9; ++i) {
        if(compAr[i] > 1)
            return false;
        compAr[i] = 0;
    }

    return true;

}

int Sudoku::generate(vector<struct cell> & vecRef) {
    //choose a  cell with the lowest number of values
    int cands = 20;
    int cellNum = 0;
    for(int i = 0; i < 81; ++i) {
        struct cell & cellRef = vecRef.at(i);
        if(!(cellRef.solved))
            if(cellRef.cands.at(0) < cands) {
                cands = cellRef.cands.at(0);
                cellNum = i;
            }
    }
    if(cands == 0) { // If there ae no candidadets the branch is unsolvable
        return 0;
    }
    if(cands == 20) {//If "cands" was not changed the puzzle is completed
        return 1;
    }

    int res = 0, cand = 1, candF;
    struct cell & cellRef = vecRef.at(cellNum);
    cellRef.solved = true;
    do {
        if(cand < 10)
            if(cellRef.cands.at(cand) != 0 ) {
                vector<struct cell> newVec(updateGrid(
                                               (cellNum%9),
                                               (cellNum/9),
                                               cellRef.cands.at(cand),
                                               vecRef));
                cellRef.cands.at(cand) = 0;
                if(res < 1) candF = cand;
                res += generate(newVec);
            }
        ++cand;
    } while((res != 1) && (cand < 10));

    if(res == 0) return 0;

    if(res >= 2) return 2;


    mtrx[cellNum%9][cellNum/9] =  candF;
    return 1;
}

void Sudoku::generate() {
    vector<struct cell> vec;
    srand(time(NULL));
    int x = 0, y = 0, i, n;
    bool cond = true;
    //fill sixteen random values
    for(i = 0; i < 16; ++i) {
        cond = true;
        do {
            x = rand()%9;
            y = rand()%9;
            mtrx[x][y] = rand()%9 + 1;
            cond = cellValid(x, y);
            if(!cond) mtrx[x][y] = 0;
        } while(!cond);
    }

    //solve one branch
    vec = findClueGrid();
    generate(vec);

    //delete some values
    n = rand()%21 + 10;
    for(i = 0; i < n; ++i) {
        do {
            x = rand()%9;
            y = rand()%9;
        } while(mtrx[x][y] == 0);
        mtrx[x][y] = 0;
    }
}








// Transform
void Sudoku::swapNum(int x, int y) {
    for(int i = 0; i < 9; ++i)
        for(int j = 0; j < 9; ++j) {
            if(mtrx[i][j] == x)
                mtrx[i][j] = y;
            if(mtrx[i][j] == y)
                mtrx[i][j] = x;
        }
}

void Sudoku::swapRow(int x, int y) {
    int temp;
    for(int i = 0; i < 9; ++i)
        for(int j = 0; j < 3; ++j) {
            temp = mtrx[i][j+(3*x)];
            mtrx[i][j+(3*x)] = mtrx[i][j+(3*y)];
            mtrx[i][j+(3*y)] = temp;
        }

}

void Sudoku::swapCol(int x, int y) {
    int temp;
    for(int i = 0; i < 3; ++i)
        for(int j = 0; j < 9; ++j) {
            temp = mtrx[i+(3*x)][j];
            mtrx[i+(3*x)][j] = mtrx[i+(3*y)][j];
            mtrx[i+(3*y)][j] = temp;
        }
}

void Sudoku::rotate(int x) {
    int newMtrx[9][9];
    x = x % 4;
    for(; x > 0; --x) {
        for(int i = 0; i < 9; ++i)
            for(int j = 0; j < 9; ++j) {
                newMtrx[8-j][i] = mtrx[i][j];
            }
        for(int i = 0; i < 9; ++i)
            for(int j = 0; j < 9; ++j) {
                mtrx[i][j] = newMtrx[i][j];
            }
    }
}

void Sudoku::flip(int x) {
    int temp;
    if(x == 0) {
        for(int i = 0; i < 9; ++i)
            for(int j = 0; j < 4; ++j) {
                temp = mtrx[i][j];
                mtrx[i][j] = mtrx[i][8-j];
                mtrx[i][8-j] = temp;
            }
    } else {
        for(int i = 0; i < 4; ++i)
            for(int j = 0; j < 9; ++j) {
                temp = mtrx[i][j];
                mtrx[i][j] = mtrx[8-i][j];
                mtrx[8-i][j] = temp;
            }
    }
}
