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
        let neighborCount = 0;
        let matrix = this.state.matrix.slice();

        if (aliveArr.i + 1 <= 14 && aliveArr.j + 1 <= 14 && matrix[aliveArr.i + 1][aliveArr.j + 1].alive) {
            neighborCount += 1;
        }
        if (aliveArr.j - 1 >= 0 && matrix[aliveArr.i][aliveArr.j - 1].alive) {
            neighborCount += 1;
        }
        if (aliveArr.j + 1 <= 14 && matrix[aliveArr.i][aliveArr.j + 1].alive) {
            neighborCount += 1;
        }
        if (aliveArr.i - 1 >= 0  && matrix[aliveArr.i - 1][aliveArr.j].alive) {
            neighborCount += 1;
        }
        if (aliveArr.i + 1 <= 14 && matrix[aliveArr.i + 1][aliveArr.j].alive) {
            neighborCount += 1;
        }
        if (aliveArr.i + 1 <= 14 && aliveArr.j - 1 >= 0  && matrix[aliveArr.i + 1][aliveArr.j - 1].alive) {
            neighborCount += 1;
        }
        if (aliveArr.i - 1 >= 0  && aliveArr.j - 1 >= 0 && matrix[aliveArr.i - 1][aliveArr.j - 1].alive) {
            neighborCount += 1;
        }
        if (aliveArr.i - 1 >= 0 && aliveArr.j + 1 <= 14 && matrix[aliveArr.i - 1][aliveArr.j + 1].alive) {
            neighborCount += 1;
        }

        if (neighborCount === 2 || neighborCount === 3) {
        }
        else {
            matrix[aliveArr.i][aliveArr.j].alive = false;
        }

        this.setState({ matrix });
    }
    //TODO 
    playButton = () => {
        let alive = this.findAlive();

        for (let i = 0; i < alive.length; ++i) {
            this.neighborCheck(alive[i]);
        }

        console.log(this.findAlive());
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