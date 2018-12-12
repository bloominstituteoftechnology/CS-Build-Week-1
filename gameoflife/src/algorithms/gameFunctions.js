// import React, {Component} from "react";
// what react variable do you need to get to?

// checking the neighbord to see if they are alive
export const checkingNeighbors = () => {
  let neighbors = 0;

  if (y === 0 && x === 0) {
    // only check
    // E
    // SE
    // S
    neighbors += grid[y][x + 1]; // E
    neighbors += grid[y + 1][x + 1]; // SE
    neighbors += grid[y + 1][x]; // S

  } else if (y === 0 && x === grid[y].length) {
    // only check
    // W
    // SW
    // S

    neighbors += grid[y + 1][x]; // S
    neighbors += grid[y - 1][x - 1]; // SW
    neighbors += grid[y][x - 1]; // W
  } else if (y === grid.length && x === grid[y].length) {
    // only check
    // N
    // w
    // NW

    neighbors += grid[y - 1][x]; // N
    neighbors += grid[y][x - 1]; // W
    neighbors += grid[y - 1][x - 1]; // NW
  } else if (y === grid.length && x === 0) {
    // check
    // n
    // NE
    // E

    neighbors += grid[y - 1][x]; // N
    neighbors += grid[y - 1][x + 1]; // NE
    neighbors += grid[y][x + 1]; // E
  } else if (x === 0) {
    // only check
    // N  1, 0 (    x, y - 1)
    // NE 2, 0 (x + 1, y - 1)
    // E  2, 1 (x + 1,     y)
    // SE 2, 2 (x + 1, y + 1)
    // S  1, 2

    neighbors += grid[y - 1][x]; // N
    neighbors += grid[y - 1][x + 1]; // NE
    neighbors += grid[y][x + 1]; // E
    neighbors += grid[y + 1][x + 1]; // SE
    neighbors += grid[y + 1][x]; // S
  } else if (x === grid[y].length) {
    // S  1, 2
    // SW 0, 2
    // W  0, 1
    // NW 0, 0
    // N  1, 0 (    x, y - 1)

    neighbors += grid[y - 1][x]; // N
    neighbors += grid[y + 1][x]; // S
    neighbors += grid[y - 1][x - 1]; // SW
    neighbors += grid[y][x - 1]; // W
    neighbors += grid[y - 1][x - 1]; // NW
  } else if (y === grid.length) {
    // only check
    // W  0, 1
    // NW 0, 0
    // N  1, 0 (    x, y - 1)
    // NE 2, 0 (x + 1, y - 1)
    // E  2, 1 (x + 1,     y)

    neighbors += grid[y - 1][x]; // N
    neighbors += grid[y - 1][x + 1]; // NE
    neighbors += grid[y][x + 1]; // E
    neighbors += grid[y - 1][x - 1]; // NW
    neighbors += grid[y][x - 1]; // W
  } else if (y === 0) {
    // only check
    //     E  2, 1 (x + 1,     y)
    // SE 2, 2 (x + 1, y + 1)
    // S  1, 2
    // SW 0, 2
    // W  0, 1

    neighbors += grid[y][x + 1]; // E
    neighbors += grid[y + 1][x + 1]; // SE
    neighbors += grid[y + 1][x]; // S
    neighbors += grid[y - 1][x - 1]; // SW
    neighbors += grid[y][x - 1]; // W
  } else {
    // check all of them
    neighbors += grid[y - 1][x]; // N
    neighbors += grid[y - 1][x + 1]; // NE
    neighbors += grid[y][x + 1]; // E
    neighbors += grid[y + 1][x + 1]; // SE
    neighbors += grid[y + 1][x]; // S
    neighbors += grid[y - 1][x - 1]; // SW
    neighbors += grid[y][x - 1]; // W
    neighbors += grid[y - 1][x - 1]; // NW
  }

  // checkingNeighbors();
  // if they are 1 they are neighbors

};


// implementing four rules algo
export const fourRules = () => {
  // Any live cell with fewer than two live neighbors dies, as if by underpopulation
  //Any live cell with two or three live neighbors lives on to the next generation.
  // Any live cell with more than three live neighbors dies, as if by overpopulation
  // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
};
