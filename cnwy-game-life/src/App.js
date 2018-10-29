import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import LifeCanvas from './components/LifeCanvas';

const MainContainer = styled(Container)`
  background-color: #282c34;
  /* min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin); */
  height:100vh;
  color: white;
`

const RulesDiv = styled.div`
  margin-top:200px;
`

const GenDiv = styled.div`
  margin-top:50px;
`
class App extends Component {
  constructor (){
    super();
  }
  
  canvasClickHandler = (e) =>{
    console.log('You clicked on the canvas!');
    
    //Get the mouse click's (x,y) coordinate
    let canvasCoord = this.getCanvasCoord(e);
    console.log("X: ", canvasCoord.x);
    console.log("Y: ", canvasCoord.y);
    
    //Get the pixel's RGBA values:
    let canvas = e.target; 
    const ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // See the screenBuffer
    // let screenBuffer = imageData.data;
    // console.log("screen buffer: ", screenBuffer);

    const pixelRGBA =  this.getPixel(imageData, canvasCoord.x, canvasCoord.y);
    console.log("pixelRGBA: ", pixelRGBA);


    //Set the pixel to black
    this.setPixel(canvas, canvasCoord.x, canvasCoord.y);

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
    
    //Get the marin Left as a string ,ie, 196.4px
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



  render() {
    return (
      <div className="App">
        {/* <LifeCanvas height={500} width={500} clickHandler={this.canvasClickHandler}/> */}
        <MainContainer id="main-container">
          <Row>
            <Col sm="6">
              <div><h2>Conway's Game of Life</h2></div>
              <GenDiv>Generation: 0</GenDiv>
              <LifeCanvas height={100} width={100} clickHandler={this.canvasClickHandler}/>
              <div>Update every <input type="text"/> ms</div>
              <div>Size of grid <input type="text"/> </div>
              <div>Play Button</div>
            </Col>
            <Col sm="6">
            <RulesDiv>
              <h4>Rules</h4>
              <ul>If a cell is <strong>alive</strong> and it has exactly 2 or 3 neighbors, it <strong>stays alive.</strong></ul>
              <ul>If a cell is <strong>alive</strong> and it has exactly 2 or 4+ neighbors, it <strong>dies.</strong></ul>
              <ul>If a cell is <strong>dead</strong> and it has exactly 3 live neighbors, it <strong>comes to life.</strong></ul>
            </RulesDiv>
            </Col>
          </Row>
        </MainContainer>
      </div>
    );
  }
}

export default App;
