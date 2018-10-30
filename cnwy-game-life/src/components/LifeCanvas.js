import React, { Component } from 'react';
import { Button} from 'reactstrap';
import styled from 'styled-components';


/**
 * Styled Components
 */
const GameBtns = styled(Button)`
  margin-right:10px;
`

const GenDiv = styled.div`
  margin-top:50px;
`

let prevTimestamp = null;


/**
 * LifeCanvas component
 * 
 * This component will create the Game of life canvas element
 * - It will initialize it
 * - Allow the user to click on any cell and toggle it's value
 * - Provide user controls (Start, Stop, Step, etc) to allow the user to control the animation
 */
class LifeCanvas extends Component {
  constructor(props){
    super(props);
    this.continueAnimation = true;
    this.state = {
      generation: 0,
      gridSize: 0,
      cellSize: 0,
      gameBufferA: [],
      gameBufferB: [],
    }
  }
  
  componentWillMount(){
    this.setState({
      gridSize: 500,
      cellSize: 10,
      gameBufferA: Array(Math.pow(500/10,2)).fill(false), 
      gameBufferB: Array(Math.pow(500/10,2)).fill(false)
    })
  }

  componentDidMount(){
    this.initializeCanvas();
  }

  componentWillUnmount() {
    // Stop animating
    this.continueAnimation = false;
    // this.setState({continueAnimation:false})
  }


  /**
   * Initialize the canvas
   * 
   * @param void
   * @return void
   */
  initializeCanvas = ()=>{
    this.setState({
      generation:0,
      gameBufferA: Array(Math.pow(this.state.gridSize/this.state.cellSize,2)).fill(false), 
      gameBufferB: Array(Math.pow(this.state.gridSize/this.state.cellSize,2)).fill(false)
    })

    let canvas = this.refs.canvas; 
    const ctx = canvas.getContext('2d');
    
    //Fill the ctx with a black box:
    ctx.fillRect(0,0,this.state.gridSize,this.state.gridSize);
    
    //Fill a single Rect:
    let sqEdgeLength = this.state.cellSize;

    //Fill Matrix with Squares:
    for (let i = 0; i<this.state.gridSize/sqEdgeLength; i++){
      for (let j = 0; j<this.state.gridSize/sqEdgeLength; j++){
      ctx.beginPath();
      ctx.rect(i*sqEdgeLength, j*sqEdgeLength, sqEdgeLength, sqEdgeLength);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'grey';
      ctx.stroke();
      }
    }
  }


  /**
   * Gets the absolute XY coord of the canvas at the location of the mouse click
   * 
   * @param e The event of the click on the canva
   * @return object canvasCoord which will have the x,y coordinates of the click
   */
  getCanvasXYcoordFromMouseClick = (e) =>{
    
    //Get the mouse click's (x,y) coordinate
    let canvasCoord = this.getCanvasCoord(e);
    // console.log("X: ", canvasCoord.x);
    // console.log("Y: ", canvasCoord.y);
    
    //Get the pixel's RGBA values:
    let canvas = e.target; 
    const ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // See the screenBuffer
    // let screenBuffer = imageData.data;
    // console.log("screen buffer: ", screenBuffer);

    //Get the pixel Color of where the user clicked
    const pixelRGBA =  this.getPixel(imageData, canvasCoord.x, canvasCoord.y);
    // console.log("pixelRGBA: ", pixelRGBA);

    //Toggle that pixel's cell color and return that cell's index
    let clickedCellIndex = this.toggleCell(canvasCoord, pixelRGBA);

    //Toggle the appropriate cell in BufferA:
    this.initializeBufferA(clickedCellIndex);

    //Set the pixel to black
    // this.setPixel(canvas, canvasCoord.x, canvasCoord.y);

  }
  

    /**
   * Initialize BufferA's cells to dead/alive (false/true)
   * 
   * @param clickedCellIndex = an object that contains the user clicked (x,y) coordinate index
   * @return void
   */
  initializeBufferA = (clickedCellIndex) => {
    
    //Calcuate the number of cells per row
    let cellsPerRow = this.state.gridSize/this.state.cellSize;
    
    //Calcualte the index into the array buffer
    let indexToToggle = clickedCellIndex.y * cellsPerRow + clickedCellIndex.x;
    
    //Copy the gameBufferA
    let tmpGameBufferA = [...this.state.gameBufferA];

    //Toggle the value at the index in the temp buffer
    tmpGameBufferA[indexToToggle] = !tmpGameBufferA[indexToToggle]
    
    //Update the state:
    this.setState({gameBufferA:tmpGameBufferA});
  }


  /**
   * Toggle cell's color based on the cell's corresponding to the Canvas Coord (x,y)
   * 
   * @param canvasCoord = an object that contains the user clicked (x,y) coord
   * @param pixelRGBA = an array of [R, G, B, A] containing the color of the pixe
   * @return clickedCellIndex = index of the clicked cell = the (x,y) of the upper left of the cell
   */
  toggleCell = (canvasCoord, pixelRGBA) => {
    //Initialize the index of the clicked cell = the (x,y) of the upper left of the cell
    let clickedCellIndex = {x:0,y:0};
    
    // Get Ref to canvas element
    let canvas = document.getElementById("canvas");
    // console.log("canvas in toggle:", canvas);
    
    // Get the Context of the canvas Elem
    const ctx = canvas.getContext('2d');
    // console.log("context in toggle:", ctx);
    
    // Test the imageData
    // let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Test the screenBuffer
    // let screenBuffer = imageData.data;
    // console.log("screen buffer: ", screenBuffer);

    // Test the Cell Size
    // console.log("Cell Size: ", this.state.cellSize);

    // Get the multiplier from (x,y), dividing by the cellsize
    // allows use to find which cell the user clicked on
    let xMult = Math.floor(canvasCoord.x/this.state.cellSize);
    let yMult = Math.floor(canvasCoord.y/this.state.cellSize);
    clickedCellIndex.x = xMult;
    clickedCellIndex.y = yMult;

    // Test the pixel color coming in
    // console.log("pixelRGBA: ", pixelRGBA);

    ctx.beginPath();
    ctx.rect(xMult*this.state.cellSize, yMult*this.state.cellSize, this.state.cellSize, this.state.cellSize);
    ctx.fillStyle = (pixelRGBA[0] === 255 && pixelRGBA[1] === 255 && pixelRGBA[1] === 255) ? 'black' : 'white';
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'grey';
    ctx.stroke();

    return clickedCellIndex;
  }


  /**
   * Get the Canvas (x,y) coordinates
   * 
   * @param e The event of the click on the canva
   * @return object canvasCoord which will have the x,y coordinates of the click
   */
  getCanvasCoord = (e) =>{
    //Initialize object to hold the return values
    let canvasCoord = {x:0, y:0};

    //Get a reference to the main-container:
    let mainContainer = document.getElementById('main-container');
    
    //Get it's computed style
    let nodeStyle = window.getComputedStyle(mainContainer);
    
    //Get the margin Left as a string ,ie, 196.4px
    let mainContXOffsetStr = nodeStyle.getPropertyValue('margin-left');
    
    //Drop the last two characters (for px) convert to a number and round up
    let mainContXOffset = Math.round(Number(mainContXOffsetStr.substring(0, mainContXOffsetStr.length - 2)));

    //Subtract the main-container's X offset and target's offset to get the actual canvas X value
    canvasCoord.x = e.pageX - (e.target.offsetLeft + mainContXOffset);
    if (canvasCoord.x < 0) canvasCoord.x = 0;
    
    //Subtract the target's Y offset to get the actual canvas Y value
    canvasCoord.y = e.pageY - e.target.offsetTop;
    if (canvasCoord.y < 0) canvasCoord.y = 0;
    
    return canvasCoord; 
  }


  /**
   * Get a pixel value from imageData
   *
   * @param imageData HTML canvas imagedata from getImageData()
   * @param x X coordinate to get pixels from
   * @param y Y coordinate to get pixels from
   * @return Array [R,G,B,A] for the pixel in question, or null if out of bounds
   */
  getPixel = (imageData, x, y) => {
    const w = imageData.width; // Conveniently the width is here
    const h = imageData.height;

    if (x < 0 || x >= w || y < 0 || y >= h) {
        // Out of bounds
        return null;
    }

    // Compute index within the array
    const index = (w * y + x) * 4;

    // Return a copy of the R, G, B, and A elements
    return imageData.data.slice(index, index + 4);
  }


  /**
   * Put a pixel value from imageData
   *
   * @param canvas HTML canvas
   * @param x X coordinate to get pixels from
   * @param y Y coordinate to get pixels from
   * @return void
   */
  setPixel = (canvas, x, y) => {
    const ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const w = imageData.width; // Conveniently the width is here
    const h = imageData.height;

    if (x < 0 || x >= w || y < 0 || y >= h) {
        // Out of bounds
        return null;
    }

    // Compute index within the array
    const index = (w * y + x) * 4;

    imageData.data[index + 0] = 0x00; // Red: 0xff == 255, full intensity
    imageData.data[index + 1] = 0x00; // Green: zero intensity
    imageData.data[index + 2] = 0x00; // Blue: zero intensity
    imageData.data[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque
  
    ctx.putImageData(imageData, 0, 0);
  }


  /**
   * Animate the canvas 
   *
   * @param timestamp
   * @return void
   */
  onAnimFrame = (timestamp) => {
    
    // Request another animation frame for the future
    if (this.continueAnimation) {
      requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
    }
    // requestAnimationFrame(this.onAnimFrame); //No control on animation
    
    
    // If we haven't yet stored the previous time, fake it
    if (prevTimestamp === null) {
      prevTimestamp = timestamp - 30; // milliseconds
    }
    
    // Compute how long it took between frames
    const elapsed = timestamp - prevTimestamp
    
    // Remember this for next frame
    prevTimestamp = timestamp;
    console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);
    
    
    console.log("Cuurent State: ",this.state.gameBufferA);
    
    //Calculate the next Gen from BufferA and place into BufferB
    this.setState({
      gameBufferB : this.calculateNextGen(this.state.gameBufferA)
    }, () => {
      //After setting state, update the canvas:
      this.updateCanvas(this.state.gameBufferB);

      //Set the BufferA = BufferB
      this.setState({
        gameBufferA: this.state.gameBufferB
      })
    }) 

    this.setState({generation: this.state.generation + 1} )
  }

  /**
   * Update Canvas based on nextBuffer
   * 
   * @param nextBuffer
   * @return void
   */
  updateCanvas = (nextBuffer) => {
    //Calcuate the number of cells per row
    let cellsPerRow = this.state.gridSize/this.state.cellSize;

    let canvas = this.refs.canvas; 
    const ctx = canvas.getContext('2d');
    
    //Map through the nextBuffer
    nextBuffer.forEach( (cv,i) => {
      
      //For each index calculate the xMult and yMult
      let xMult = i % cellsPerRow;
      let yMult = Math.floor(i/cellsPerRow);
      
      ctx.beginPath();
      ctx.rect(xMult * this.state.cellSize, yMult*this.state.cellSize, this.state.cellSize, this.state.cellSize);
      ctx.fillStyle = cv ? 'black' : 'white';
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'grey';
      ctx.stroke();
    })
  }

  /**
   * Calculate the next Generation
   * 
   * @param currBuffer = the buffer with current state of the game
   * @param nextBuffer = the buffer that will hold the next state of the game
   */
  calculateNextGen = (currBuffer) =>{

    //Calcuate the number of cells per row
    let cellsPerRow = this.state.gridSize/this.state.cellSize;

    //Map over every index of the currBuffer
    let nextBuffer = currBuffer.map( (cv, i, arr) => {
      
      //For each index, declare each of the 8 indexes
      //left, right, up, down, upperleft, upper-right, lower-left, lower-right
      let l = i-1;
      let r = i+1;
      let u = i-cellsPerRow;
      let d = i+cellsPerRow;
      let ul = u - 1;
      let ur = u + 1;
      let ll = d - 1;
      let lr = d + 1;

      //Place all 8 neighbor indexes into an array:
      let eightNeigborIndexes = [l, r, u, d, ul, ur, ll, lr];
      
      //Determine the number of live neighbors = filter out indexes outside grid and accumulate:
      let liveNeighborsCount =  eightNeigborIndexes
        .filter( cv => ((cv >= 0) && (cv < Math.pow(cellsPerRow,2))) )
        .reduce((acc, cv) => acc + arr[cv], 0)
      
      //If the cell is alive (aka true)
      if (cv) {

        //If the number of live neighbors is 2 or 3, this cell stays alive, else it dies
        return (liveNeighborsCount === 3 || liveNeighborsCount === 2) ? true : false;
      }  

      // If the cell is dead (aka false)
      else {

        //If the number of live neighbors is exactly 3, this cell comes to life!
        return (liveNeighborsCount === 3) ? true : false;
      }  
    })

    //Return the newly formedBuffer;
    return nextBuffer;
  }

  /**
   * Game Controllers
   * 
   */
  startGame = () => {
    requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
    this.continueAnimation = true;
    // this.setState({continueAnimation:true})
  }

  stopGame = () => {
    this.continueAnimation = false;
    // this.setState({continueAnimation:false})
  }
  
  restartGame = () => {
    this.continueAnimation = false;
    this.initializeCanvas();
    
    // this.setState({continueAnimation:false}, ()=>this.initializeCanvas());
  }

  stepGame = () => {
    requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
    this.continueAnimation = false;
    // this.setState({continueAnimation:false})
  }


  /**
   * Rendering
   */
  render() {
    return (
      <div>
        <GenDiv>Generation: {this.state.generation}</GenDiv>
        <canvas ref="canvas" id="canvas" width={this.state.gridSize} height={this.state.gridSize} onClick={this.getCanvasXYcoordFromMouseClick}/>
        <div>
          <GameBtns onClick={this.startGame}>Start</GameBtns>
          <GameBtns onClick={this.stopGame}>Stop</GameBtns>
          <GameBtns onClick={this.restartGame}>Restart</GameBtns>
          <GameBtns onClick={this.stepGame}>Step</GameBtns>
          <GameBtns onClick={this.pauseGame}>Pause</GameBtns>
        </div>
      </div>
    );
  }
  
}

export default LifeCanvas;