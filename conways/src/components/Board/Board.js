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

    toggleAlive = e => {
        if (this.state.clickEnabled) {
            let matrix = this.state.matrix.slice();
            let found = this.findIndex(e.i, e.j);

            found.alive = !found.alive;
            matrix[e.i][e.j] = found;
            
            this.setState({ matrix })
            console.log(this.findIndex(e.i, e.j));
        }
    }
    findIndex = (i, j) => {
        return this.state.matrix[i][j];
    }
    render() {
        return (
            <div className="board-ctn">
                {
                    this.state.matrix.map(cell => {
                        return (
                            cell.map((mini) => {
                                return (<Cell key={mini.i + mini.j} index={mini} clickEnabled={this.state.clickEnabled} toggleAlive={this.toggleAlive} />);
                            })
                        );
                    })
                }
            </div>
        )
    }
}

export default Board;