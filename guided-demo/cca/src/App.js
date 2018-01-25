import React, { Component } from 'react';
<<<<<<< HEAD
import fs from 'fs';
import CCA from './cca';
import './App.css';


export const COLORS =  []

=======
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
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877

/**
 * CCA canvas
 */
class CCACanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.width = props.width;
    this.height = props.height;
    this.cca = new CCA(this.width, this.height, this);
    this.cca.randomize();
    this.state = {colors: COLORS}
   
=======
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
  }

  /**
   * Component did mount
   */
  componentDidMount() {
<<<<<<< HEAD
    requestAnimationFrame(() => this.animFrame());
=======
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
<<<<<<< HEAD
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
=======
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
  }

  /**
   * Render
   */
  render() {
<<<<<<< HEAD
    return (
    <div className="display-wrapper">
      <div>
        <canvas ref="display" id="canvas" width={this.width} height={this.height} />
        <Controls cca={this.cca}/>
      </div>
      <div className="display-color-list">
        {this.state.colors.map((color) => {
          return <div>{JSON.stringify(color)}</div>
        })}
      </div>
    </div>
    );
=======
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
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
<<<<<<< HEAD
        <CCACanvas width={300} height={300} parent={this} />
        
=======
        <CCACanvas width={400} height={300} />
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
      </div>
    )
  }
}

<<<<<<< HEAD
class Controls extends Component {
  constructor(props){
    super();
    this.cca = props.cca;
  }
  render(){
    return (
      <div className="App-wrapper-cca-controls">
        <button onClick={() => this.cca.clear()}> Clear</button>
        <button  onClick={() => this.cca.randomize()}> Randomize</button>
      </div>
    );
  }
}

=======
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
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
<<<<<<< HEAD
        <header className='App-header'><h1>LAMBDA SCHOOL: CCA</h1></header>
        <div className='App-wrapper'>
          <CCAApp />
        </div>
        <footer className='footer'> Copyright 2018 Track Seven Development </footer>
=======
        <CCAApp />
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
      </div>
    );
  }
}

<<<<<<< HEAD


=======
>>>>>>> a13367503e34c013ada302bb806c598d1e3e2877
export default App;