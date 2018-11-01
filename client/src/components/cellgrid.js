import React, { Component } from 'react';
import Cell from './cell';
import ReactTimeout from "react-timeout";

class CellGrid extends Component {
    constructor(props) {
        super(props);
        this.liveCells = new Map();
        this.buffer = new Map();
        this.deadCells = new Map();
        this.state = {
            size: [30, 30],
            generation: 0,
            cellCount: 0,
            interval: 100,
            simActive: false
        }
    }


    addLiveCell(position) {
        this.liveCells.set(position.x + ' , ' + position.y, {x: position.x, y: position.y});
    }

    removeDeadCell(position) {
        this.liveCells.delete(position);
    }

    isCellAlive(position) {
        return this.liveCells.has(position);
    }

    isCellInBuffer(position) {
        return this.buffer.has(position);
    }

    liveNeighbors(position){
        let liveNeighbors = 0;

        for(let i = position.x - 1; i <= position.x + 1; i++){
            for(let j = position.y - 1; j <= position.y + 1; j++){

                if(i === position.x && j === position.y)
                    continue;

                if(this.isCellAlive(i + ' , ' + j)){
                    liveNeighbors++;
                }
                    
                
                else
                    this.deadCells.set(i + ' , ' + j, {x: i, y: j});
            }
        }

        if((liveNeighbors === 2 || liveNeighbors === 3))
            this.buffer.set(position.x + ' , ' + position.y, {x: position.x, y: position.y});

    }

    randomDead(){

    }

    deadNeighbors(position) {
        let liveNeighbors = 0;

        for(let i = position.x - 1; i <= position.x + 1; i++){
            for(let j = position.y - 1; j <= position.y + 1; j++){

                if(i === position.x && j === position.y)
                    continue;

                if(this.isCellAlive(i + ' , ' + j))
                    liveNeighbors++;
            }
        }

        if((liveNeighbors === 3))
            this.buffer.set(position.x + ' , ' + position.y, {x: position.x, y: position.y});
    }

    storeCell(position) {
        if(this.isCellAlive(position.x + ' , ' + position.y)) {
             this.removeDeadCell(position.x + ' , ' + position.y);
        }
        
        else
        this.addLiveCell(position);
        this.setState({cellCount: position});
    

    }

    addBuffer() {
        this.liveCells.forEach((i) => {
            this.liveNeighbors(i);
        })

        this.deadCells.forEach((i) => {
            this.deadNeighbors(i);
        })

        this.liveCells = this.buffer;
        this.buffer = new Map();
        this.deadCells = new Map();

        let generationplus = this.state.generation;
        generationplus++;
        this.setState({generation: generationplus});

    }

    startSimulation() {
        if(this.state.simActive)
            return;
        this.setState({simActive: true}, () => this.runSimulation());
        
        
    }

    runSimulation() {
        this.addBuffer();
        this.timeout = setTimeout(() => {
            this.runSimulation();
        }, this.state.interval);
    }

    stopSimulation() {
        if(!this.state.simActive)
            return;
        this.setState({simActive: false});
        clearTimeout(this.timeout);
    }

    renderGrid() {
        let newGrid = [];
        let cellRow = [];

        for(let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this.state.size[1]; j++) {
                if(this.isCellAlive(i + ' , ' + j)){
                    cellRow.push(<Cell key={[i, j]} position={{x : i, y : j}} storeCell={this.storeCell.bind(this)} isAlive={true} />);
                }
                else
                    cellRow.push(<Cell key={[i, j]} position={{x : i, y : j}} storeCell={this.storeCell.bind(this)} isAlive={false} />);
            }   
            newGrid.push(<div className="row" key={i}>{cellRow}</div>)
            cellRow = [];
        }
        return newGrid;
    }


    render() {
        return <div> <div className="grid-container">{this.renderGrid()}</div>
                <button onClick={() => this.startSimulation()}>Start Simulation </button>
                <button onClick={() => this.stopSimulation()}>Stop</button>
               </div>
        
    }

    
}

export default CellGrid;