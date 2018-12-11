import React from 'react';
import './Game.css';

const cellHeight = 20;
const width = 800;
const height = 600;

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${cellHeight * x + 1}px`,
                top: `${cellHeight * y + 1}px`,
                width: `${cellHeight - 1}px`,
                height: `${cellHeight - 1}px`,
            }} />
        );
    }
}

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
    getElementOffset() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }
    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / cellHeight);
        const y = Math.floor(offsetY / cellHeight);
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells() });
    }
    render() {
        const { cells } = this.state;
        return (
            <div>
                <div className="Game"
                    style={{ width: width, height: height,
                    backgroundSize: `${cellHeight}px ${cellHeight}px` }}
                    onClick={this.handleClick}
                    ref={(n) => { this.boardRef = n; }}>
                    {cells.map(cell => (
                        <Cell x={cell.x} y={cell.y}
                            key={`${cell.x},${cell.y}`} />
                    ))}
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