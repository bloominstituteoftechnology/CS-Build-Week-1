import React, { Component } from 'react';

export default class Grid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            size: [15, 15],
            isRunning: false,
        }
    }

    gridSize() {
        let cellColumn = [];
        let cellRow = [];

        for(let i = 0; i < this.state.size[0]; i++) {
            for(let j = 0; j < this.state.size[1]; j++) {
                cellRow.push()
            }
            cellColumn.push(<div key={i}>{cellRow}</div>)
            cellRow = [];
        }

        return cellColumn;
    }

    render() {
        return(
        <div>
        <label>
            Rows:
            <input type="text" value={this.state.size[1]} onChange={this.handleRow}/>
        </label>
        <label>
            Columns:
            <input type="text" value={this.state.size[0]} onChange={this.handleColumn}/>
        </label>
        </div>
        )
    }
}