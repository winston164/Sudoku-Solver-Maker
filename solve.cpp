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
    n = su.solve();
    vec = su.getMtrx();

    cout << n << endl;
    if(n == 1)
        for(int i = 0; i < 81; ++i){
            cout << vec.at(i);
            if((i%9) == 8){
                cout << endl;
            }else
            {
                cout << ' ';
            }
        
        }
        
    return 0;
}
