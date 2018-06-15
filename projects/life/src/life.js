// Implementation of Conway's game of Life

function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}
class Life {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.cells = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    this.currentBufferIdx = 0;
    this.clear();
  }

  getCells() {
    return this.cells[this.currentBufferIdx];
  }

  clear() {
    for (let row = 0; row < this.height; row++) {
      this.cells[this.currentBufferIdx][row].fill(0);
    }
  }

  randomize() {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        this.cells[this.currentBufferIdx][row][col] = (Math.random() * 2) | 0;
      }
    }
  }

  step() {
    let backBufferIndex = this.currentBufferIdx === 0 ? 1 : 0;
    let currentBuffer = this.cells[this.currentBufferIdx];
    let backBuffer = this.cells[backBufferIndex];

    function countNeighbors(col, row) {
      let neighborCount = 0;

      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        let rowPos = row + rowOffset;

        if (rowPos < 0 || rowPos === this.height) {
          continue;
        }

        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          let colPos = col + colOffset;

          if (colPos < 0 || colPos === this.width) {
            continue;
          }

          if (colOffset === 0 && rowOffset === 0) {
            continue;
          }

          neighborCount += currentBuffer[rowPos][colPos];
        }
      }

      return neighborCount;
    }

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let neighborCount = (countNeighbors.bind(this))(col, row);
        let currentCell = currentBuffer[row][col];

        if (currentCell === 1) {
          if (neighborCount < 2 || neighborCount > 3) {
            backBuffer[row][col] = 0;
          } else {
            backBuffer[row][col] = 1;
          }
        } else {
          if (neighborCount === 3) {
            backBuffer[row][col] = 1;
          } else {
            backBuffer[row][col] = 0;
          }
        }
      }
    }

    this.currentBufferIdx = this.currentBufferIdx === 0 ? 1 : 0;
  }
}

export default Life;
