import React, { Component } from 'react';
import Cell from "./Cell";

class GridDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            cols: 15,
            rows: 15
        }
    }

    componentDidMount() {
        this.make2DArray();
    }

    make2DArray() {
        let arr = new Array(this.state.cols);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array(this.state.rows);
        }
        for (let i = 0; i < this.state.cols; i++) {
            for (let j = 0; j < this.state.rows; j++) {
                arr[i][j] = Math.round(Math.random()); //new Cell(i, j)
            }
        } 
        this.setState({ grid: arr });
    }

    render() {
        return (
            <div className="gridContainer">
                {this.state.grid.map(row => 
                    row.map((cell, index) => 
                       <Cell key={index} cell={cell}/>
                
                ))}
            </div>
          );
        }
}

export default GridDisplay;