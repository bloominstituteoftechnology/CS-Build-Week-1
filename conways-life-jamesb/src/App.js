import React from 'react'
import './App.css'
import Grid from '../src/components/Grid/Grid'
import ControlBar from '../src/components/ControlBar/ControlBar'



class App extends React.Component {
    // on load, state should be a 15x15 grid with all cells set to dead
    state = {
        currentGrid: [],
        gridDimensions: 15
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

    componentDidUpdate() {
      console.log('Current Grid:', this.state.currentGrid)
    }


    render() {
        return (
            <div className="App">
                <p>GRID CONTAINER COMPONENT</p>
                <Grid
                currentGrid={this.state.currentGrid}
                />
            </div>
        )
    }
}




export default App;
