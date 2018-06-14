/**
 * Implementation of Conway's game of Life
 */
const MODULO = 2;
/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
    //NOTE:  Iterate through Array2D row first then column
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
        // !!!! IMPLEMENT ME !!!!
        this.width = width;
        this.height = height;

        this.cells = [Array2D(width, height), Array2D(width, height)];

        this.currentBufferIndex = 0;

        this.randomize();

        this.clear();
    }

    /**
     * Return the current active buffer
     *
     * This should NOT be modified by the caller
     */
    getCells() {
        // !!!! IMPLEMENT ME !!!!
        return this.cells[this.currentBufferIndex];
    }

    /**
     * Clear the life grid
     */
    clear() {
        // !!!! IMPLEMENT ME !!!!
        for (let y = 0; y < this.height; y++) {
            this.cells[this.currentBufferIndex][y].fill(0);
        }
    }

    /**
     * Randomize the life grid
     */
    randomize() {
        // !!!! IMPLEMENT ME !!!!
        for (let height = 0; height < this.height; height++) {
            for (let width = 0; width < this.width; width++) {
                this.cells[this.currentBufferIndex][height][width] = (Math.random() * MODULO) | 0;
            }
        }
    }

    /**
     * Run the simulation for a single step
     */
    step() {
        // !!!! IMPLEMENT ME !!!!
        let currentBuffer = this.cells[this.currentBufferIndex];
        let backBuffer = this.cells[this.currentBufferIndex === 0 ? 1 : 0];

        function countNeighbors(row, col) {
            let neighborCount = 0;
            // treat neighbors of the grid as dead ones
            for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
                let rowPos = row + rowOffset;

                // check for out of bounds
                if (rowPos < 0 || rowPos === this.height) {
                    continue;
                }

                for (let colOffset = -1; colOffset <= 1; colOffset++) {
                    let colPos = col + colOffset;

                    // check for out of bounds
                    if (colPos < 0 || colPos === this.width) {
                        continue;
                    }

                    // dont count this cell
                    if (colOffset === 0 && rowOffset === 0) {
                        neighborCount++;
                    }
                }
                return neighborCount;
            }
            // check to make sure if in bounds
            for (let h = 0; h < this.height; h++) {
                for (let w = 0; w < this.width; w++) {
                    let neighborCount = countNeighbors.call(this, h, w);
                    // cell is currently alive
                    if (currentBuffer[h][w] === 1) {
                        if (neighborCount < 2 || neighborCount > 3) {
                            backBuffer[h][w] = 0;
                        } else {
                            backBuffer[h][w] = 1;
                        }
                        // cell is currently dead
                    } else {
                        if (neighborCount === 3) {
                            backBuffer[h][w] = currentBuffer[h][w];
                        } else {
                            backBuffer[h][w] = 0;
                        }
                    }
                }
            }
            this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
        }
    }
}

export default Life;
