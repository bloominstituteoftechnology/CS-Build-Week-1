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
    componentDidMount() {
        let matrix = this.state.matrix.slice();
        for (let i = 0; i < 15; i++) {
            matrix[i] = [];
            for (let j = 0; j < 15; j++) {
                matrix[i][j] = { i, j, alive: false };
            }
        }
        this.setState({ matrix });
    }

    toggleClick = index => {
        if (this.state.clickEnabled) {
            let matrix = this.state.matrix.slice();
            let found = this.findIndex(index.i, index.j);

            matrix[index.i][index.j] = this.toggleAlive(found);

            this.setState({ matrix })
            console.log(this.findIndex(index.i, index.j));
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
        console.log(alive);
    }
    findIndex = (i, j) => {
        return this.state.matrix[i][j];
    }
    componentDidUpdate() {
        this.findAlive();
    }
    render() {
        return (
            <div className="board-ctn">
                {
                    this.state.matrix.map(cell => {
                        return (
                            cell.map((mini) => {
                                return (<Cell key={mini.i + mini.j} index={mini} clickEnabled={this.state.clickEnabled} toggleClick={this.toggleClick} />);
                            })
                        );
                    })
                }
            </div>
        )
    }
}

export default Board;