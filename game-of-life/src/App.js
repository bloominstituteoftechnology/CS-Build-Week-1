import React, { Component } from "react";
import Grid from "./components/Grid";
import Play from "./components/Play";
import Pause from "./components/Pause";

import "./App.css"; 

import styled from "styled-components";



const AppContainer = styled.div`
  background-color: black;
  height: 100vh;
  width: 100%;
  background-color: black;
  margin-top:  -22px;
  h1 {
    color: palegoldenrod;
  }
`;

const GridWrapper = styled.div`
display: flex;
width: 500px;
flex-wrap: wrap;
box-sizing: border-box;
margin-bottom: 2px;

`



class App extends Component {
  state = {
      grid: [...Array(25)].map(e => Array(25).fill(0)),
      play: 0
    // grid: [
    //   [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ]
  };
  toggleState = (e) => {
    if(this.state.play == 0) {
        this.setState({play: 1})
    } else {
        this.setState({play: 0})
    }
}

  playing() {
  if (this.state.play == 0) {
    return <button onclick={this.toggleState}>Play</button>
  }
  return <button onclick={this.toggleState}>Pause</button>
}

  render() {
    return (
      <AppContainer>
        <h1>Game of Life</h1>
        <GridWrapper>
          {this.state.grid.map(nested =>
            nested.map(element => (
                
                <Grid data={element} grid={this.state.grid}/>
            ))
          )}
        </GridWrapper>
        
        {this.playing()}
        <button>Clear</button>
      </AppContainer>
    );
  }
}

export default App;
