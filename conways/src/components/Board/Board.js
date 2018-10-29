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
        var matrix = this.state.matrix.slice();
        for (var i = 0; i < 15; i++) {
            matrix[i] = [];
            for (var j = 0; j < 15; j++) {
                matrix[i][j] = undefined;
            }
        }
        this.setState({ matrix });
    }

    render() {
        return (
            <div className="board-ctn">
                {
                    this.state.matrix.map(cell => {
                        return (
                            cell.map(mini => {
                                return (<Cell clickEnabled={this.state.clickEnabled}/>);
                            })
                        );
                    })
                }
            </div>
        )
    }
}

export default Board;