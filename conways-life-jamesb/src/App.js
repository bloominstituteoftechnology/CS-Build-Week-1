import React from 'react'
import './App.css'
import Grid from '../src/components/Grid/Grid'
import ControlBar from '../src/components/ControlBar/ControlBar'



class App extends React.Component {
  // on load, state should be a 15x15 grid with all cells set to dead
  state = {
    currentGrid: [],
    gridDimensions: 15,
    generation: 0
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
      generation: 0
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
    let nextGenGrid = []



    const size = this.state.gridDimensions;
    const curGrid = this.state.currentGrid;
    //send the current state into a mutable variable
    nextGenGrid.push(...curGrid);



    //this loops down each column, starting at the top left, first if will be right, then move clockwise
    //the first if statement is to avoid errors for when cell does not have a neighbor to a specific direction
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        let liveNeighbors = 0;


        //right neighbor
        if (x < size - 1) {
          if (curGrid[y][x + 1].isAlive) {
            liveNeighbors++
            console.log('right works!!!!', liveNeighbors, x, y)
          }
        }

        //bottom-right neighbor
        if (y < size - 1 && x < size - 1) {
          if (curGrid[y + 1][x + 1].isAlive) {
            liveNeighbors++
            console.log('bottom-right works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }

        //bottom neighbor
        if (y < size - 1) {
          if (curGrid[y + 1][x].isAlive) {
            liveNeighbors++
            console.log('bottom works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }

        //bottom-left
        if (y < size - 1 && x > 0) {
          if (curGrid[y + 1][x - 1].isAlive) {
            liveNeighbors++
            console.log('bottom-left works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }

        //left
        if (x > 0) {
          if (curGrid[y][x - 1].isAlive) {
            liveNeighbors++
            console.log('left works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }

        //top-left
        if (x > 0 && y > 0) {
          if (curGrid[y - 1][x - 1].isAlive) {
            liveNeighbors++
            console.log('top-left works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }

        // above neighbor
        if (y > 0) {
          if (curGrid[y - 1][x].isAlive) {
            liveNeighbors++
            console.log('top works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }

        // top right neighbor
        if (y > 0 && x < size - 1) {
          if (curGrid[y - 1][x + 1].isAlive) {
            liveNeighbors++
            console.log('top-right works!!!!', liveNeighbors, '     X,Y:', x, y)
          }
        }

        // apply life/death rules based on neighbor count

        //life
        //cell is dead and has 3 neighbors it comes to life
        if (curGrid[y][x].isAlive === false && liveNeighbors === 3) {
          nextGenGrid[y][x].isAlive = true;
        }

        //death
        // less than 2 neighbors, dies of underpopulation
        // more than 3 neighbors, dies of overpopulation
        if (curGrid[y][x].isAlive === true && (liveNeighbors < 2 || liveNeighbors > 3)) {
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

  render() {
    return (
      <div className="App">
        <p>James Basile: Conway's Game of Life</p>
        <p>Generation: {this.state.generation}</p>
        <Grid
          currentGrid={this.state.currentGrid}
          size={this.state.gridDimensions}
          toggleCell={this.toggleCell}
        />
        <ControlBar
          gridReset={this.setNewDimensions}
          randomizeGrid={this.randomizeGrid}
          clearGrid={this.clearGrid}
          nextGen={this.gameAlgo}
        />
      </div>
    )
  }
}




export default App;
