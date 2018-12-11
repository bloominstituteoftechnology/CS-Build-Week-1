import React from 'react';
import './LifeCanvas.css';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

class Cell extends React.Component{
    render(){
        const {x, y, cellSize} = this.props;
        return(
            <div 
                className="cell"
                style={{
                    left: `${cellSize * x + 1}px`,
                    top: `${cellSize * y + 1}px`,
                    width: `${cellSize - 1}px`,
                    height: `${cellSize - 1}px`,
                }}
           />
        )
    }
}

class LifeCanvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height: 225,
            width: 225,
            cellSize: 15,
            data: [],
            interval: 1000,
            isRunning: false,
        }
        this.rows = this.state.height/this.state.cellSize;
        this.cols = this.state.width/this.state.cellSize;
        this.board = this.initializeBoard();
    }

    initializeBoard = () => {
        let board = [];
        for(let y = 0; y < this.rows; y++){
            board[y] = [];
            for (let x = 0; x < this.cols; x++){
                board[y][x] = false;
            }
        }
        return board;
    }
    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }
    getOffset = () => {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        }
    }
    handleClick = e => {
        const offset = this.getOffset();
        const offsetX = e.clientX - offset.x;
        const offsetY = e.clientY - offset.y;

        const x = Math.floor(offsetX/this.state.cellSize);
        const y = Math.floor(offsetY/this.state.cellSize);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows){
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ data: this.makeCells()});
    }
    checkNeighbors = (board, x, y) => {
        let neighbors = 0;
        const validNeighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < validNeighbors.length; i++){
            var validNeighbor = validNeighbors[i];
            let y1 = y + validNeighbor[0];
            let x1 = x + validNeighbor[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]){
                neighbors++;
            }
        }
        return neighbors;
    }
    runGameOfLife = () => {
        this.setState({isRunning: true});
        this.runCycle();
    }
    runCycle = () => {
        let newGame = this.initializeBoard();
        this.board = newGame;
        this.setState({data: this.makeCells()});
        this.timeoutHandler = window.setTimeout(() => {this.runCycle();}, this.state.interval);
    }
    stopGameOfLife = () => {
        this.setState({isRunning: false});
        if (this.timeoutHandler){
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }
    clearBoard = e => {
        e.preventDefault();
        //make new board first
        this.board = this.initializeBoard();
        //initialize cells
        this.setState({data: this.makeCells()});
    }
    handleIntervalChange = e => {
        this.setState({internal: e.target.value});
    }
    render(){
        return(
            <div>
                <div    
                    className="board"
                    style={{
                        width: this.state.width,
                        height: this.state.height,
                        backgroundSize:`${this.state.cellSize}px ${this.state.cellSize}px`}}
                        onClick={this.handleClick}
                        ref={(n) => { this.boardRef = n; }}>   
                        {this.state.data.map(cell => (
                            <Cell cellSize={this.state.cellSize} x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`}/>
                        ))}
                </div>
                <div className="controls">
                    <p>Each cycle takes {this.state.interval} ms</p>
                    <button onClick={this.runGameOfLife}>Start</button>
                    <button onClick={this.stopGameOfLife}>Stop</button>
                    <button onClick={this.clearBoard}>Clear</button> 
                </div>
                <div className="rules">
                    <p>1. Any live cell with fewer than two live neighbors dies, as if caused by under population.</p>
                    <p>2. Any live cell with two or three live neighbors lives on to the next generation.</p>
                    <p>3. Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
                    <p>4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</p>
                </div>
            </div>
    

        )
    }
}

export default LifeCanvas;