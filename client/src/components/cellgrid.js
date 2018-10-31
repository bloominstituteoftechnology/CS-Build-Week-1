import React, { Component } from 'react';
import Cell from './cell';

class CellGrid extends Component {
    constructor(props) {
        super(props);
        this.buffer1 = 0;
        this.buffer2 = new Map();
        this.liveCells = new Map();
        this.deadCells = new Map();
        this.state = {
            size: [50, 40],
            generation: 0
        }
    }

    ComponentDidMount() {
        console.log(this.props, this.liveCells, this.deadCells);
        if(this.props.simActive ==  true){
            this.addBuffer();
        }
    }

    addLiveCell(position) {
        this.liveCells.set(position.x + ',' + position.y, {x : position.x, y: position.y});
    }

    removeDeadCell(position) {
        this.liveCells.delete(position);
    }

    isCellAlive(position) {
        return this.liveCells.has(position);
    }

    liveNeighbors(position){
        let liveNeighbors = 0;

        for(let i = position.x - 1; i <= position.x + 1; i++){
            for(let j = position.y - 1; j <= position.y + 1; j++){

                if(i == position.x && j == position.y)
                    continue;

                if(this.isCellAlive(i + ',' + j))
                    liveNeighbors++;
                
                else
                    this.deadCells.set(i + ',' + j, {x: i, y: j});
            }
        }

        if((liveNeighbors == 2 || liveNeighbors == 3))
            this.buffer2.set(position.x + ',' + position.y, {x: position, y: position});

    }

    storeCell(position) {
        if(this.isCellAlive(position.x + ',' + position.y)) {
             this.removeDeadCell(position.x + ',' + position.y);
        }
        
        else
        this.addLiveCell(position);
        console.log(this.liveCells);

    }

    addBuffer() {
        this.liveCells.forEach((i) => {
            this.liveNeighbors(i);
        })

        this.deadCells.forEach((i) => {
            this.deadNeighbors(i);
        })

        this.state.generation++;
        this.props.upGeneration();
    }

    renderBoard() {
        let newGrid = [];
        let cellRow = [];

        for(let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this.state.size[1]; j++) {
                cellRow.push(<Cell key={[i, j]} position={{x : i, y : j}} storeCell={this.storeCell.bind(this)} />);
            }
            newGrid.push(<div className="row" key={i}>{cellRow}</div>)
            cellRow = [];
        }

        return newGrid;
    }


    render() {
        return <div className="grid-container"> {this.renderBoard()} </div>
    }

    
}

export default CellGrid;