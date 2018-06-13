import React, { Component } from "react";
import Life from "./life";
import "./App.css";

/**
 * Life canvas
 */
class LifeCanvas extends Component {
    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.life = new Life(props.width, props.height);
        this.life.randomize();
    }

    /**
     * Component did mount
     */
    componentDidMount() {
        requestAnimationFrame(() => {
            this.animFrame();
        });
    }

    /**
     * Handle an animation frame
     */
    animFrame() {
        //
        // !!!! IMPLEMENT ME !!!!
        //
        const width = this.props.width;
        const height = this.props.height;

        // Get canvas framebuffer, a packed RGBA array
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, width, height);

        /** 
        * JUST TO MAKE SURE DRAWING IS POSSIBLE
        const screenBuffer = imageData.data;
        for (let i = 0; i < 40000; i += 4) {
            screenBuffer[i + 0] = 0; // Red
            screenBuffer[i + 1] = 0; // Green
            screenBuffer[i + 2] = 0; // Blue
            screenBuffer[i + 3] = 255; // Alpha
        }
        */

        // Update life and get cells
        // const cells = this.life.getCells()
        // Convert the cell values into white or black for the canvas
        // Next generation of life

        // Put the new image data back on the canvas
        ctx.putImageData(imageData, 0, 0);

        // Request another animation frame
        requestAnimationFrame(() => {
            this.animFrame();
        });
    }

    /**
     * Render
     */
    render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} />;
    }
}

/**
 * Life holder component
 */
class LifeApp extends Component {
    /**
     * Render
     */
    render() {
        return (
            <div>
                <LifeCanvas width={400} height={300} />
            </div>
        );
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
                <LifeApp />
            </div>
        );
    }
}

export default App;
