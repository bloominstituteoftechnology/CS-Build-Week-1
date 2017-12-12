function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width).fill(0);
  }

  return a.map(row => row.map(() => 0));
}

class Life {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.currentBufferIndex = 0;
    this.buffer = [
      Array2D(width, height),
      Array2D(width, height)
    ];
    this.clear();
  }
  getCells() {
    return this.buffer[this.currentBufferIndex];
  }
  clear() {
    for (let y = 0; y < this.height; y++) {
      this.buffer[this.currentBufferIndex][y].fill(0);
    }
  }
  randomize() {
    this.buffer[this.currentBufferIndex] = this.buffer[this.currentBufferIndex].map(row => row.map(value => Math.random() < .85 ? 0 : 1));
  }
  addGlider() {
    const startX = Math.round((this.width - 10) * Math.random()) + 5;
    const startY = Math.round((this.height - 10) * Math.random()) + 5;
    this.buffer[this.currentBufferIndex][startY - 2][startX] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX - 2] = 1;
    this.buffer[this.currentBufferIndex][startY][startX] = 1;
    this.buffer[this.currentBufferIndex][startY][startX - 1] = 1;
  }
  addGun() {
    const startX = Math.round((this.width - 40) * Math.random()) + 2;
    const startY = Math.round((this.height - 15) * Math.random()) + 5;
    this.buffer[this.currentBufferIndex][startY][startX] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX] = 1;
    this.buffer[this.currentBufferIndex][startY][startX - 1] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX - 1] = 1;
    this.buffer[this.currentBufferIndex][startY][startX + 9] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX + 9] = 1;
    this.buffer[this.currentBufferIndex][startY + 1][startX + 9] = 1;
    this.buffer[this.currentBufferIndex][startY - 2][startX + 10] = 1;
    this.buffer[this.currentBufferIndex][startY + 2][startX + 10] = 1;
    this.buffer[this.currentBufferIndex][startY - 3][startX + 11] = 1;
    this.buffer[this.currentBufferIndex][startY + 3][startX + 11] = 1;
    this.buffer[this.currentBufferIndex][startY - 3][startX + 12] = 1;
    this.buffer[this.currentBufferIndex][startY + 3][startX + 12] = 1;
    this.buffer[this.currentBufferIndex][startY][startX + 13] = 1;
    this.buffer[this.currentBufferIndex][startY - 2][startX + 14] = 1;
    this.buffer[this.currentBufferIndex][startY - 2][startX + 14] = 1;
    this.buffer[this.currentBufferIndex][startY][startX + 15] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX + 15] = 1;
    this.buffer[this.currentBufferIndex][startY + 1][startX + 15] = 1;
    this.buffer[this.currentBufferIndex][startY][startX + 16] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX + 19] = 1;
    this.buffer[this.currentBufferIndex][startY - 2][startX + 19] = 1;
    this.buffer[this.currentBufferIndex][startY - 3][startX + 19] = 1;
    this.buffer[this.currentBufferIndex][startY - 1][startX + 20] = 1;
    this.buffer[this.currentBufferIndex][startY - 2][startX + 20] = 1;
    this.buffer[this.currentBufferIndex][startY - 3][startX + 20] = 1;
    this.buffer[this.currentBufferIndex][startY][startX + 21] = 1;
    this.buffer[this.currentBufferIndex][startY - 4][startX + 21] = 1;
    this.buffer[this.currentBufferIndex][startY][startX + 23] = 1;
    this.buffer[this.currentBufferIndex][startY - 4][startX + 23] = 1;
    this.buffer[this.currentBufferIndex][startY - 5][startX + 23] = 1;
    this.buffer[this.currentBufferIndex][startY + 1][startX + 23] = 1;
    this.buffer[this.currentBufferIndex][startY - 2][startX + 33] = 1;
    this.buffer[this.currentBufferIndex][startY - 3][startX + 33] = 1;
    this.buffer[this.currentBufferIndex][startY - 2][startX + 34] = 1;
    this.buffer[this.currentBufferIndex][startY - 3][startX + 34] = 1;
  }
  step() {
    const countNeighbors = (x, y) => {
      let neighbors = 0;
      if (y > 0 && this.buffer[this.currentBufferIndex][y - 1][x]) neighbors++;
      if (y < this.height - 1 && this.buffer[this.currentBufferIndex][y + 1][x]) neighbors++;
      if (x > 0 && this.buffer[this.currentBufferIndex][y][x - 1]) neighbors++;
      if (x < this.width - 1 && this.buffer[this.currentBufferIndex][y][x + 1]) neighbors++;
      if (x > 0 && y > 0 && this.buffer[this.currentBufferIndex][y - 1][x - 1]) neighbors++;
      if (y > 0 && x < this.width - 1 && this.buffer[this.currentBufferIndex][y - 1][x + 1]) neighbors++;
      if (x > 0 && y < this.height - 1 && this.buffer[this.currentBufferIndex][y + 1][x - 1]) neighbors++;
      if (x < this.width - 1 && y < this.height - 1 && this.buffer[this.currentBufferIndex][y + 1][x + 1]) neighbors++;
      return neighbors;
    }
    const backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    this.buffer[backBufferIndex] = this.buffer[backBufferIndex].map((row, y) => row.map((val, x) => {
      const neighbors = countNeighbors(x, y);
      if (neighbors === 3) return 1;
      if (this.buffer[this.currentBufferIndex][y][x] && neighbors === 2) return 1;
      return 0;
    }));
    this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;