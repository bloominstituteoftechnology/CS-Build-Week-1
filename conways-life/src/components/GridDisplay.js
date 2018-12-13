import React, { Component } from 'react';
import Cell from "./Cell";
import Buttons from "./ControlButtons";
import Options from "./GridOptions";

 class GridDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            timer: 0,
            iterations: 0,
            cols: 15,
            rows: 15,
            speed: 300,
            multicolor: false
        }
    }

     componentDidMount() {
        let arr = this.make2DArray();
        this.setState({ grid: arr });
    }

     make2DArray = () => {
        let arr = new Array(this.state.cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.state.rows);
        }
        for (let i = 0; i < this.state.cols; i++) {
            for (let j = 0; j < this.state.rows; j++) {
                arr[i][j] = { value: 0, x: i, y: j };
            }
        } 
        return arr;
    }

     randomGrid = () => {
        let arr = this.state.grid.slice();
         for (let i = 0; i < this.state.cols; i++) {
            for (let j = 0; j < this.state.rows; j++) {
                arr[i][j].value = Math.round(Math.random());
            }                     // random 0 or 1
        } 
         this.setState({ grid: arr, iterations: 0 });
    }

     clearGrid = () => {
        let arr = this.state.grid.slice();
         for (let i = 0; i < this.state.cols; i++) {
            for (let j = 0; j < this.state.rows; j++) {
                arr[i][j].value = 0;
            }
        } 
         this.setState({ grid: arr, iterations: 0 });
    }

     computeNextGrid = () => {
        let prevGrid = this.state.grid;
        let nextGrid = this.make2DArray();
        
        for (let i = 0; i < this.state.cols; i++) {
            for (let j = 0; j < this.state.rows; j++) {
                let cellState = prevGrid[i][j].value;
                // Count live neighbors
                let neighbors = this.countNeighbors(prevGrid, i, j);
        
                if (cellState === 0 && neighbors === 3) {
                nextGrid[i][j].value = 1;
                } else if (cellState === 1 && (neighbors < 2 || neighbors >= 4)) {
                nextGrid[i][j].value = 0;
                } else if (cellState === 1 && (neighbors === 3 || neighbors === 2)){
                nextGrid[i][j].value = 1;
                } else {
                nextGrid[i][j].value = cellState;
                }
        
            }
        }
            let nextIter = this.state.iterations;
            nextIter++;
        
            this.setState({ grid: nextGrid, iterations: nextIter });
    }

     countNeighbors = (grid, x, y) => {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
            // edges wrap around
            let col = (x + i + this.state.cols) % this.state.cols;
            let row = (y + j + this.state.rows) % this.state.rows;
            sum += grid[col][row].value;
            }
        }
        // subtract the center cell
        sum -= grid[x][y].value;
        return sum;
    }

     updateGrid = (value, x, y) => {
        let arr = this.state.grid.slice();
  
        arr[x][y].value = value;
        this.setState({ grid: arr });
    }

     toggleAnimation = () => {
        let speed = this.state.speed;
        if (speed < 30) {
            speed = 30;
        }
        if (this.state.timer === 0) {
            let timer = setInterval(this.computeNextGrid, speed);
            this.setState({timer: timer});
        } else {
            clearInterval(this.state.timer);
            this.setState({timer: 0});
        }
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({ [name]: value });
      }

    render() {
            return (
            <div className="mainContainer">
                <h2>Conway's Game of Life</h2>
                <p>Generation: {this.state.iterations}</p>
                 <div className="gridContainer">
                    {this.state.grid.map(row => 
                        row.map((cell, index) => 
                        <Cell
                            key={index}
                            value={cell.value}
                            x={cell.x}
                            y={cell.y}
                            multicolor={this.state.multicolor}
                            animation={this.state.timer}
                            updateGrid={this.updateGrid}/>
                    ))}
                </div>
                <Buttons
                    randomGrid={this.randomGrid}
                    clearGrid={this.clearGrid}
                    stepForward={this.computeNextGrid}
                    toggleAnimation={this.toggleAnimation}
                    />
                <Options
                    speed={this.state.speed}
                    multicolor={this.state.multicolor}
                    handleInputChange={this.handleInputChange}
                />
            </div>
          );
        }
}

export default GridDisplay;