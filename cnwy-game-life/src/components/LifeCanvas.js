import React, { Component } from 'react';
import { Row, Col, Label, Input, UncontrolledTooltip} from 'reactstrap';
import styled from 'styled-components';
import patterns from './Patterns';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStepForward, faSyncAlt, faMale, faWalking, faRunning } from '@fortawesome/free-solid-svg-icons'

library.add(faPlay)
library.add(faPause)
library.add(faSyncAlt)
library.add(faStepForward)
library.add(faMale)
library.add(faWalking)
library.add(faRunning)

/**
 * Styled Components
 */

const GridInput = styled(Input)`
  width:20px;
`

const GenDiv = styled.div`
  padding-top:6px;
  width:24%;
`

const SelRow = styled(Row)`
  margin-top:25px;
`

const GameBtns = styled.div`
  padding-top: 10px;
  display:flex;
  justify-content:space-evenly;
  width:22%;
`
const CanvasFooter = styled.div`
  display:flex;
  justify-content:space-evenly;

`
const Canvas = styled.canvas`
  margin-top:25px;
  margin-left:20px;
`
const StyledFA = styled(FontAwesomeIcon)`
  cursor:pointer;
  :hover {
    color:pink;
  }
`

// const SpeedFA = styled(FontAwesomeIcon)`
//   color:${props => props.active ? "pink" : "white"};
// `

const SpeedSlider = styled.input`
  width:50px;
  cursor:pointer;
  :hover {
    color:pink;
  }

`

//Globals
let prevTimestamp = null;
let cellColorDead = 'white'; //must be white for now
let cellColorAlive = 'black'; //must be black for now
let cellBorderColor = 'pink';

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
      fps: 60,
      gameRunning:false,
      activePattern:''
    }
  }
  
  componentWillMount(){
    this.setState({
      gridSize: 500,
      cellSize: 10,
      gameBufferA: Array(Math.pow(500/10,2)).fill(false), 
      gameBufferB: Array(Math.pow(500/10,2)).fill(false),
      fps: 60,
      gameRunning:false,
      activePattern:'No Pattern'
    })
  }

  componentDidMount(){
    this.initializeCanvas();
  }

  componentWillUnmount() {
    // Stop animating
    this.continueAnimation = false;
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
    }, () => this.updateCanvas(this.state.gameBufferA))
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

    //Set the pixel to cellColorAlive
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
    ctx.fillStyle = (pixelRGBA[0] === 255 && pixelRGBA[1] === 255 && pixelRGBA[1] === 255) ? cellColorAlive : cellColorDead;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = cellBorderColor;
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
      setTimeout(()=>{
        requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
      }, 1000/this.state.fps)
    }
    
    // If we haven't yet stored the previous time, fake it
    if (prevTimestamp === null) {
      prevTimestamp = timestamp - 30; // milliseconds
    }
    
    // Compute how long it took between frames
    // const elapsed = timestamp - prevTimestamp
    
    // Remember this for next frame
    prevTimestamp = timestamp;
    // console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);
    
    
    // console.log("Cuurent State: ",this.state.gameBufferA);
    
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
      ctx.fillStyle = cv ? cellColorAlive : cellColorDead;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = cellBorderColor;
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
    let gameRunning = true;
    this.setState({gameRunning}, () => {
      requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
      this.continueAnimation = true;
    })

  }

  pauseGame = () => {    
    let gameRunning = false;
    this.setState({gameRunning}, () => {
      this.continueAnimation = false;
    })

  }
  
  restartGame = () => {
    this.continueAnimation = false;
    
    let gameRunning = false;
    let generation = 0
    this.setState({gameRunning, generation}, () => {
      this.initPattern(this.state.activePattern)
    })

    
  }

  stepGame = () => {
    let gameRunning = false;
    this.setState({gameRunning}, () => {
      requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
      this.continueAnimation = false;
    })
  }


  /**
   * Handles the changing of the cell size selector
   * 
   * @param e event = change event
   * @return void
   */
  cellSelOnChangeHandler = (e) => {
    let options = e.target.options;
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        let cellSize = Number(options[i].value.split(" ")[0]);
        this.setState({cellSize}, this.initializeCanvas)
      }
    }
  }


  /**
   * Handles the changing of the fps
   * 
   * @param e event = change event
   * @return void
   */
  fpsOnChangeHandler = (e) => {
    let options = e.target.options;
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        let fps = Number(options[i].value);
        this.setState({fps})
      }
    }
  }
  

  /**
   * Select an initial Pattern on Change handler
   * The selected option will call the initPattern()
   * 
   * @param e event = change event
   * @return void
   */
  initPatternOnChangeHandler = (e) => {

    let options = e.target.options;
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected){
        //Get a reference to selected pattern:
        let activePattern = options[i].value;
        
        //Set it as the active pattern as state var:
        this.setState({activePattern}, ()=> {
          
          //Initialize the pattern to the canvas:
          this.initPattern(options[i].value) 
        })
        }
      }
    }

   /**
   * Set the FPS of the game
   * 
   * 
   * @param fps number representing the FPS
   * @return void
   */
  gameSpeedOnChangeHandler = (e) => {
    console.log("changed slider")
    console.log(e.target.value);
    console.log(typeof (e.target.value));
    let sliderVal = Number(e.target.value)
    if (sliderVal === 0){
      this.setState({fps:2})
    }else if(sliderVal === 25){
      this.setState({fps:5})
    }else if (sliderVal === 50) {
      this.setState({fps:60})
    }
  }

  /**
   * Initialize Pattern
   * 
   * @param patternStr = a string representing the pattern
   * @return void
   */
  initPattern = (patternStr) => {
    //Calcuate the number of cells per row
    let cellsPerRow = this.state.gridSize/this.state.cellSize;
        
    //Calculate the middle Row/Col
    let mid = Math.round(cellsPerRow/2);
        
    //Set the Empty Game Buffer (all falses)
    let gameBufferE = Array(Math.pow(this.state.gridSize/this.state.cellSize,2)).fill(false);
        
    //Set the Empty Buffer to the BufferA
    let gameBufferA = [...gameBufferE];
        
        //Update state and update canvas
        this.setState({gameBufferA}, () => this.updateCanvas(this.state.gameBufferA))
        
    //Check if pattern string exists (imported from Patterns.js)
    if (patterns[patternStr]){
        
      //Loop through the array of (x,y) values and set them to true:
      patterns[patternStr].forEach( cv => {  
        gameBufferA[cv[0] + cv[1]*cellsPerRow] = true;
      })
    }else {
      if (patternStr === "Vertical Line"){

        for (let i=0; i<cellsPerRow; i++){
          gameBufferA[mid + i*cellsPerRow] = true;
        }
      }
      else if (patternStr === "Horizontal Line"){  
        for (let i=0; i<cellsPerRow; i++){
          gameBufferA[i + mid*cellsPerRow] = true;
        }
      }
    }

    //Update state and update canvas
    this.setState({gameBufferA}, () => this.updateCanvas(this.state.gameBufferA))
    
  }

  /**
   * Rendering
   */
  render() {
    return (
      <div>
        <div>
          
          <SelRow>
            <Col sm="3">
              <Label for="cellSizeSel">Select Cell Size:</Label>
            </Col>
            <Col sm="4">
              <GridInput ref="cellSel" type="select" name="select" id="cellSizeSel" bsSize="sm" onChange={this.cellSelOnChangeHandler}>
                <option>10 px</option>
                <option>20 px</option>
                <option>25 px</option>
                <option>50 px</option>
                <option>100 px</option>
              </GridInput>
            </Col>
          </SelRow>

          <SelRow>
            <Col sm="3">
              <Label for="initPattern">Select Pattern:</Label>
            </Col>
            <Col sm="4">
              <GridInput ref="cellSel" type="select" name="select" id="initPattern" bsSize="sm" onChange={this.initPatternOnChangeHandler}>
                <option>No Pattern</option>
                <option>Glider</option>
                <option>Blinker</option>
                <option>R-pentomino</option>
                <option>Vertical Line</option>
                <option>Horizontal Line</option>
              </GridInput>
            </Col>
          </SelRow>

        </div>
        
        <Canvas ref="canvas" id="canvas" width={this.state.gridSize} height={this.state.gridSize} onClick={this.getCanvasXYcoordFromMouseClick}/>
        
        <CanvasFooter>
            <GenDiv>
              Generation: {this.state.generation}
            </GenDiv>

            <GameBtns>
                {/* {this.state.fps === 2 ? <SpeedFA active icon="male" onClick={()=>this.setFPS(2)}/> : <SpeedFA icon="male" onClick={()=>this.setFPS(2)}/> }
                {this.state.fps === 5 ? <SpeedFA active icon="walking" onClick={()=>this.setFPS(5)}/> : <SpeedFA icon="walking" onClick={()=>this.setFPS(5)}/>}
              {this.state.fps === 60 ? <SpeedFA active icon="running" onClick={()=>this.setFPS(60)}/> : <SpeedFA icon="running" onClick={()=>this.setFPS(60)}/> } */}
              <SpeedSlider type="range" id="gameSpeed" onChange={this.gameSpeedOnChangeHandler} step="25" max="50"/>            
            </GameBtns>
              
            <GameBtns>
              {this.state.gameRunning ? <StyledFA icon="pause" onClick={this.pauseGame}/> : <StyledFA icon="play" onClick={this.startGame}/>}

              
              <StyledFA icon="step-forward" id="utt-step" onClick={this.stepGame}/>
              <UncontrolledTooltip placement="top" target="utt-step"> Step Game </UncontrolledTooltip>
              
              <StyledFA icon="sync-alt" id="utt-restart" onClick={this.restartGame}/>
              <UncontrolledTooltip placement="top" target="utt-restart"> Restart Game </UncontrolledTooltip>
            </GameBtns>
  
        </CanvasFooter>
      </div>
    );
  }
  
}

export default LifeCanvas;