import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      isClickable: true
    };

    this.toggleSimulation = e => {
      e.preventDefault();
      this.setState({ isClickable: !this.state.isClickable });
    };

    this.toggleCell = (rowIndex, cellIndex) => {
      let grid = this.state.grid;
      grid[rowIndex][cellIndex] = !grid[rowIndex][cellIndex];
      this.setState({ grid: grid });
    };

    this.clearGrid = e => {
      e.preventDefault();
      let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
      this.setState({ grid: grid });
    };
  }

  componentDidMount() {
    let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
    this.setState({ grid: grid });
  }

  render() {
    return (
      <div className="container">
        <div className="grid-container">
          {this.state.grid.map((row, rowIndex) => {
            return <div key={rowIndex}
                        className="row">{row.map((cell, cellIndex) => {
              return <div key={cellIndex}
                          className={cell ? "black-cell" : "white-cell"}
                          onClick={this.state.isClickable ?
                                   () => this.toggleCell(rowIndex, cellIndex) :
                                   null}
                     >{cell}</div>;
            })}</div>;
          })}
        </div>
        <button onClick={this.toggleSimulation}>start/stop</button>
        <button onClick={this.clearGrid}>clear</button>
      </div>
    );
  }
}

export default App;
