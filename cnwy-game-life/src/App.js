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



  } 
  /**
   * Get the Canvas (x,y) coordinates
   * 
   * Takes in an event from a mouse click to the canvas element
   * Returns an object with the absolute X and Y values
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


  render() {
    return (
      <div className="App">
        {/* <LifeCanvas height={500} width={500} clickHandler={this.canvasClickHandler}/> */}
        <MainContainer id="main-container">
          <Row>
            <Col sm="6">
              <div><h2>Conway's Game of Life</h2></div>
              <GenDiv>Generation: 0</GenDiv>
              <LifeCanvas height={500} width={500} clickHandler={this.canvasClickHandler}/>
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
