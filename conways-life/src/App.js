import React, { Component } from 'react';
import Cell from './components/cell';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCells: 400,
      grid: [],
      isClickable: true,
      currGen: 1 // current generation of cells
    };
  }

  componentDidMount() {
    let grid = [];
    for (let i = 0; i < this.state.totalCells; i++) {
      grid.push({ isAlive: false });
    }

    this.setState({ grid: grid });
  }

  // Update the grid upon clicking a cell
  cellClickHandler = id => {
    if (this.state.isClickable) {
      console.log(id);
      let grid = this.state.grid.slice();
      grid[id].isAlive = !grid[id].isAlive;
      console.log(grid[id]);

      this.setState({ grid: grid });
    }
  };

  gridResetHandler = () => {
    let grid = [];
    for (let i = 0; i < this.state.totalCells; i++) {
      grid.push({ isAlive: false });
    }

    this.setState({ grid: grid });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <header>Conway's Game of Life</header>
          <h2>Generation #{this.state.currGen}</h2>
          <div className="grid">
            {this.state.grid.map((cell, index) => (
              <Cell
                key={index}
                id={index}
                isAlive={cell.isAlive}
                isClickable={this.state.isClickable}
                cellClickHandler={this.cellClickHandler}
              />
            ))}
          </div>
          <div className="btns">
            <button>Play</button>
            <button>Pause</button>
            <button onClick={this.gridResetHandler}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
