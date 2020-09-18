import React from 'react';


const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }} />
        );
    }
}

class Game extends React.Component{
    constructor(){
        super();
        this.rows = HEIGHT / CELL_SIZE;
        this.cols = WIDTH / CELL_SIZE;

        this.board = this.makeEmptyBoard();
    }

    state = {
        cells: [],
        interval: 100,
        isRunning: false,
    }

    // Create an empty board
    makeEmptyBoard(){
        let board = [];
        for (let y = 0; y < this.rows; y++){
            board[y] = [];
            for (let x = 0; x < this.cols; x++){
                board[y][x] = false;
            }
        }
        return board;
    }

    // Calculate the position of a board element

    getElementOffset(){
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return{
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    // Create cells from this.Board
    makeCells(){
        let cells = [];
        for(let y = 0; y < this.rows; y++) {
            for(let x = 0; x < this.cols; x++){
                if (this.board[y][x]){
                    cells.push({ x, y});
                }
            }
        }
        return cells;
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows){
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

// Game helpers

    runGame = () =>{
        this.setState({ isRunning: true });
        this.runIteration();
    }

    stopGame = () =>{
        this.setState({ isRunning: false });
        if (this.timeoutHandler){
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }



    render(){
        const { cells, interval, isRunning } =this.state;
        return (
            <div>
                <div className="Board" 
                style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
                    onClick={this.handleClick} ref={(n) =>{
                        this.boardRef = n;
                    }}
                    >
                    
                    {cells.map(cell =>(
                        <Cell x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`}/>
                    ))}
                </div>

                <div className="controls">
                    Update every <input value={this.state.interval} onChange={this.handleIntervalChange}/> msec
                    {isRunning ? 
                    <button className="button" onClick={this.stopGame}>Stop</button> :
                    <button className="button" onClick={this.runGame}>Run</button>
                    }
                
                </div>
            </div>
        );
    }
}

export default Game;