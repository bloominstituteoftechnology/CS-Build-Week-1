import React, { Component } from 'react';
import './Board.css';
import Cell from './Cell';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickEnabled: true,
            matrix: []
        }
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
    componentDidMount() {
        this.setBoard();
    }

    toggleClick = index => {
        if (this.state.clickEnabled) {
            let matrix = this.state.matrix.slice();
            matrix[index.i][index.j] = this.toggleAlive(this.findIndex(index.i, index.j));

            this.setState({ matrix })

            console.log(this.findAlive());
            console.log("Clicked Index", this.findIndex(index.i, index.j));
        }
    }

    toggleAlive = matrices => {
        matrices.alive = !matrices.alive;
        return matrices;
    }

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

    findIndex = (i, j) => {
        return this.state.matrix[i][j];
    }

    clearBoard = () => {
        this.setBoard();
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
                    <button className="main-btn">Play</button>
                    <button className="main-btn">Pause</button>
                    <button className="main-btn">Stop</button>
                    <button className="main-btn" onClick={() => this.clearBoard()}>Clear</button>
                </div>
            </div>
        )
    }
}

export default Board;