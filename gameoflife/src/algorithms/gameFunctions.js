// Our main function
// Create a new array to output (output parray)
// We are going to iterate over every cell in the 2-D array
// For each cell, we will check how many of its neighbors are alive
// ---your checkingNeighbors function will be here
// Based on the number of neighbors are alive, we will change the state of the current cell
// If cell is alive and there are less than 2 or more than 3 alive neighbors, it dies
// If cell is dead and there are exactly 3 alive neighbors, it lives
// Else, do not change the state of the current cell
// --Four rules function goes here
// Put results of fourRules into the output array
// Return output array

// checking the neighbord to see if they are alive
export const checkingNeighbors = (grid, x, y) => {
    console.log(`x: ${x} y: ${y}`);
    let neighbors = 0;

    const north = grid[y - 1][x];
    const east = grid[y][x + 1];
    const northEast = grid[y - 1][x + 1];
    const southEast = grid[y + 1][x + 1];
    const south = grid[y + 1][x];
    const southWest = grid[y - 1][x - 1];
    const west = grid[y][x - 1];
    const northWest = grid[y - 1][x - 1];
    
  if (y === 0 && x === 0) { //checks top left corner
    // only check
    // E
    // SE
    // S
    neighbors += east // E
    neighbors += southEast // SE
    neighbors += south // S
  } else if (y === 0 && x === grid[0].length - 1) { //top right corner
    // only check
    // W
    // SW
    // S

    neighbors += south // S
    neighbors += southWest // SW
    neighbors += west // W

  } else if (y === grid.length - 1 && x === grid[0].length - 1) { //bottom right corner
    // only check
    // N
    // w
    // NW
    neighbors +=  north // N
    neighbors +=  west// W
    neighbors +=  northWest// NW
  } else if (y === grid.length - 1 && x === 0) {// bottom left corner
    // check
    // n
    // NE
    // E

    neighbors += north // N
    neighbors +=  northEast// NE
    neighbors += east // E
  } else if (x === 0) { // left side
    // only check
    // N  1, 0 (    x, y - 1)
    // NE 2, 0 (x + 1, y - 1)
    // E  2, 1 (x + 1,     y)
    // SE 2, 2 (x + 1, y + 1)
    // S  1, 2

    neighbors += north // N
    neighbors += northEast // NE
    neighbors += east // E
    neighbors += southEast // SE
    neighbors += south // S

} else if (x === grid[0].length - 1) { //right side 
    // S  1, 2
    // SW 0, 2
    // W  0, 1
    // NW 0, 0
    // N  1, 0 (    x, y - 1)

    neighbors += north // N
    neighbors += south // S
    neighbors += southWest // SW
    neighbors += west // W
    neighbors += northWest // NW
  
} else if (y === grid.length - 1) { // south/bottom side 
    // only check
    // W  0, 1
    // NW 0, 0
    // N  1, 0 (    x, y - 1)
    // NE 2, 0 (x + 1, y - 1)
    // E  2, 1 (x + 1,     y)

    neighbors += north // N
    neighbors += northEast // NE
    neighbors += east // E
    neighbors += northWest // NW
    neighbors += west // W

  } else if (y === 0) { //north/top side
    // only check
    //     E  2, 1 (x + 1,     y)
    // SE 2, 2 (x + 1, y + 1)
    // S  1, 2
    // SW 0, 2
    // W  0, 1
    neighbors += east // E
    neighbors += southEast // SE
    neighbors += south // S
  } else {
    // check all of them
    console.log("ERROR THREAT");
    neighbors += north // N
    neighbors += northEast // NE
    neighbors += east // E
    neighbors += southEast // SE
    neighbors += south // S
    neighbors += southWest // SW
    neighbors += west // W
    neighbors += northWest // NW
  }

  return neighbors; // this will return a number
  // checkingNeighbors();
  // if they are 1 they are neighbors
};

// implementing four rules algo
// Any live cell with fewer than two live neighbors dies, as if by underpopulation
//Any live cell with two or three live neighbors lives on to the next generation.
// Any live cell with more than three live neighbors dies, as if by overpopulation
// Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.


// possibly use map nested in the for loop to output another array
export const fourRules = (grid) => {
  // create new output array, and will alternate between arrays
  let newGrid = [...Array(15)].map(e => Array(15).fill(0));
  let neighbors = 0;
  // iterate over every cell in the arrays
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      // each cell, check how many neighbors are alive
      neighbors = checkingNeighbors(grid, x, y);
      // if 2 or less that cell will die && if more than three
      if (neighbors <= 2 || neighbors > 3) {
        newGrid[y][x] = 0;
      }
      // if 3 exactly then that cell will live/become alive
      if (neighbors === 3) {
        newGrid[y][x] = 1;
      }
      // else don't change the state of the current cell
    }
  }

  return newGrid;
};
