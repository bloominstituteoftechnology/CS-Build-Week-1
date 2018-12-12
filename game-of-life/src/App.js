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
    play: 0,
    view: []
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

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async gameLoop() {
    while (this.state.play === 1) {
      await this.sleep(2000);
      this.setState({view : [...this.state.grid]})
    }
  }

  componentDidUpdate() {
    this.gameLoop();
  }


  playing = () => {
    if (this.state.play === 0) {
      return <button onClick={this.toggleState}>Play</button>;
    }
    return <button onClick={this.toggleState}>Pause</button>;
  };

  isDefined = (arr, y, x) => {
    if (!arr[y]) {
      return -1
    } else if (!arr[y][x]) {
      return -1;
    } else {
      return 1;
    }
  };

  gridSetup = (x, y, element) => {
    let neighbors = [];
    const newNeighbors = [];
    // let currNeighbor = [y, x];
    neighbors.push([y - 1, x]); // north
    neighbors.push([y - 1, x - 1]); // north/west
    neighbors.push([y - 1, x + 1]); //north east
    neighbors.push([y, x + 1]); // east
    neighbors.push([y, x - 1]); // west
    neighbors.push([y + 1, x]); // south
    neighbors.push([y + 1, x - 1]); //south/west
    neighbors.push([y + 1, x + 1]); // south/east



    for (let i = 0; i < 8; i++) {
      if (this.isDefined(this.state.grid, neighbors[i][0], neighbors[i][1]) !== -1) {
        console.log("this is i", neighbors[i]);
        newNeighbors.push(neighbors[i]);
        console.log("new Nayyyyy", newNeighbors);
      }
    }
    neighbors = newNeighbors;

    if (this.state.play === 0) {

      return (
        <Grid
          neighbors={neighbors}
          onClick={() => this.toggleActive(x, y)}
          data={element}
          grid={this.state.grid}
        />
      );
    } else {
      return (
        <Grid
          neighbors={neighbors}
          onClick={null}
          data={element}
          grid={this.state.grid}
        />
      );
    }
  };

  clear = () => {
    const newGrid = [...Array(25)].map(e => Array(25).fill(0));
    this.setState({ grid: newGrid });
    if (this.state.play === 1) {
      this.setState({ play: 0 });
    }
  };

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
        <button onClick={this.clear}>Clear</button>
      </AppContainer>
    );
  }
}

export default App;

//  under   under/left  under/right
// neighbors
// under   under/left under/right  right   left    up        up/left    up/right
//[y-1][x] [y-1][x-1] [y-1][x+1] [y][x+1] [y][x-1] [y+1][x] [y+1][x-1] [y+1][x+1]

//
//
