import React from 'react';
import './Game.css';

const cellHeight = 20;
const width = 800;
const height = 600;

class Game extends React.Component {
    constructor() {
        super();
        this.rows = height / cellHeight;
        this.cols = width / cellHeight;
        this.board = this.makeEmptyBoard();
        this.state = {
            cells: []
        }
    }
    makeEmptyBoard() {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
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
    render() {
        return (
            <div>
                <div className="Game"
                    style={{ width: width, height: height,
                    backgroundSize: `${cellHeight}px ${cellHeight}px` }}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>
                </div>
                <div className="Controls">
                    <p>start</p>
                    <p>stop</p>
                    <p>step</p>
                    <p>clear</p>
                </div>
                <div className="Presets">
                    <p>preset 1</p>
                    <p>preset 2</p>
                    <p>preset 3</p>
                </div>

            </div>
        );
    }
}
export default Game;