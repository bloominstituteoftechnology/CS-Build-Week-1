import React, { Component } from 'react';
import './Board.css';
import Cell from './Cell';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickEnabled: true,
            matrix: [],
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
        this.setState({ matrix });
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

    //Finds matrices at specific indices
    findIndex = (i, j) => {
        return this.state.matrix[i][j];
    }

    //Checks if game is active, if not then it toggles cell from dead to alive(false to true)
    toggleClick = index => {
        if (this.state.clickEnabled) {
            let matrix = this.state.matrix.slice();
            matrix[index.i][index.j].alive = !matrix[index.i][index.j].alive;

            this.setState({ matrix })

            console.log("Clicked Index", this.findIndex(index.i, index.j));
        }
    }

    //Passes in matrices at specific index and changes alive property
    toggleAlive = matrices => {
        matrices.alive = !matrices.alive;
        return matrices;
    }

    //Sets board to default
    clearButton = () => {
        this.setBoard();
    }
    neighborCheck = (aliveArr) => {
        let newMatrix = [];
        for (let i = 0; i < 15; ++i) {
            newMatrix[i] = [];
            for (let j = 0; j < 15; ++j) {
                let neighborCount = 0;

                if (aliveArr[i][j].i + 1 <= 14 && aliveArr[i][j].j + 1 <= 14 && aliveArr[i + 1][j + 1].alive) {
                    neighborCount += 1;
                }
                if (aliveArr[i][j].j - 1 >= 0 && aliveArr[i][j - 1].alive) {
                    neighborCount += 1;
                }
                if (aliveArr[i][j].j + 1 <= 14 && aliveArr[i][j + 1].alive) {
                    neighborCount += 1;
                }
                if (aliveArr[i][j].i - 1 >= 0 && aliveArr[i - 1][j].alive) {
                    neighborCount += 1;
                }
                if (aliveArr[i][j].i + 1 <= 14 && aliveArr[i + 1][j].alive) {
                    neighborCount += 1;
                }
                if (aliveArr[i][j].i + 1 <= 14 && aliveArr[i][j].j - 1 >= 0 && aliveArr[i + 1][j - 1].alive) {
                    neighborCount += 1;
                }
                if (aliveArr[i][j].i - 1 >= 0 && aliveArr[i][j].j - 1 >= 0 && aliveArr[i - 1][j - 1].alive) {
                    neighborCount += 1;
                }
                if (aliveArr[i][j].i - 1 >= 0 && aliveArr[i][j].j + 1 <= 14 && aliveArr[i - 1][j + 1].alive) {
                    neighborCount += 1;
                }
                if (neighborCount === 2 || neighborCount === 3) {
                    newMatrix[i][j] = { i: aliveArr[i][j].i, j: aliveArr[i][j].j, alive: true };
                }
                else {
                    newMatrix[i][j] = { i: aliveArr[i][j].i, j: aliveArr[i][j].j, alive: false };
                }
            }
        }
        return newMatrix;
    }
    //TODO 
    playButton = () => {
        let matrixDupe = this.state.matrix.slice();
        let matrix = this.neighborCheck(matrixDupe);

        this.setState({ matrix });
    }

    render() {
        return (
            <div className="interface-ctn">
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
                    <button className="main-btn">Pause</button>
                    <button className="main-btn" onClick={() => this.clearButton()}>Clear</button>
                </div>
            </div>
        )
    }
}

export default Board;