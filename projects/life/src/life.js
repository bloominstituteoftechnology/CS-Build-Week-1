/**
 * Implementation of Conway's game of Life
 */

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
    }

    /**
     * Randomize the life grid
     */
    randomize() {
        // !!!! IMPLEMENT ME !!!!
    }

    /**
     * Run the simulation for a single step
     */
    step() {
        // !!!! IMPLEMENT ME !!!!
    }
}

export default Life;
