import React, { Component } from 'react';
import styled from 'styled-components';
import GridObject from './components/gridObject';
import { SketchPicker } from 'react-color';

class App extends Component {
  constructor(){
    super();
    this.state = {
      color: "#DE4C26",
      preset: null,
    }
  }

  selectColor = (color) => {
    console.log("select color")
    this.setState({
      color: color.hex,
    })
  }

  render() {
    return (
      <AppDiv>
        <h1>Conways "Game of Life"</h1>
        <div className="main">
          <GridObject color={this.state.color} />
          <div className="color"> 
            <SketchPicker 
              style={{margin: "10px"}}
              color={this.state.color}
              onChangeComplete={ this.selectColor}/>
          </div>
        </div>
        <div className="rules">
            <h4>Rules</h4>
            <p>Click to toggle squares. Press 'next' to advance one frame at at time or hit start to progress automatically</p>
            <p>If the cell is alive <strong>and</strong> has 2 <strong>or</strong> 3 neighbors, then it remains alive. Else it dies.</p>
            <p>If the cell is dead <strong>and</strong> has exactly 3 neighbors, then it comes to life. Else if remains dead.</p>
        </div>
        <div className="rules">
            <h4>About this Algorithm</h4>
            <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. The game is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.</p>From: <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Wikipedia</a>
            <p>This function was created by John Conway as a way to define cell automation. He chose the rules so that there is no explosive growth, yet unpredictable chaotic outcomes. It is cool how complex somthing can become from 2 rules.</p>
        </div>
      </AppDiv>
    );
  }
}

export default App;

const AppDiv = styled.div`
  /* border: 1px solid red; */
  /* height: 100vh; */
  box-sizing: border-box;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .main{
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    padding: 15px;
    .color{
      display: flex;
      align-items: center;
    }
  }
  .rules{
    /* border: 1px solid green; */
    width: 80%;
    padding: 15px;
  }
`;