function make2DArray(cols, rows) {
  let arr = new Array(cols);
  //change below to use map perhaps
  for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols = 15;
let rows = 15;

function setup() {
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++)
  {
      for (let j = 0; j < rows; j++)
      {
          grid[i][j] = Math.round(Math.random());
      }
  } 
}
