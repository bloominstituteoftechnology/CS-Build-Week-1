import React, { Component } from "react";
import Grid from "./components/Grid";
import Play from "./components/Play";
import Pause from "./components/Pause";

import "./App.css";

import styled from "styled-components";

const AppContainer = styled.div`
  background-color: black;
  height: 100vh;
  min-height: 500px;
  width: 100%;
  background-color: black;
  margin-top: -22px;
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
`;

class App extends Component {
  state = {
    grid: [...Array(25)].map(e => Array(25).fill(0)),
    play: 0
    // grid: [
    //   [1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
  toggleState = e => {
    if (this.state.play === 0) {
      this.setState({ play: 1 });
    } else {
      this.setState({ play: 0 });
    }
  };

  toggleActive = (x, y) => {
    console.log(`toggleActive fired! x:${x} y:${y}`);
    let grid = JSON.parse(JSON.stringify(this.state.grid));
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    } else {
      grid[y][x] = 0;
    }
    this.setState({ grid });
  };

  playing = () => {
    if (this.state.play === 0) {
      return <button onClick={this.toggleState}>Play</button>;
    }
    return <button onClick={this.toggleState}>Pause</button>;
  };

  gridSetup = (x, y, element) => {
    if (this.state.play === 0) {
      return (
        <Grid
          onClick={() => this.toggleActive(x, y)}
          data={element}
          grid={this.state.grid}
        />
      );
    } else {
      return <Grid onClick={null} data={element} grid={this.state.grid} />;
    }
  };

  clear = () => {
      const newGrid = [...Array(25)].map(e => Array(25).fill(0));
      this.setState({grid : newGrid})
    
  }

  render() {
    return (
      <AppContainer>
        <h1>Game of Life</h1>
        <GridWrapper>
          {this.state.grid.map((nested, y) =>
            nested.map((element, x) => this.gridSetup(x, y, element))
          )}
        </GridWrapper>
        {this.playing()}
        <button onClick={this.clear} >Clear</button>
      </AppContainer>
    );
  }
}

export default App;
