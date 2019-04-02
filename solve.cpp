#include <iostream>
#include <vector>
#include "sudoku.h"
using namespace std;

int main()
{
    Sudoku su;
    vector<int> vec;
    int n = 0;
    
    for(int i = 0; i < 81; i++){
        cin >> n;
        vec.push_back(n);
    }
    su.setMtrx(vec);
    cout << su.solve() << endl;
    vec = su.getMtrx();

    for(int i = 0; i < 81; ++i){
        cout << vec.at(i) << ' ';
        if((i%9) == 8)
        cout << endl;
    }
        
    return 0;
}
