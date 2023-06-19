mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct Sudoku {
    grid: Vec<i8>
}

#[wasm_bindgen]
impl Sudoku {
    pub fn new() -> Sudoku {
        let grid = (0..81)
            .map(|_| 0)
            .collect();

        Sudoku {
            grid
        }
    }

    pub fn get(&self, row: u32, col: u32) -> i8 {
        let idx = (row * 9 + col) as usize;
        match self.grid.get(idx) {
            Some(&val) => val,
            None => -1
        }
    }
}

#[wasm_bindgen]
pub fn greet() -> i32 {
    0
}
