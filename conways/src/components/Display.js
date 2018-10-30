import React, { Component } from 'react';
import Grid from './Grid';
import './components.css';

const width = 400;
const height = 400;

class Display extends Component {
    /**
     * Constructor
     */
    constructor() {
        super();

        this.continueAnimation = true;
        this.speed = 100;
        this.rows = 30;
        this.cols = 30;
        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
        }
    }

    /**
     * After the component has mounted
     */
    componentDidMount() {
        // Request initial animation frame
        requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        // this.onAnimFrame();
    }

    /**
     * When the component is about to unmount
     */
    componentWillUnmount() {
        // Stop animating
        this.continueAnimation = false;
    }

    /**
     * Called every frame of animation
     */

    onAnimFrame(timestamp) {
        // If desired, request another anim frame for later
        if (this.continueAnimation) {
            requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        }

        // TODO animate stuff
    }

    /**
     * Render the canvas
     */
    render() {
        return (
            <div>
                <canvas ref="canvas" width={width} height={height} />
                <Grid
                    grid={this.state.grid}
                    rows={this.rows}
                    cols={this.cols}
                    selectBox={this.selectBox}
                />
            </div>
        );
    }
}

export default Display;