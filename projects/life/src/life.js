/**
 * Implementation of Conway's game of Life
 */
const MODULO = 8;
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
		// !!!! IMPLEMENT ME !!!!
		this.width = width;
		this.height = height;
		this.currentBufferIndex = 0;

		this.buffer = [Array2D(width, height), Array2D(width, height)];

		this.clear();
	}

	/**
	 * Return the current active buffer
	 *
	 * This should NOT be modified by the caller
	 */
	getCells() {
		// !!!! IMPLEMENT ME !!!!
		return this.buffer[this.currentBufferIndex];
	}

	/**
	 * Clear the life grid
	 */
	clear() {
		// !!!! IMPLEMENT ME !!!!
		for (let i = 0; i < this.height; i++) {
			this.buffer[this.currentBufferIndex][i].fill(0);
		}
	}

	/**
	 * Randomize the life grid
	 */
	randomize() {
		// !!!! IMPLEMENT ME !!!!
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				this.buffer[this.currentBufferIndex][i][j] = Math.floor(
					Math.random() * MODULO
				);
			}
		}
	}

	/**
	 * Run the simulation for a single step
	 */
	step() {
		// !!!! IMPLEMENT ME !!!!
		// Fill the offscreen buffer with the next life generation built
		// from the current buffer.

		let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
		let currentBuffer = this.buffer[this.currentBufferIndex];
		let backBuffer = this.buffer[backBufferIndex];

		/**
		 * Count the neighbors of a cell
		 */
		function countNeighbors(x, y) {
			let zombieCount = 0;

			// check west neighbor
			if (x > 0) {
				if (currentBuffer[y][x - 1] === 1) {
					zombieCount++;
				}
			}

			// north
			if (y > 0) {
				if (currentBuffer[y - 1][x] === 1) {
					zombieCount++;
				}
			}

			// east
			if (x < this.width - 1) {
				if (currentBuffer[y][x + 1] === 1) {
					zombieCount++;
				}
			}

			// south
			if (y < this.height - 1) {
				if (currentBuffer[y + 1][x] === 1) {
					zombieCount++;
				}
			}

			// check north west neighbor
			if (x > 0 && y > 0) {
				if (currentBuffer[y - 1][x - 1] === 1) {
					zombieCount++;
				}
			}

			// north east
			if (y > 0 && x < this.width - 1) {
				if (currentBuffer[y - 1][x + 1] === 1) {
					zombieCount++;
				}
			}

			// south east
			if (x < this.width - 1 && y < this.height - 1) {
				if (currentBuffer[y + 1][x + 1] === 1) {
					zombieCount++;
				}
			}

			// south west
			if (y < this.height - 1 && x > 0) {
				if (currentBuffer[y + 1][x - 1] === 1) {
					zombieCount++;
				}
			}

			return zombieCount;
		}

		// loop thru and decide the state of next gerneration for each cell processed
		for (let y = 0; y < this.height; y++) /* looping over height */ {
			for (let x = 0; x < this.width; x++) /* looping over width */ {
				let zombieCount = countNeighbors.bind(this)(x, y);
				// console.log(`zombieCount: ${zombieCount}`);

				let currentCell = currentBuffer[y][x];

				if (currentCell === 1) {
					if (zombieCount < 2 || zombieCount > 3) {
						backBuffer[y][x] = 0;
					} else {
						backBuffer[y][x] = 1;
					}
				} else {
					if (zombieCount === 3) {
						backBuffer[y][x] = 1;
					} else {
					}
					backBuffer[y][x] = 0;
				}
			}
		}
		this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
	}
}

export default Life;
