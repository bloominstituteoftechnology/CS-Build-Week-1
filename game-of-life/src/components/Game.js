import React from 'react';
import Presets from './Presets';
import './Game.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isRunning: false,
            iterationCount: 0,
            cellColor: '#0074D9',
            gridColor: 'white',
            gridSize: 'small'
        };

        this.startGame = event => {
            event.preventDefault();
            if (this.state.isRunning) {
                return;
            }
            this.setState({ isRunning: true });
            this.continueGame();
        };

        this.stopGame = event => {
            event.preventDefault();
            if (!this.state.isRunning) {
                return;
            }
            window.clearTimeout(this.timeout);
            this.setState({ isRunning: false });
        };

        this.continueGame = () => {
                let grid = this.state.grid.map(row => row.slice());
                for (let i = 0; i < grid.length; i++) {
                    for (let j = 0; j < grid[i].length; j++) {
                        let count = this.countNeighbors(i, j);
                        if (grid[i][j]) {
                            if (count < 2 || count > 3) {
                                grid[i][j] = false;
                            }
                        } else {
                            if (count === 3) {
                                grid[i][j] = true;
                            }
                        }
                    }
                }
                this.setState({
                    grid: grid,
                    iterationCount: this.state.iterationCount + 1
                });

                this.timeout = setTimeout(() => {
                    this.continueGame();
                }, 500);
        };

        this.advanceOneStep = event => {
            event.preventDefault();
            if (this.state.isRunning) {
                return;
            }
            this.continueGame();
            window.clearTimeout(this.timeout);
            this.setState({ isRunning: false });
        };

        this.countNeighbors = (rowIndex, cellIndex) => {
            const neighbors = [
                [rowIndex - 1, cellIndex - 1],
                [rowIndex - 1, cellIndex],
                [rowIndex - 1, cellIndex + 1],
                [rowIndex, cellIndex - 1],
                [rowIndex, cellIndex + 1],
                [rowIndex + 1, cellIndex - 1],
                [rowIndex + 1, cellIndex],
                [rowIndex + 1, cellIndex + 1]
            ];

            let count = 0;

            for (let i = 0; i < neighbors.length; i++) {
                if(this.state.gridSize === 'small') {
                    if ((neighbors[i][0] >= 0 && neighbors[i][0] <= 14) &&
                        (neighbors[i][1] >= 0 && neighbors[i][1] <= 14)) {
                        const position = neighbors[i];
                        if (this.state.grid[position[0]][position[1]]) {
                            count += 1;
                        }
                    }
                }
                if (this.state.gridSize === 'large') {
                    if ((neighbors[i][0] >= 0 && neighbors[i][0] <= 29) &&
                        (neighbors[i][1] >= 0 && neighbors[i][1] <= 29)) {
                        const position = neighbors[i];
                        if (this.state.grid[position[0]][position[1]]) {
                            count += 1;
                        }
                    }
                }
            }
            return count;
        };

        this.toggleCell = (rowIndex, cellIndex) => {
            let grid = this.state.grid;
            grid[rowIndex][cellIndex] = !grid[rowIndex][cellIndex];
            this.setState({ grid: grid });
        };

        this.clearGrid = event => {
            let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
            if (this.state.gridSize === 'large') {
                grid = Array(30).fill(null).map(_ => Array(30).fill(false));
            }
            this.setState({ grid: grid, isRunning: false, iterationCount: 0 });
            window.clearTimeout(this.timeout);
        };

        this.usePreset = event => {
            clearTimeout(this.timeout);
            let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
            if (this.state.gridSize === 'large') {
                grid = Array(30).fill(null).map(_ => Array(30).fill(false));
            }
            const presetToLoad = Presets[event.target.value];
            if(this.state.gridSize === 'small') {
                presetToLoad.forEach(position => {
                    grid[position[0]][position[1]] = true;
                });
            }
            if(this.state.gridSize === 'large') {
                presetToLoad.forEach(position => {
                    grid[position[0] + 7][position[1] + 7] = true;
                });
            }
            this.setState({
                grid: grid,
                isRunning: false,
                iterationCount: 0
            });
        };

        this.handleCellColorChange = event => {
            this.setState({ cellColor: event.target.value });
        };

        this.handleGridColorChange = event => {
            this.setState({ gridColor: event.target.value });
        };

        this.handleGridSizeChange = event => {
            this.setState({
                gridSize: event.target.value
            }, () => {
                this.clearGrid(event);
            });
        };
    }

    componentDidMount() {
        let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
        if (this.state.gridSize === 'large') {
            grid = Array(30).fill(null).map(_ => Array(30).fill(false));
        }
        this.setState({ grid: grid });
    }

    render() {
        return (
            <div className="container">
                <div className="size-options">
                    <button onMouseDown={this.handleGridSizeChange} value={'small'}>small</button>
                    <button onMouseDown={this.handleGridSizeChange} value={'large'}>large</button>
                </div>
                <div>{this.state.iterationCount} generations</div>
                <div className="grid-container" style={{ backgroundColor: this.state.gridColor }}>
                    {this.state.grid.map((row, rowIndex) => {
                        return <div key={rowIndex}
                            className="row">{row.map((cell, cellIndex) => {
                                if(cell) {
                                    return <div key={cellIndex}
                                        className="live-cell"
                                        style={{backgroundColor: this.state.cellColor}}
                                        onClick={!this.state.isRunning ?
                                            () => this.toggleCell(rowIndex, cellIndex) : null}
                                    >{cell}</div>;   
                                } else return <div key={cellIndex}
                                    className="dead-cell"
                                    style={{ backgroundColor: this.state.gridColor }}
                                    onClick={!this.state.isRunning ?
                                        () => this.toggleCell(rowIndex, cellIndex) :
                                        null}
                                >{cell}</div>;
                            })}</div>;
                    })}
                </div>
                <div className="controls">
                    <p onClick={this.startGame}>start</p>
                    <p onClick={this.stopGame}>stop</p>
                    <p onClick={this.clearGrid}>clear</p>
                    <p onClick={this.advanceOneStep}>next</p>
                </div>
                <div className="options">
                    <label>pattern: </label>
                    <select value={this.state.value} onChange={this.usePreset}>
                        <option value="glider">Glider</option>
                        <option value="small exploder">Small Exploder</option>
                        <option value="exploder">Exploder</option>
                        <option value="row">Row</option>
                    </select>
                    <label>grid color: </label>
                    <select value={this.state.value} onChange={this.handleGridColorChange}>
                        <option value="white">White</option>
                        <option value="#0074D9">Blue</option>
                        <option value="#7FDBFF">Aqua</option>
                        <option value="#39CCCC">Teal</option>
                        <option value="#2ECC40">Green</option>
                        <option value="#FFDC00">Yellow</option>
                        <option value="#FF851B">Orange</option>
                        <option value="#FF4136">Red</option>
                        <option value="#B10DC9">Purple</option>
                        <option value="#85144b">Maroon</option>
                        <option value="#AAAAAA">Gray</option>
                    </select>
                    <label>cell color: </label>
                    <select value={this.state.value} onChange={this.handleCellColorChange}>
                        <option value="#0074D9">Blue</option>
                        <option value="#7FDBFF">Aqua</option>
                        <option value="#39CCCC">Teal</option>
                        <option value="#2ECC40">Green</option>
                        <option value="#FFDC00">Yellow</option>
                        <option value="#FF851B">Orange</option>
                        <option value="#FF4136">Red</option>
                        <option value="#B10DC9">Purple</option>
                        <option value="#85144b">Maroon</option>
                        <option value="#AAAAAA">Gray</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default Game;