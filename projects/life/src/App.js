import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [[0, 0, 0], [0x00, 0x00, 0x00]];

/**
 * Life canvas
 */
class LifeCanvas extends Component {
    /**
     * Constructor
     */

    //motion = true;

    constructor(props) {
        super(props);

        this.life = new Life(props.width, props.height);
        this.life.randomize();
        this.state = {motion: true};

        this.dropBomb = this.dropBomb.bind(this);
        this.sterlize = this.sterlize.bind(this);
        this.Assimilation = this.Assimilation.bind(this);
        this.random = this.random.bind(this);
        this.clearTheGrid = this.clearTheGrid.bind(this);
    }

    /**
     * Component did mount
     */
    componentDidMount() {
        requestAnimationFrame(() => {
            this.animFrame();
        });
    }

    dropBomb(e) {
        this.life.dropBomb();
        COLORS[1] = [0x00, 0xff, 0x37];
        console.log('clicked!!!!!');
    }

    random(e) {
      this.life.randomize();
      COLORS[1] = [0x00, 0xff, 0x36];
      console.log('clicked!!!!!');
  }

    sterlize(e) {
        this.life.sterlize();
        COLORS[1] = [0x9E, 0x59, 0xF0];
        console.log('clicked!!!!!');
    }

    Assimilation(e) {
        this.life.Assimilation();
        COLORS[1] = [0x0E, 0xD3, 0x6D];
        console.log('clicked!!!!!');
    }

    clearTheGrid(e) {
      this.life.clear();
      COLORS[1] = [0x0E, 0xD3, 0x6D];
      console.log('clicked!!!!!');
  }

  onClickMotion = (e) => {
    if (this.state.motion) {
      this.setState({ motion: false });
    } else {
      this.setState({ motion: true });
    }
  }

    /**
     * Handle an animation frame
     */
    animFrame() {
        const cells = this.life.getCells();
        const height = this.props.height;
        const width = this.props.width;

        // Get canvas framebuffer, a packed RGBA array
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        canvas.style.width = canvas.width * 2 + 'px';
        canvas.style.height = canvas.height * 2 + 'px';
        let imageData = ctx.getImageData(0, 0, width, height);

        // Convert the cell values into white or black for the canvas
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const state = cells[y][x];
                const color = COLORS[state];
                const index = (y * width + x) * 4;

                imageData.data[index + 0] = color[0]; // Red
                imageData.data[index + 1] = color[1]; // Blue
                imageData.data[index + 2] = color[2]; // Green
                imageData.data[index + 3] = 0xff; // Alpha, 0xff === 255 === opaque
            }
        }

        // Put the new image data back on the canvas
        ctx.putImageData(imageData, 0, 0);

        // Update life and get cells
        if (this.state.motion) {
          this.life.step();
        }

        // Request another animation frame
        requestAnimationFrame(() => {
            this.animFrame();
        });
        // Next generation of life
    }

    /**
     * Render
     */
    render() {
      return (
        <div className="App-header">
        <button onClick={this.random} >Randomize!</button>
        <button onClick={this.onClickMotion}>{this.state.motion ? 'Stop!' : 'Start!'}</button>
        <button onClick={this.dropBomb}>Bomb!</button>
        <button onClick={this.Assimilation}>Assimiltate!</button>
        <button onClick={this.sterlize}>Sterilize!</button>
        <button onClick={this.clearTheGrid}>Clear!</button>
                <div className="App">
                <canvas
                    ref="canvas"
                    width={this.props.width}
                    height={this.props.height}
                />
                </div>
            </div>
        );
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
                <LifeCanvas width={300} height={300} />
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