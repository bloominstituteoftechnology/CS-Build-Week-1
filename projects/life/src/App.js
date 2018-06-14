// import React, { Component } from 'react';
// import Life from './life';
// import './App.css';

// const canvasWidth = 800;
// const canvasHeight = 600;

// const COLORS = [
//   [0, 0, 0],
//   [0xFF, 0xFF, 0xFF]
// ]

// /**
//  * Life canvas
//  */
// class LifeCanvas extends Component {

//   /**
//    * Constructor
//    */
//   constructor(props) {
//     super(props);

//     this.life = new Life(props.width, props.height);
//     this.life.randomize();
//   }

//   /**
//    * Component did mount
//    */
//   componentDidMount() {
//     requestAnimationFrame(() => {this.animFrame()});
//   }

//   /**
//    * Handle an animation frame
//    */
//   animFrame() {
//     //
//     // TODO: !!!! IMPLEMENT ME !!!!
//     //
//     let width = this.props.width;
//     let height = this.props.height;

//     let canvas = this.refs.canvas;
//     let ctx = canvas.getContext('2D');

//     this.life = new Life(300, 300);

//     // ctx.fillStyle = "black";
//     // ctx.fillRect(0, 0, width, height);
//     // ctx.fill();
    
//     // Request another animation frame

//     requestAnimationFrame(() => {this.animFrame()});

//     // Update life and get cells
//     let lifeCells = this.life.getCells();
//     // Get canvas framebuffer, a packed RGBA array

//     // Convert the cell values into white or black for the canvas

//     // Put the new image data back on the canvas

//     // Next generation of life
//   }

//   /**
//    * Render
//    */
//   render() {
//     return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
//   }
// }

// /**
//  * Life holder component
//  */
// class LifeApp extends Component {

//   /**
//    * Render
//    */
//   render() {
//     return (
//       <div>
//         <LifeCanvas width={400} height={300} />
//       </div>
//     )
//   }
// }

// /**
//  * Outer App component
//  */
// class App extends Component {

//   /**
//    * Render
//    */
//   render() {
//     return (
//       <div className="App">
//         <LifeApp />
//       </div>
//     );
//   }
// }

// export default App;


import React, { Component } from 'react';
import Life from './life';
import './App.css';

const canvasWidth = 400;
const canvasHeight = 300;

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
 * Life canvas
 */
class LifeCanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.cca = new Life(canvasWidth, canvasHeight);
    // this.cca.randomize();
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => (this.animFrame()));
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    let width = this.props.width;
    let height = this.props.height;

    let canvas = this.refs.canvas;
    let ctx = canvas.getContext('2d');

    // let fillStyle = 'white';
    // ctx.fillRect(0, 0, this.props.width, this.props.height);

    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cells = this.cca.getCells();

    // Here is the screen buffer array we can manipulate:

    let screenBuffer = imageData.data;
    
    // for(let i = 0; i < 1000; i += 4){
    //   screenBuffer[i + 0] = 0; //R
    //   screenBuffer[i + 1] = 0; //G
    //   screenBuffer[i + 2] = 0; //B
    //   screenBuffer[i + 3] = 255; //A
    // }

    for(height = 0; height < canvasHeight; height++){
      for(width = 0; width < canvasWidth; width++){
        //convert xy to index

        let index = (height * canvasWidth + width) * 4;

        let ccaStatus = cells[height][width];

        // change pixels at index to match status

        screenBuffer[index + 0] = COLORS[ccaStatus][0];
        screenBuffer[index + 1] = COLORS[ccaStatus][1];
        screenBuffer[index + 2] = COLORS[ccaStatus][2];
        screenBuffer[index + 3] = 255;
      }
    }

    // console.log('screenBuffer in animFrame: ', screenBuffer);

    ctx.putImageData(imageData, 0, 0);

    this.cca.step();

    requestAnimationFrame(() => {this.animFrame()});
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={canvasWidth} height={canvasHeight}></canvas>;
  }
}

/**
 * Life holder component
 */
class CCAApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <LifeCanvas width={canvasWidth} height={canvasHeight} />
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