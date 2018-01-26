/**
 * Implemention of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {
  /**
   * Constructor
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.buffer = [Array2D(width, height), Array2D(width, height)];
    this.activeBufferIdx = 0;

    this.clear();
  }

  /**
   * Return the current active buffer
   *
   * This should NOT be modified by the caller
   */
  getCells() {
    return this.buffer[this.activeBufferIdx];
  }

  /**
   * Clear the life grid
   */
  clear() {
    this.buffer[this.activeBufferIdx] = this.buffer[this.activeBufferIdx].map(
      row => row.fill(0)
    );
  }

  /**
   * Randomize the life grid
   */
  randomize() {
    this.buffer[this.activeBufferIdx] = this.buffer[this.activeBufferIdx].map(
      row => row.map(cell => (cell = Math.round(Math.random())))
    );
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    const workBuffIdx = this.activeBufferIdx === 0 ? 1 : 0;
    const workBuffer = this.buffer[workBuffIdx];
    const activeBuffer = this.buffer[this.activeBufferIdx];

    const checkNeighbors = (x, y, buffer) => {
      let neighbors = 0;
      let up = y - 1;
      let down = y + 1;
      let left = x - 1;
      let right = x + 1;

      // If at an edge wrap to the opposite side
      if (up < 0) {
        up = buffer.length - 1;
      }

      if (down === buffer.length) {
        down = 0;
      }

      if (left < 0) {
        left = buffer[y].length - 1;
      }

      if (right === buffer[y].length) {
        right = 0;
      }

      neighbors =
        buffer[up][left] +
        buffer[up][x] +
        buffer[up][right] +
        buffer[y][left] +
        buffer[y][right] +
        buffer[down][left] +
        buffer[down][right] +
        buffer[down][x];

      return neighbors;
    };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let liveNeighbors = checkNeighbors(x, y, activeBuffer);

        if (activeBuffer[y][x] === 1) {
          if (liveNeighbors === 2 || liveNeighbors === 3) {
            workBuffer[y][x] = 1;
          } else {
            workBuffer[y][x] = 0;
          }
        } else {
          if (liveNeighbors === 3) {
            workBuffer[y][x] = 1;
          } else {
            workBuffer[y][x] = 0;
          }
        }
      }
    }

    this.activeBufferIdx = this.activeBufferIdx === 0 ? 1 : 0;
  }
}

export default Life;
