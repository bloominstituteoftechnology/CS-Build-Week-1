/**
 * Implemention of a CCA
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
 * CCA class
 */
class CCA {

    /**
     * Constructor
     */
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

    /**
     * Return the current active buffer
     *
     * This should NOT be modified by the caller
     */
    getCells() {
        return this.buffer[this.currentBufferIndex];
    }

    /**
     * Clear the cca grid of the current active buffer
     */
    clear() {
        for (let y = 0; y < this.height; y++) {
            this.buffer[this.currentBufferIndex][y].fill(0);
        }
    }

    /**
     * Randomize the cca grid (values 0-7)
     */
    randomize() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const rand = Math.floor(Math.random() * MODULO);
                this.buffer[this.currentBufferIndex][y][x] = rand;
            }
        }
    }

    /**
     * Run the simulation for a single step
     */
    step() {
        // Fill the offscreen buffer with the next cca generation built
        // from the current buffer.

        let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
        let currentBuffer = this.buffer[this.currentBufferIndex];
        let backBuffer = this.buffer[backBufferIndex];

        // See if we have a neighbor to infect this one
        function hasInfectiousNeighbor(x, y) {
            const nextValue = (currentBuffer[y][x] + 1) % MODULO;

            // Check the west neighbor of cell x, y
            /*if (x > 0) {
                if (currentBuffer[y][x - 1] === nextValue) {
                    return true;
                }
            }*/

            // North
            if (y > 0) {
                if (currentBuffer[y - 1][x] === nextValue) {
                    return true;
                }
            }

            // East
            if (x < this.width - 1) {
                if (currentBuffer[y][x + 1] === nextValue) {
                    return true;
                }
            }

            // South
            if (y < this.height - 1) {
                if (currentBuffer[y + 1][x] === nextValue) {
                    return true;
                }
            }

            // If we've made it this far we're not infected!
            return false;
        }

        // Loop through and decide the state of the next generation
        // for each cell processed.
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (hasInfectiousNeighbor.call(this, x, y)) {
                    backBuffer[y][x] = (currentBuffer[y][x] + 1) % MODULO;
                } else {
                    backBuffer[y][x] = currentBuffer[y][x];
                }
            }
        }

        this.currentBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
    }
}

export default CCA;

import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
    [0, 0, 0],
    [0x8f, 0, 0x5f],
    [0x5f, 0, 0x8f],
    [0, 0, 0xff],
    [0, 0x5f, 0x7f],
    [0x5f, 0x8f, 0x7f],
    [0x8f, 0xff, 0x7f],
    [0xff, 0x5f, 0x7f],
]

/**
 * CCA canvas
 */
class CCACanvas extends Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.cca = new CCA(props.width, props.height);
        this.cca.randomize();
    }

    /**
     * Component did mount
     */
    componentDidMount() {
        requestAnimationFrame(() => {this.animFrame()});
    }

    /**
     * Handle an animation frame
     */
    animFrame() {
        const cells = this.cca.getCells();
        const height = this.props.height;
        const width = this.props.width;

        // Get canvas framebuffer, a packed RGBA array
        const canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, width, height);

        // Update the imageData based on the cells
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const state = cells[y][x];
                const color = COLORS[state];
                const index = (y * width + x) * 4;

                imageData.data[index + 0] = color[0]  // red
                imageData.data[index + 1] = color[1]  // green
                imageData.data[index + 2] = color[2]  // blue
                imageData.data[index + 3] = 0xff  // alpha, 0xff === 255 === opaque
            }
        }

        // Put the new image data back on the canvas
        ctx.putImageData(imageData, 0, 0);

        // Iterate the game state!
        this.cca.step();

        // Request another animation frame
        requestAnimationFrame(() => {this.animFrame()});
    }

    /**
     * Render
     */
    render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {

    /**
     * Render
     */
    render() {
        return (
                <div>
                <CCACanvas width={400} height={300} />
                </div>
        )
    }
}

/**
 * Outer App component
 */
class App extends Component {

    /**
     * Render
     */
    render() {
        return (
                <div className="App">
                <CCAApp />
                </div>
        );
    }
}

export default App;


Add Comment