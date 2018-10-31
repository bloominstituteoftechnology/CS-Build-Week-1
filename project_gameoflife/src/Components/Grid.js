import React from 'react';
import Cell from './Cell';
import '../App.css';


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

    positioning() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
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

    clickHandler = (event) => {

        const elemOffset = this.positioning();
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

    render() {
        const { cells } = this.state;
        return (
            <div className="grid-container">
                <div className="grid"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${Square}px ${Square}px`}}
                    onClick={this.clickHandler}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>

                <div className="button-controls">
                        <button className="button">Play/Pause</button>
                        <button className="button">Stop</button>

                    <button className="button">Randomized</button>
                    <button className="button" onClick={this.clickHandlerClear}>Clear</button>
                </div>
            <div className="rules-container">
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
            </div>
        </div>
        );
    }
}


export default Grid;





