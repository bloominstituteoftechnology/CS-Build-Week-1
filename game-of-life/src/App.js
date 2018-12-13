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
  p {
    color: palegoldenrod;
  }
`;

const SpeedContainer = styled.div`
  display: flex;
  align-items: center;
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
    view: [],
    gen: 0,
    speed: 500,
    random: 0

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
  togglePlay = e => {
    console.log("togglePlay fired!");
    if (this.state.play === 0) {
      this.setState({ play: 1 }, this.gameLoop);
    } else {
      this.setState({ play: 0 });
      if (this.timeoutHandler) {
        window.clearTimeout(this.timeoutHandler);
        this.timeoutHandler = null;
      }
    }
    // if(this.state.play == 1) {
    //   console.log('we are in toggleplay about to start gameloop');
    //   this.gameLoop();

    // }
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

  gameLoop() {
    let view = [...Array(25)].map(rows => Array(25).fill(0));
    this.state.grid.forEach((nested, y) => {
      nested.forEach((element, x) => {
        const neighbors = this.checkNeighbors(x, y);
        this.logic(view, neighbors, x, y);
      });
    });

    this.setState(state => {
      return {
        grid: view,
        gen: state.gen + 1
      };
    });

    if (this.state.play) {
      this.timeoutHandler = window.setTimeout(() => {
        this.gameLoop();
      }, this.state.speed);
    }
  }

  logic = (view, arr, x, y) => {
    // console.log("got into logic")
    let val = this.state.grid[y][x];
    // console.log("value of val: ", val)
    if (this.isDefined(this.state.grid, y, x) != -1) {
      // console.log("got into if statement");
      // if ((arr.length < 2) || (arr.length > 3) && (val !== 0)) {
      //   view[y][x] = 0;

      //   //logic similar to toggleActive but first put it in view and then when finished checking each cell the grid becomes view view will do maths and state becomes view
      // } else if (arr.length == 3) {
      //   if (val == 0) {
      //     view[y][x] = 1;
      //   }

      //   // } else if( y == arr[y].length - 1 && x ==  arr[y].length - 1) {
      //   //   this.gridSetup(x,y, this.state.view[y][x]);
      //   // } // R: i think we should switch between the two arrays in a different way rather than this k I was just seeing what it would throw
      //   // console.log(this.state.view);
      // }
      // console.log(`\t\tarr.length: ${arr.length} ${val}`);
      // console.log(arr); // idk why it's just picking up two neighbors

      if (val === 1) {
        //   if (arr.length < 2 || arr.length > 3) {
        //     console.log("val true condition OK");
        //     view[y][x] = 0;
        //   }
        // }
        // else {
        //   if (arr.length === 3) {
        //     console.log("val false condition OK");
        //     view[y][x] = 1;
        //   }
        // }
        view[y][x] = arr.length < 2 || arr.length > 3 ? 0 : 1;
      } else {
        view[y][x] = arr.length === 3 ? 1 : 0;
      }
    }
  };
  componentDidMount() {
    this.setState({ view: [...this.state.grid] });
  }

  playing = () => {
    if (this.state.play === 0) {
      return <button onClick={this.togglePlay}>Play</button>;
    }
    return <button onClick={this.togglePlay}>Pause</button>;
  };

  isDefined = (arr, y, x) => {
    if (arr[y] === undefined) {
      return -1;
    } else if (arr[y][x] === undefined) {
      return -1;
    } else {
      return 1;
    }
  };

  checkNeighbors = (x, y) => {
    let neighbors = [];
    const newNeighbors = [];

    neighbors.push([y - 1, x]); // north
    neighbors.push([y - 1, x - 1]); // north/west
    neighbors.push([y - 1, x + 1]); //north east
    neighbors.push([y, x + 1]); // east
    neighbors.push([y, x - 1]); // west
    neighbors.push([y + 1, x]); // south
    neighbors.push([y + 1, x - 1]); //south/west
    neighbors.push([y + 1, x + 1]); // south/east

    for (let i = 0; i < 8; i++) {
      if (
        this.isDefined(this.state.grid, neighbors[i][0], neighbors[i][1]) !==
          -1 &&
        this.state.grid[neighbors[i][0]][neighbors[i][1]] === 1
      ) {
        // console.log("this is i", neighbors[i]);
        // console.log("this neighbor should be pushed:", neighbors[i]);
        newNeighbors.push(neighbors[i]);
        // console.log("new Nayyyyy", newNeighbors);
      }
    }
    // console.log(`these are the neighbors ${newNeighbors} of ${y},${x}`);
    return newNeighbors;
  };

  gridSetup = (x, y, element) => {
    // this.setState({ grid: JSON.parse(JSON.stringify(this.state.view)) });
    if (this.state.random === 1) {
      return (
        <Grid
          onClick={() => this.toggleActive(x, y)}
          data={element}
          grid={this.state.grid}
        />
      );
    }
    if (this.state.play === 0) {
      return (
        <Grid
          onClick={() => this.toggleActive(x, y)}
          data={element}
          grid={this.state.grid}
        />
      );
    } else {
      return (
        <Grid
          onClick={null}
          data={element}
          grid={this.state.grid}
          gridSetup={this.gridSetup}
        />
      );
    }
  };

  clear = () => {
    const newGrid = [...Array(25)].map(e => Array(25).fill(0));
    this.setState({ grid: newGrid, gen: 0 });
    if (this.state.play === 1) {
      this.setState({ play: 0, gen: 0 });
      if (this.timeoutHandler) {
        window.clearTimeout(this.timeoutHandler);
        this.timeoutHandler = null;
      }
    }
  };

  changeSpeed = button => {
    if (button === "+") {
      let newSpeed = this.state.speed - 100;
      if (newSpeed <= 2000 && newSpeed >= 100) {
        this.setState({ speed: newSpeed });
      } else {
        this.setState({ speed: 100 });
      }
    }
    if (button === "++") {
      let newSpeed = this.state.speed - 250;
      if (newSpeed <= 2000 && newSpeed >= 100) {
        this.setState({ speed: newSpeed });
      } else {
        this.setState({ speed: 100 });
      }
    }
    if (button === "-") {
      let newSpeed = this.state.speed + 100;
      if (newSpeed <= 2000 && newSpeed >= 100) {
        this.setState({ speed: newSpeed });
      } else {
        this.setState({ speed: 2000 });
      }
    }
    if (button === "--") {
      let newSpeed = this.state.speed + 250;
      if (newSpeed <= 2000 && newSpeed >= 100) {
        this.setState({ speed: newSpeed });
      } else {
        this.setState({ speed: 2000 });
      }
    }
  };
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  randomGrid = () => {
    let num = this.getRandomInt(2);
    this.setState({ random: 1 });
    this.state.grid.forEach((nested, y) =>
      nested.forEach((element, x) => this.gridSetup(x, y, num))
    );
  };

  render() {
    return (
      <AppContainer>
        <h1>Game of Life</h1>
        <h1>{this.state.gen}</h1>
        <button onClick={() => this.gameLoop()}>Next</button>
        <GridWrapper>
          {this.state.grid.map((nested, y) =>
            nested.map((element, x) => this.gridSetup(x, y, element))
          )}
        </GridWrapper>
        {this.playing()}
        <button onClick={this.clear}> Clear </button>
        <button onClick={this.randomGrid}>Randomize</button>
        <SpeedContainer>
          <p>Speed: &nbsp;</p>
          <button onClick={() => this.changeSpeed("--")}> &lt;&lt; </button>
          <button onClick={() => this.changeSpeed("-")}> &lt; </button>
          <button onClick={() => this.changeSpeed("+")}>&gt; </button>
          <button onClick={() => this.changeSpeed("++")}> &gt;&gt; </button>
        </SpeedContainer>
        <div>
          <p>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970. The
            game is a zero-player game, meaning that its evolution is determined
            by its initial state, requiring no further input.
          </p>
          <p>
            The game has a simple set of rules. The direct cells surrounding a
            cell are refered to as neighbors and if a cell has:
            <br />
            0/1 Neighbors the cell will parish <br />
            2/3 Neighbors the cell will live If the cell <br />
            has more than 3 neighbors it will die as if overpopulation
            <br />
          </p>
        </div>
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
