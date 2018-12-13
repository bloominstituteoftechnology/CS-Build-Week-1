import React, { Component } from 'react';
import Cell from './cell';
import './game.css';

//if change below, update Cell.js & game.css & App.css
const cellSize = 16;
const width = 400;
const height = 400;


class mainGame extends Component {
    constructor() {
        super();
        this.rows = height / cellSize;
        this.columns = width / cellSize;
        this.currentBoard = this.makeEmptyBoard();
    }

    state = { cells: [], }

    render() {
        const { cells } = this.state;
        return(
            
                <div 
                    className="canvas-board"
                    onClick={this.handleClick}
                    ref={ (n) => { this.boardRef = n; }}
                >
                    {cells.map(cell => (

                        <Cell 
                            x={cell.x} 
                            y={cell.y} 
                            key={`${cell.x}, ${cell.y}`} 
                        />

                    ))}
                </div>
           
        );
    }
    makeEmptyBoard() {
        let board = [];
        for (let y=0; y<this.rows; y++) {
            board[y] = [];
            for (let x=0; x<this.columns; x++) {
                board[y][x] = false;
            }
        }
        return board;
    }
   
    makeCells() {
        let cells = [];
        for (let y=0; y<this.rows; y++) {
            for (let x=0; x<this.columns; x++) {
                if (this.currentBoard[y][x]) {
                    cells.push({ x,y });
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
   
    handleClick = (e) => {
        const elemOffset = this.getElementOffset();
        const offsetX = e.clientX - elemOffset.x;
        const offsetY = e.clientY - elemOffset.y;

        const x = Math.floor(offsetX / cellSize);
        const y = Math.floor(offsetY / cellSize);

       

        if (x>=0 && x<=this.columns && y>=0 && y<=this.rows) {
            this.currentBoard[y][x] = !this.currentBoard[y][x];
        }

        this.setState({ cells: this.makeCells() })
    }
} // end of <Game />
export default mainGame;