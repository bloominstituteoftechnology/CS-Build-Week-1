import React from 'react';
import Cell from './Cell';
import '../App.css';
import {Link } from 'react-router-dom';
import img1 from './patterns.png';

const Square = 32;
const WIDTH = 800;
const HEIGHT = 600;



class Grid extends React.Component {

    constructor() {
        super();
        this.rows = HEIGHT / Square;
        this.cols = WIDTH / Square;

        this.board = this.gameBoard();
    }

    state = {
        cells: [],
        isMoving: false,
        interval: 200,

    }

    gameBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    getPosition() {
        const rectangle = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rectangle.left + window.pageXOffset) - doc.clientLeft,
            y: (rectangle.top + window.pageYOffset) - doc.clientTop,
        };
    }

    gameSquare() {
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

    playGame = () => {
        this.setState({ isMoving: true });
        this.runCoordinates();
    }

    stopGame = () => {
        this.setState({ isMoving: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    runCoordinates() {
        let newBoard = this.gameBoard();
        //loop through all cells
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let connections = this.makeConnections(this.board, x, y);
                //Implement rules of game
                if (this.board[y][x]) {
                    if (connections === 2 || connections === 3) {
                        newBoard[y][x] = true;  //cells live
                    } else {
                        newBoard[y][x] = false; //cells die
                    }
                } else {
                    if (!this.board[y][x] && connections === 3) {
                        newBoard[y][x] = true; //new cell is born
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.gameSquare() });
        this.timeoutHandler = window.setTimeout(() => {
      this.runCoordinates();
    }, this.state.interval);
    }

    makeConnections(board, x, y) {
        let connections = 0;
        const gridCoordinates = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        //loop through rows and columns to find neighbors
        for (let i = 0; i < gridCoordinates.length; i++) {
            const coordinate = gridCoordinates[i];
            let y1 = y + coordinate[0];
            let x1 = x + coordinate[1];
            //loop thorough and find connecting neighbors
            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                connections++;
            }
        }

        return connections;
    }


    clickHandler = (event) => {
        const elemOffset = this.getPosition();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / Square);
        const y = Math.floor(offsetY / Square);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.gameSquare() });
    }

    clickHandlerClear = () => {
        this.board = this.gameBoard();
        this.setState({ cells: this.gameSquare() });
    }
    handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value });
  }

    render() {
        const { cells, isMoving, interval } = this.state;
        return (
            <div className="grid-container">
                <div className="grid"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${Square}px ${Square}px`}}
                    onClick={this.clickHandler}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}

                    <div className="button-controls">
                    <div className="interval-box">
                    Update every millisecond <input className="interval-box1" value={this.state.interval} onChange={this.handleIntervalChange} /></div>
                    {isMoving ?
                         <button className="button" onClick={this.stopGame}>Stop</button> :
                        <button className="button" onClick={this.playGame}>Play/Stop</button> }


                        <button className="button" onClick={this.clickHandlerClear}>Clear</button>
                        <button className="button">Randomized</button>
                    </div>
                </div>
            <div className="rules-container">
                    <Link to="/"><p className="return-home-button">Back to Homepage</p></Link>
                <div className="rules-title">
                    <h1 className="rules-title1">The Rules of the Game</h1>
                </div>
                <div className="rules">
                    <ul>
                        <li>Rule #1 - Any alive cell that is touching less than two alive neighbors dies.</li>
                        <li>Rule #2 - Any alive cell touching four or more alive neighbors dies.</li>
                        <li>Rule #3 - Any alive cell touching two or three alive neighbors does nothing.</li>
                        <li>Rule #4 - Any dead cell touching exactly three alive neighbors becomes alive.</li>
                    </ul>
                </div>
                     <div className="img-blocks">
                     <h3 className="img-title">Try these patterns</h3>
                                <img className="img-block" src={img1} />
                    </div>
                </div>
            </div>

        );
    }
}


export default Grid;

