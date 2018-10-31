import React, { Component } from 'react';
import './Board.css';
import Cell from './Cell';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickEnabled: true,
            matrix: [],
            generation: 0,
            speed: 1000
        }
    }

    componentDidMount() {
        this.setBoard();
    }

    setBoard = () => {
        let matrix = this.state.matrix.slice();
        for (let i = 0; i < 15; i++) {
            matrix[i] = [];
            for (let j = 0; j < 15; j++) {
                matrix[i][j] = { i, j, alive: false };
            }
        }
        this.setState({ matrix, generation: 0 });
    }

    //Searches through entire matrix array and returns an array of all active cells
    findAlive = () => {
        let alive = [];
        for (let i = 0; i < this.state.matrix.length; i++) {
            for (let j = 0; j < this.state.matrix.length; j++) {
                if (this.state.matrix[i][j].alive === true) {
                    alive.push(this.state.matrix[i][j]);
                }
            }
        }
        return alive;
    }



    //Checks if game is active, if not then it toggles cell from dead to alive(false to true)
    toggleClick = index => {
        if (this.state.clickEnabled) {
            let matrix = this.state.matrix.slice();
            matrix[index.i][index.j].alive = !matrix[index.i][index.j].alive;

            this.setState({ matrix });

            console.log("Clicked Index", matrix[index.i][index.j]);
        }
    }
    //Checks if index is valid
    findIndex = (i, j) => {
        if (i < 0 || i > 14 || j < 0 || j > 14) {
            return null;
        }
        else {
            return true;
        }
    }
    nextGen = (oldMatrix) => {
        let newMatrix = [];
        for (let i = 0; i < 15; ++i) {
            newMatrix[i] = [];
            for (let j = 0; j < 15; ++j) {
                let neighborCount = 0;
                if (this.findIndex(oldMatrix[i][j].i - 1, oldMatrix[i][j].j + 1) && oldMatrix[i - 1][j + 1].alive) {
                    neighborCount += 1;
                }
                if (this.findIndex(oldMatrix[i][j].i - 1, oldMatrix[i][j].j) && oldMatrix[i - 1][j].alive) {
                    neighborCount += 1;
                }
                if (this.findIndex(oldMatrix[i][j].i - 1, oldMatrix[i][j].j - 1) && oldMatrix[i - 1][j - 1].alive) {
                    neighborCount += 1;
                }
                if (this.findIndex(oldMatrix[i][j].i, oldMatrix[i][j].j - 1) && oldMatrix[i][j - 1].alive) {
                    neighborCount += 1;
                }
                if (this.findIndex(oldMatrix[i][j].i + 1, oldMatrix[i][j].j - 1) && oldMatrix[i + 1][j - 1].alive) {
                    neighborCount += 1;
                }
                if (this.findIndex(oldMatrix[i][j].i + 1, oldMatrix[i][j].j) && oldMatrix[i + 1][j].alive) {
                    neighborCount += 1;
                }
                if (this.findIndex(oldMatrix[i][j].i + 1, oldMatrix[i][j].j + 1) && oldMatrix[i + 1][j + 1].alive) {
                    neighborCount += 1;
                }
                if (this.findIndex(oldMatrix[i][j].i, oldMatrix[i][j].j + 1) && oldMatrix[i][j + 1].alive) {
                    neighborCount += 1;
                }
                if (neighborCount === 2 || neighborCount === 3) {
                    newMatrix[i][j] = { i: oldMatrix[i][j].i, j: oldMatrix[i][j].j, alive: true };
                }
                else {
                    newMatrix[i][j] = { i: oldMatrix[i][j].i, j: oldMatrix[i][j].j, alive: false };
                }
            }
        }
        return newMatrix;
    }

    speedChange = (e) => {
        this.setState({ speed: e.target.value });
    }

    playButton = () => {
        this.interval = setInterval(() => {
            let matrix = this.state.matrix.slice();
            let generation = this.state.generation;
            matrix = this.nextGen(matrix);
            generation++;

            this.setState({ matrix, generation });
        }, this.state.speed);

    }

    pauseButton = () => {
        clearInterval(this.interval);
    }

    clearButton = () => {
        clearInterval(this.interval);
        this.setBoard();
    }

    render() {
        return (
            <div className="interface-ctn">
                <p align="left">Generation # {this.state.generation}</p>
                <div className="board">
                    {
                        this.state.matrix.map(cell => {
                            return (
                                cell.map((cell) => {
                                    return (<Cell key={cell.i + cell.j} index={cell} clickEnabled={this.state.clickEnabled} toggleClick={this.toggleClick} />);
                                })
                            );
                        })
                    }
                </div>
                <div className="btn-ctn">
                    <button className="main-btn" onClick={() => this.playButton()}>Play</button>
                    <button className="main-btn" onClick={() => this.pauseButton()}>Pause</button>
                    <button className="main-btn" onClick={() => this.clearButton()}>Clear</button>
                </div>
                <input
                    type="range"
                    min="100"
                    max="1000"
                    value={this.state.speed}
                    className="slider"
                    onChange={this.speedChange}
                />
            </div>
        )
    }
}

export default Board;