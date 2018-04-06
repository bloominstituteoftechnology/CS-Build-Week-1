/**
 * Implemention of Conway's game of Life
 */

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) { // array/grid creation function
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

        this.currentBufferIndex = 0; // set current grid variable in this.buffer array 

        // Allocate the double buffer
        this.buffer = [ // array of two grids
            Array2D(width, height), // 0
            Array2D(width, height) // 1
        ];

        this.clear();
    }

    /**
     * Return the current active buffer
     * 
     * This should NOT be modified by the caller
     */
    getCells() {
        return this.buffer[this.currentBufferIndex]; // return which grid is in use
    }

    /**
     * Clear the life grid
     */
    clear() {
        for (let y = 0; y < this.height; y++) {
            this.buffer[this.currentBufferIndex][y].fill(0); // clear the current grids values and set to 0 / .fill takes care of the x values for every y column
        } // .fill: method fills all elements of an array from stat index to end index 
    }

    /**
     * Randomize the life grid
     */
    randomize() { // randomize current grid and fill it with 0s and 1s which will be converted to black and white in the app.js file
        let buffer = this.buffer[this.currentBufferIndex];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                buffer[y][x] = Math.floor(Math.random() * 2); // 2 for two colors
            } // math.random returns value from 0 to 1, need to multiply by 2 in order to get number above 1 since math.floor rounds down
        }
    }

    /**
     * Run the simulation for a single step
     */
    step() {
        // Fill the offscreen buffer with the next life generation built
        // from the current buffer.

        let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0; // toggle between two grids
        let currentBuffer = this.buffer[this.currentBufferIndex]; //
        let backBuffer = this.buffer[backBufferIndex];

        /**
         * Count the neighbors of a cell
         */
        const countNeighbors = (x, y, options = { border: 'wrap' }) => { // add options object
            let neighborCount = 0;

            if (options.border === 'wrap') {
                // count neighbors, wrapping around the edges
                // refer to directions relative to the cell we are checking
                let north = y - 1;
                let south = y + 1;
                let west = x - 1;
                let east = x + 1;

                // if we're outside boundaries of grid, come back the opposite side
                if (north < 0) { // if we've reached the top
                    north = this.height - 1; // go to the bottom 
                }

                if (south > this.height - 1) { // if we've reached the very bottom
                    south = 0; // go back up to the top
                }

                if (west < 0) { // if we've reached the start
                    west = this.width - 1; // go to the end
                }

                if (east > this.width - 1) { // if we've reached the end
                    east = 0; // go back to the start
                }

                // count neighbors of current grid, 1 represents living neighbor, 0 represents dead
                neighborCount =
                    currentBuffer[north][west] +
                    currentBuffer[north][x] +
                    currentBuffer[north][east] +
                    currentBuffer[y][west] +
                    currentBuffer[y][east] +
                    currentBuffer[south][west] +
                    currentBuffer[south][x] +
                    currentBuffer[south][east];

                // alternative solution
                // } else if (options.border === 'nowrap') {

                //     // Treat out of bounds as zero
                //     for (let yOffset = -1; yOffset <= 1; yOffset++) {
                //         let yPos = y + yOffset;

                //         if (yPos < 0 || yPos === this.height) {
                //             // Out of bounds
                //             continue;
                //         }

                //         for (let xOffset = -1; xOffset <= 1; xOffset++) {
                //             let xPos = x + xOffset;

                //             if (xPos < 0 || xPos === this.width) {
                //                 // Out of bounds
                //                 continue;
                //             }

                //             // Don't count center element
                //             if (xOffset === 0 && yOffset === 0) {
                //                 continue;
                //             }

                //             neighborCount += currentBuffer[yPos][xPos];
                //         }
                //     }

            } else {
                throw new Error('unknown border option' + options.border);
            }

            return neighborCount;

        }

        // Loop through and decide if the next generation is alive or dead for each cell processed.
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {

                let neighborCount = countNeighbors(x, y); // count neighbors

                let thisCell = currentBuffer[y][x]; // get current cell to check if it's 1 or 0

                // set logic of whether or not a cell is dead or alive based on neighbors 
                if (thisCell === 1) { // cell is alive
                    if (neighborCount < 2 || neighborCount > 3) { // has less than two and greater than 3 neighbors
                        backBuffer[y][x] = 0; // cell dies
                    } else { // has 2 or 3 neighbors
                        backBuffer[y][x] = 1; // cell lives on
                    }
                } else { // cell is dead
                    if (neighborCount === 3) { // neighbor count is equal to 3
                        backBuffer[y][x] = 1; // cell lives
                    } else { // neighbor count not equal to 3
                        backBuffer[y][x] = 0; // stays dead
                    }
                }
            }
        }

        // Now the backBuffer is populated with the next generation life
        // data. So we declare that to be the new current buffer.
        this.currentBufferIndex = backBufferIndex;
    }
}

export default Life;