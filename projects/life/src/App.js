import React, { Component } from 'react';
import Life from './life';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [20, 255, 255],
]
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
    this.life.clear();
    this.life.randomize();
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
    if (this.props.randomize) {
      this.life.randomize();
      this.props.toggle({ target: { name: 'randomize'}} );
    }
    if (this.props.clear) {
      this.life.clear();
      this.props.toggle({ target: { name: 'clear'}} );
    }
    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');
    
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.life.getCells();
    
    let screenBuffer = imageData.data;
    
    for (let height = 0; height < this.props.height; height++) {
      for (let width = 0; width < this.props.width; width++) {
        
        let index = (height * this.props.width + width) * 4;
        
        let ccaStatus = cells[height][width];
        
        screenBuffer[index + 0] = COLORS[ccaStatus][0];
        screenBuffer[index + 1] = COLORS[ccaStatus][1];
        screenBuffer[index + 2] = COLORS[ccaStatus][2];
        screenBuffer[index + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0)
    
    this.life.step();

    // TODO: Work on stopping
    if (!this.props.running) {
      console.log(1);
      window.setTimeout(() => {
        if (this.props.running) requestAnimationFrame(() => (this.animFrame()));
      }, 2000);
    }

    if (this.props.running) {
      requestAnimationFrame(() => (this.animFrame()));
    }
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

/**
 * Life holder component
 */
class LifeApp extends Component {

  state = {
    isRunning: true,
    randomize: false,
    clear: false,
  }

  toggle = (e) => {
    const button = e.target.name;
    this.setState({[button]: !this.state[button] })
  }

  /**
   * Render
   */
  render() {
    this.toggle = this.toggle.bind(this);
    return (
      <div>
        <LifeCanvas width={400} height={300} toggle={this.toggle} running={this.state.isRunning} randomize={this.state.randomize} clear={this.state.clear} />
        <div>
          <button name="isRunning" className="button" onClick={this.toggle}>PLAY</button>
          <button name="randomize" className="button" onClick={this.toggle}>RANDOM</button>
          <button name="clear" className="button" onClick={this.toggle}>CLEAR</button>
        </div>
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
        <LifeApp />
      </div>
    );
  }
}

export default App;
