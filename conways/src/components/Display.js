import React, { Component } from 'react';

const width = 400;
const height = 400;

class Display extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.continueAnimation = true;
    }

    /**
     * After the component has mounted
     */
    componentDidMount() {
        // Request initial animation frame
        // requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        this.animFrame();
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
    animFrame() {
        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Here is the screen buffer array we can manipulate:

        let screenBuffer = imageData.data;
        console.log('imageData in animFrame: ', screenBuffer);
    }
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
            <canvas ref="canvas" width={width} height={height} />
        );
    }
}

export default Display;