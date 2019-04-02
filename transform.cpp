#include <iostream>
#include <vector>
#include "sudoku.h"
using namespace std;

int main(){
    Sudoku su;
    int n, x, y;
    vector<int> vec;
    
    //get Matrix
    for(int i = 0; i < 81; ++i){
        cin >> n;
        vec.push_back(n);
    }
    su.setMtrx(vec);

    //get comand
    while(cin >> n){
        switch (n)
        {
            case 1:
                cin >> x >> y;
                su.swapNum(x,y);
                break;

            case 2:
                cin >> x >> y;
                su.swapRow(x,y);
                break;
            
            case 3:
                cin >> x >> y;
                su.swapCol(x,y);
                break;
            
            case 4:
                cin >> x;
                su.rotate(x);
                break;

            case 5:
                cin >> x;
                su.flip(x);
                break;
            
            case 0:
                vec = su.getMtrx();
                for(int i = 0; i < 81; ++i){
                    cout << vec.at(i) << ' ';
                    if((i%9) == 8)
                        cout << endl;
                }
                return 0;
                break;
            
            default:
                break;
        }
    }

    return 0;
}
