#include <iostream>
#include "sudoku.h"
#include <vector>
using namespace std;

int main() {
    vector<int> vec;
    Sudoku su;
    su.generate();
    vec = su.getMtrx();
    for(int i = 0; i < 81; ++i) {
        cout << vec.at(i);
        if((i%9) == 8) {
            cout << endl;
        } else {
            cout << ' ';
        }
    }

    return 0;
}
