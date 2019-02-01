import React, { Component } from 'react';

export default class Canvas extends Component {

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
        requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
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
        return <canvas background="green" ref="canvas" width="500" height="500" >hello</canvas>
    }
}