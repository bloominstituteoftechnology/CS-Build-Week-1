import React from 'react';
import Cell from './Cell';
import '../App.css';

const WIDTH = 600;
const HEIGHT = 400;
const Square = 25;

class Grid extends React.Component {

constructor() {
        super();
        this.rows = HEIGHT / Square;
        this.cols = WIDTH / Square;

        this.board = this.newBoard();
    }

    state = {
        cells: [],
        isRunning: false,
        interval: 100,
    }

    newBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    render() {

        return (
            <div>
                <div className="grid"
                    style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${Square}px ${Square}px` }}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>
                </div>
                <div className="controls">

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


