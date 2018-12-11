import React, { Component } from 'react';
import Cell from './components/cell';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCells: 400,
      grid: []
    };
  }

  componentDidMount() {
    let grid = [];
    for (let i = 0; i < this.state.totalCells; i++) {
      grid.push({ isAlive: false, isClickable: true });
    }
    console.log(grid);
    this.setState({ grid: grid });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <header>Conway's Game of Life</header>
          <div className="grid">
            {this.state.grid.map((cell, index) => (
              <Cell
                key={index}
                isAlive={cell.isAlive}
                isClickable={cell.isClickable}
              />
            ))}
          </div>
          <div className="btns">
            <button>Play</button>
            <button>Pause</button>
            <button>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
