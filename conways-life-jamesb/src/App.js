import React from 'react'
import './App.css'
import Grid from '../src/components/Grid/Grid'
import TopBar from '../src/components/TopBar/TopBar'
import ControlBar from '../src/components/ControlBar/ControlBar'
import styled from 'styled-components'



class App extends React.Component {
  // on load, state should be a 15x15 grid with all cells set to dead
  state = {
    currentGrid: [],
    gridDimensions: 15,
    generation: 0,
    gameOn: false,
    gameSpeed: 1000,
    displaySpeed: 1
  };

  createGrid = (newGridSize) => {
    let newGrid = []
    // create a (x-value) by (y-value) square grid using a nested loop and the new grid size,
    // store x-val, y-val, and isAlive(boolean) for each cell
    for (let x = 0; x < newGridSize; x++) {
      let rowOfCells = []
      // once a row of cells is created at the desired length, push it into the currentGrid array to be stored in state
      for (let y = 0; y < newGridSize; y++) {
        rowOfCells.push({
          // x and y swapped so rows are stored rather than columns
          xVal: y,
          yVal: x,
          isAlive: false,
        });
      }
      // push the full row of cells into the allCells array
      newGrid.push(rowOfCells);
    }
    // set the currentGrid state equal to the cell rows array, containing all rows, x/y vals, and isAlive
    this.setState({
      currentGrid: newGrid
    })
  }
  //createGrid^^^^^^^^------------------------------------------------------------------------------------------------

  setNewDimensions = (newGridDim) => {
    this.setState({
      gridDimensions: newGridDim
    });
    this.createGrid(newGridDim)
  }
  //setNewDimensions^^^^^^-------------------------------------------------------------------------------------------

  // on load, create a new grid with default 15x15
  componentDidMount() {
    this.setNewDimensions(15)
  };

  // componentDidMount/Update^^^^^^^------------------------------------------------------------------------------------------

  randomizeGrid = () => {
    let newGrid = []
    for (let x = 0; x < this.state.gridDimensions; x++) {
      let rowOfCells = []
      for (let y = 0; y < this.state.gridDimensions; y++) {
        const random = !!Math.round(Math.random());
        rowOfCells.push({
          xVal: y,
          yVal: x,
          isAlive: random,
        });
      }
      newGrid.push(rowOfCells);
    }
    this.setState({
      currentGrid: newGrid
    })
  }
  // randomize^^^^^^^------------------------------------------------------------------------------------------
  clearGrid = () => {
    let newGrid = []
    for (let x = 0; x < this.state.gridDimensions; x++) {
      let rowOfCells = []
      for (let y = 0; y < this.state.gridDimensions; y++) {
        rowOfCells.push({
          xVal: y,
          yVal: x,
          isAlive: false,
        });
      }
      newGrid.push(rowOfCells);
    }
    this.setState({
      currentGrid: newGrid,
      generation: 0,
      gameOn: false
    })
  }
  // clear grid^^^^^^^------------------------------------------------------------------------------------------

  toggleCell = cell => {
    let curGrid = this.state.currentGrid;

    curGrid[cell.yVal][cell.xVal].isAlive = !cell.isAlive
    this.setState({
      currentGrid: curGrid
    });
  };
  // toggle dead/alive^^^^^^^------------------------------------------------------------------------------------------


  gameAlgo = () => {
    //start from neighbor on top and work clockwise around each cell
    //first count up the neighbors
    let nextGenGrid = [];
    const size = this.state.gridDimensions;
    
    //send the current state into a mutable variable
    for (let x = 0; x < size; x++) {
      let gridRow = []
      for (let y = 0; y < size; y++) {
        gridRow.push({...this.state.currentGrid[x][y]})
      }
      nextGenGrid.push(gridRow);
    }
    //this loops down each column, starting at the top left, first if will be right, then move clockwise
    //the first if statement is to avoid errors for when cell does not have a neighbor to a specific direction
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        let liveNeighbors = 0;
        //right neighbor
        if (x < size - 1) {
          if (this.state.currentGrid[y][x+1].isAlive) {
            liveNeighbors++
            console.log('right works!!!!', liveNeighbors, x, y)
          }
        }
        //bottom-right neighbor
        if (y < size - 1 && x < size - 1) {
          if (this.state.currentGrid[y+1][x+1].isAlive) {
            liveNeighbors++
            console.log('bottom-right works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }
        //bottom neighbor
        if (y < size - 1) {
          if (this.state.currentGrid[y+1][x].isAlive) {
            liveNeighbors++
            console.log('bottom works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }
        //bottom-left
        if (y < size - 1 && x > 0) {
          if (this.state.currentGrid[y+1][x-1].isAlive) {
            liveNeighbors++
            console.log('bottom-left works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }
        //left
        if (x > 0) {
          if (this.state.currentGrid[y][x-1].isAlive) {
            liveNeighbors++
            console.log('left works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }
        //top-left
        if (x > 0 && y > 0) {
          if (this.state.currentGrid[y-1][x-1].isAlive) {
            liveNeighbors++
            console.log('top-left works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }
        // above neighbor
        if (y > 0) {
          if (this.state.currentGrid[y-1][x].isAlive) {
            liveNeighbors++
            console.log('top works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }
        // top right neighbor
        if (y > 0 && x < size - 1) {
          if (this.state.currentGrid[y-1][x+1].isAlive) {
            liveNeighbors++
            console.log('top-right works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }
        // apply life/death rules based on neighbor count
        //life
        //cell is dead and has 3 neighbors it comes to life
        if (this.state.currentGrid[y][x].isAlive === false && liveNeighbors === 3) {
          nextGenGrid[y][x].isAlive = true;
        }
        //death
        // less than 2 neighbors, dies of underpopulation
        // more than 3 neighbors, dies of overpopulation
        if (this.state.currentGrid[y][x].isAlive === true && (liveNeighbors > 3 || liveNeighbors < 2)) {
            nextGenGrid[y][x].isAlive = false;
        }
      }
    }
    // increse generation by 1
    this.setState({
      generation: this.state.generation + 1,
      currentGrid: nextGenGrid
    })
  }
  //Game algo^^^-----------------------------------------------------------------------------------------------


  //start game-- has button on controlbar
  startGame = () => {
    this.setState({
      gameOn: true
    });
    this.nextGeneration()
  }

  //game continues-- no button on control bar
  nextGeneration = () => {
    this.gameAlgo();
    setTimeout(() => {
      if (this.state.gameOn) {
        this.nextGeneration()
      }
    }, this.state.gameSpeed)
  };

  //stop game--- has button on CB
  stopGame = () => {
    this.setState({
      gameOn: false
    });
  };

  increaseSpeed = () => {
    if (this.state.gameSpeed === 100) {
      window.alert('You\'ve reached the speed limit!')
    } else {
      this.setState({
        gameSpeed: this.state.gameSpeed - 100,
        displaySpeed: this.state.displaySpeed + 1
      })
    }
  }

  decreaseSpeed = () => {
    if( this.state.gameSpeed === 1000) {
      window.alert('Cannot go any slower!')
    } else {
      this.setState({
        gameSpeed: this.state.gameSpeed + 100,
        displaySpeed: this.state.displaySpeed -1
      })
    }
  }



  render() {
    return (
      <div className="App">
        <p>James Basile: Conway's Game of Life</p>

      <AppWrapper>
        <GameWrapper>
        <p>Generation: {this.state.generation}</p>
        <p>Game Speed: {this.state.displaySpeed}</p>
        <Grid
          currentGrid={this.state.currentGrid}
          size={this.state.gridDimensions}
          toggleCell={this.toggleCell}
        />
        </GameWrapper>
        <ControlWrapper>
        <TopBar
          startGame={this.startGame}
          stopGame={this.stopGame}
          nextGen={this.gameAlgo}
          increaseSpeed={this.increaseSpeed}
          decreaseSpeed={this.decreaseSpeed}
        />
        <ControlBar
          gridReset={this.setNewDimensions}
          randomizeGrid={this.randomizeGrid}
          clearGrid={this.clearGrid}
          stopGame={this.stopGame}
        />
        </ControlWrapper>
        </AppWrapper>
      </div>
    )
  }
}




export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

const GameWrapper = styled.div`
  display: flex;
  width: 48%; 
  flex-wrap: wrap;
`


const ControlWrapper = styled.div`
  width: 48%;
  flex-direction: column;
`
