import React from 'react';
import Cell from './Cell';
import '../App.css';


const Square = 30;
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


    render() {
        const { cells } = this.state;
        return (
            <div>
                <div className="grid"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${Square}px ${Square}px`}}
                    onClick={this.clickHandler}
                    ref={(n) => { this.boardRef = n; }}>

                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                    ))}
                </div>

                <div className="button-controls">
                        <button className="button1">Play/Pause</button>
                        <button className="button">Stop</button>

                    <button className="button">Randomized</button>
                    <button className="button">Clear</button>
                </div>
            </div>
        );
    }
}


export default Grid;





