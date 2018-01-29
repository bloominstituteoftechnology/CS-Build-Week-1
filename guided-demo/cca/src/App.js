import React, { Component } from 'react';
import fs from 'fs';
import CCA from './cca';
import './App.css';


export let COLORS =  []


/**
 * CCA canvas
 */
class CCACanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    this.width = props.width;
    this.height = props.height;
    this.state = {colors: COLORS, left:true, up:true, right: true, down: true, count: 5};
    this.cca = new CCA(this.width, this.height, this, this.state);
    this.cca.randomize();   
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let width = this.width;
    let height = this.height;
    let cells = this.cca.getCells();

    let display = this.refs.display;
    let context = display.getContext('2d');
    let image = context.getImageData(0, 0, width, height);
    let index = 0;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {

        const color = cells[y][x];

        //Asign Color
        image.data[index] = COLORS[color][0]; //R
        image.data[index + 1] = COLORS[color][1]; //G
        image.data[index + 2] = COLORS[color][2]; //B
        image.data[index + 3] = 255; //A

        //Next Color
        index +=  4
      }
    }

    context.putImageData(image, 0, 0);

    this.cca.step();

    requestAnimationFrame(() => this.animFrame());
  }

  /**
   * Render
   */
  render() {
    return (
    <div className="display-wrapper">
      <div className="cca-wrapper">
        <canvas ref="display" id="canvas" width={this.width} height={this.height} />
        <Controls cca={this.cca} canvas={this}/>
      </div>
      <div className="display-color-list">
        {this.state.colors.map((color, i) => {
          return <div key={i}>{JSON.stringify(color)}</div>
        })}
      </div>
    </div>
    );
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {
  render = () => <CCACanvas width={300} height={300} />
}

class Controls extends Component {
  constructor(props){
    super();
    this.cca = props.cca;
    this.canvas = props.canvas;
  }

  render(){
    return (
      <div className="App-wrapper-cca-controls">
        <button style={this.canvas.state.left ? {background: 'green'} : {background: 'red'}} onClick={() => this.canvas.setState({left: !this.canvas.state.left})}>LEFT</button>
        <button style={this.canvas.state.up ? {background: 'green'} : {background: 'red'}} onClick={() => this.canvas.setState({up: !this.canvas.state.up})}>UP</button>
        <button style={this.canvas.state.right ? {background: 'green'} : {background: 'red'}} onClick={() => this.canvas.setState({right: !this.canvas.state.right})}>RIGHT</button>
        <button style={this.canvas.state.down ? {background: 'green'} : {background: 'red'}} onClick={() => this.canvas.setState({down: !this.canvas.state.down})}>DOWN</button>
        <button onClick={() => this.cca.clear()}> Clear</button>
        <input onChange={(e) => this.canvas.setState({count: e.target.value})} value={this.canvas.state.count} />
        <button  onClick={() => {COLORS = []; this.cca.randomize()}}> Randomize</button>
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
        <header className='App-header'><h1>LAMBDA SCHOOL: CCA</h1></header>
        <div className='App-wrapper'>
          <CCAApp />
        </div>
        <footer className='footer'> Copyright 2018 Track Seven Development </footer>
      </div>
    );
  }
}



export default App;