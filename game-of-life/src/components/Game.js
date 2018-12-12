import React from 'react';
import Presets from './Presets';
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'
import './Game.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faStepForward, faEraser } from '@fortawesome/free-solid-svg-icons'

configureAnchors({ offset: -150, scrollDuration: 600 })

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isRunning: false,
            iterationCount: 0,
            cellColor: '#0074D9',
            gridColor: 'white',
            gridSize: 'small',
            smallGridButton: 'selected',
            largeGridButton: 'notSelected'
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

        this.clearGrid = () => {
            let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
            if (this.state.gridSize === 'large') {
                grid = Array(30).fill(null).map(_ => Array(30).fill(false));
            }
            this.setState({ grid: grid, isRunning: false, iterationCount: 0 });
            window.clearTimeout(this.timeout);
        };

        this.usePreset = event => {
            if(event.target.value === 'None') {
                return;
            }
            if(event.target.value === 'random') {
                this.createRandomGrid();
                return;
            }
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

        this.createRandomGrid = () => {
            clearTimeout(this.timeout);
            let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
            if (this.state.gridSize === 'large') {
                grid = Array(30).fill(null).map(_ => Array(30).fill(false));
            }
            for(let i = 0; i < grid.length; i++) {
                for(let j = 0; j < grid.length; j++) {
                    if (Math.random() < .5) {
                        grid[i][j] = !grid[i][j];
                    }
                }
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
            if(this.state.gridSize === 'small') {
                this.setState({
                    gridSize: event.target.value,
                    smallGridButton: 'notSelected',
                    largeGridButton: 'selected'
                }, () => {
                    this.clearGrid(event);
                    });
            }
            if (this.state.gridSize === 'large') {
                this.setState({
                    gridSize: event.target.value,
                    smallGridButton: 'selected',
                    largeGridButton: 'notSelected'
                }, () => {
                    this.clearGrid(event);
                });
            }
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
                <ScrollableAnchor id={'game'}>
                    <div className={`game ${this.state.gridSize}`}>
                        <h1>John Conway's Game of Life</h1>
                        <div className="grid-container" style={{ backgroundColor: this.state.gridColor }}>
                            {this.state.grid.map((row, rowIndex) => {
                                return <div key={rowIndex}
                                    className="row">{row.map((cell, cellIndex) => {
                                        if (cell) {
                                            return <div key={cellIndex}
                                                className="live-cell"
                                                style={{ backgroundColor: this.state.cellColor }}
                                                onClick={!this.state.isRunning ?
                                                    () => this.toggleCell(rowIndex, cellIndex) : null}
                                            >{cell}</div>;
                                        } else return <div key={cellIndex}
                                            className="dead-cell"
                                            style={{ backgroundColor: this.state.gridColor }}
                                            onClick={!this.state.isRunning ?
                                                () => this.toggleCell(rowIndex, cellIndex) : null}
                                        >{cell}</div>;
                                    })}</div>;
                            })}
                        </div>
                        <div className="generation-count">Generation {this.state.iterationCount}</div>
                        <div className="controls">
                            <FontAwesomeIcon onClick={this.startGame} icon={faPlay} size="2x"/>
                            <FontAwesomeIcon onClick={this.stopGame} icon={faStop} size="2x"/>
                            <FontAwesomeIcon onClick={this.advanceOneStep} icon={faStepForward} size="2x"/>
                            <FontAwesomeIcon onClick={this.clearGrid} icon={faEraser} size="2x"/>
                        </div>
                    </div>
                </ScrollableAnchor>
                <ScrollableAnchor id={'options'}>
                    <div className="options">
                    <h1>Options</h1>
                        <div className="option-settings">
                                <div className="option-labels">
                                    <p>Size</p>
                                    <p>Pattern</p>
                                    <p>Grid Color</p>
                                    <p>Cell Color</p>
                                </div>
                                <div className="option-controls">
                                    <div className="size-options">
                                        <button className={this.state.smallGridButton} onClick={this.handleGridSizeChange} value={'small'}>small</button>
                                        <button className={this.state.largeGridButton} onClick={this.handleGridSizeChange} value={'large'}>large</button>
                                    </div>
                                    <div className="dropdowns">
                                        <select value={this.state.value} onChange={this.usePreset}>
                                        <option>None</option>
                                        <option value="random">Random</option>
                                            <option value="glider">Glider</option>
                                            <option value="small exploder">Small Exploder</option>
                                            <option value="exploder">Exploder</option>
                                            <option value="row">Row</option>
                                        </select>
                                        <select value={this.state.value} onChange={this.handleGridColorChange}>
                                            <option style={{ backgroundColor: "white", color: "black" }} value="white">White</option>
                                            <option style={{ backgroundColor: "#0074D9" }} value="#0074D9">Blue</option>
                                            <option style={{ backgroundColor: "#7FDBFF" }} value="#7FDBFF">Aqua</option>
                                            <option style={{ backgroundColor: "#39CCCC" }} value="#39CCCC">Teal</option>
                                            <option style={{ backgroundColor: "#2ECC40" }} value="#2ECC40">Green</option>
                                            <option style={{ backgroundColor: "#FFDC00" }} value="#FFDC00">Yellow</option>
                                            <option style={{ backgroundColor: "#FF851B" }} value="#FF851B">Orange</option>
                                            <option style={{ backgroundColor: "#FF4136" }} value="#FF4136">Red</option>
                                            <option style={{ backgroundColor: "#B10DC9" }} value="#B10DC9">Purple</option>
                                            <option style={{ backgroundColor: "#85144b" }} value="#85144b">Maroon</option>
                                            <option style={{ backgroundColor: "#AAAAAA" }} value="#AAAAAA">Gray</option>
                                        </select>
                                        <select value={this.state.value} onChange={this.handleCellColorChange}>
                                            <option style={{ backgroundColor: "#0074D9" }} value="#0074D9">Blue</option>
                                            <option style={{ backgroundColor: "#7FDBFF" }} value="#7FDBFF">Aqua</option>
                                            <option style={{ backgroundColor: "#39CCCC" }} value="#39CCCC">Teal</option>
                                            <option style={{ backgroundColor: "#2ECC40" }} value="#2ECC40">Green</option>
                                            <option style={{ backgroundColor: "#FFDC00" }} value="#FFDC00">Yellow</option>
                                            <option style={{ backgroundColor: "#FF851B" }} value="#FF851B">Orange</option>
                                            <option style={{ backgroundColor: "#FF4136" }} value="#FF4136">Red</option>
                                            <option style={{ backgroundColor: "#B10DC9" }} value="#B10DC9">Purple</option>
                                            <option style={{ backgroundColor: "#85144b" }} value="#85144b">Maroon</option>
                                            <option style={{ backgroundColor: "#AAAAAA" }} value="#AAAAAA">Gray</option>
                                        </select>
                                    </div>
                                </div>     
                    </div>
                    </div>
                </ScrollableAnchor>
                <ScrollableAnchor id={'rules'}>
                    <div className="rules">
                        <h1>Rules</h1>
                        <p>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</p>
                        <p>Any live cell with two or three live neighbors lives on to the next generation.</p>
                        <p>Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
                        <p>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</p>
                    </div>
                </ScrollableAnchor>
                <ScrollableAnchor id={'about'}>
                    <div className="about">
                        <h1>About</h1>
                        <p>In late 1940, John von Neumann defined life as a creation (as a being or organism) which can reproduce itself and simulate a Turing machine. Von Neumann was thinking about an engineering solution which would use electromagnetic components floating randomly in liquid or gas. This turned out not to be realistic with the technology available at the time. Thus, ingeniously, Stanisław Ulam invented cellular automata, which were intended to simulate von Neumann's theoretical electromagnetic constructions. Ulam discussed using computers to simulate his cellular automata in a two-dimensional lattice in several papers. In parallel, Von Neumann attempted to construct Ulam's cellular automaton. Although successful, he was busy with other projects and left some details unfinished. His construction was complicated because it tried to simulate his own engineering design.</p>
                    </div>
                    </ScrollableAnchor>
            </div>
        );
    }
}

export default Game;