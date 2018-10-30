import React from 'react';
import './Game.css';
import styled from 'styled-components';
import img2 from '../Images/newpause.png';
import img1 from '../Images/newestart.png';

import '../Hover/hover-min.css';


const Play = styled.button`

cursor: pointer;
border: none;
text-decoration: none;
background-color: none;
margin-left: 40px;
margin-top: 10px;
margin-right: 20px;
height: 60px;
width: 200px;
background-image:url(${img1})
`

const Pause = styled.button`
cursor: pointer;
text-decoration: none;
background-color: none;
border: none;
margin-left: 40px;
margin-top: 10px;
margin-right: 20px;
width: 200px;
height: 60px;
background-image:url(${img2})
`
const Msecer = styled.input`
width: 75px;
background-color: none;
background: none;
color: #ffc107;
border: 2px solid #ffc107;
height: 30px;
font-family: 'Chakra Petch', sans-serif;
font-size: 28px;

`

const Update = styled.h1`
margin-top: 15px;
color:#ffc107`

const Clear = styled.button`

cursor: pointer;
text-decoration: none;
background-color: #B416AE;
border: 1px solid #340069;
width: 200px;
height: 70px;
font-family: 'Chakra Petch', sans-serif;
color: #FBC36A;
margin-left: 815px;

font-size: 26px;
font-style: italic;
position: absolute;
margin-top: 200px;
border-radius: 5px;

`

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {

    randint = (max) => {
     return Math.floor(Math.random() * Math.floor(max));
     
  

 } 


    render() {
      const { x, y } = this.props;
      const CELLCOLOR = {
        1: '#FBC36A',
        2: '#FFD870',
        3: '#F6A462',
        4: '#EF5656',
        5: '#E23D6C',
        6: '#B416AE',
        7: '#690B95',
        8: '#340069'
       
      }
      return (
        <div className="Cell" style={{
            background: `${CELLCOLOR[Math.floor(Math.random() *8)]}`,
          left: `${CELL_SIZE * x + 1}px`,
          top: `${CELL_SIZE * y + 1}px`,
          width: `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }} />
      );
    }
  }

class Game extends React.Component {
    constructor() {
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

      runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
      }
      stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
          }
      }

      runIteration() {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration();
        }, this.state.interval);
    }

      handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
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
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        
        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
          this.board[y][x] = !this.board[y][x];
        }
        this.setState({ cells: this.makeCells() });
      }

      calculateNeighbors(board, x, y) {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    handleClear = () => {
      this.board = this.makeEmptyBoard();
      this.setState({ cells: this.makeCells() });
  }
  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
            this.board[y][x] = (Math.random() >= 0.5);
        }
    }

    this.setState({ cells: this.makeCells() });
}


  render() {
    const { cells } = this.state;
    return (
      <div>
        
        <a class="button hvr-buzz-out">
<Clear onClick={this.handleRandom}> Randomize Board</Clear>
</a>
          
        <div className="Board"
          style={{ width: WIDTH, height: HEIGHT, 
          backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}

          onClick={this.handleClick}
          ref={ (n) => {this.boardRef = n; }}>

           {cells.map(cell => (
            <Cell x={cell.x} y={cell.y}
                key={`${cell.x},${cell.y}`}/>
          ))}
          
        </div>

        <div className="controls">

          <Update>Update every  <Msecer value={this.state.interval}
              onChange={this.handleIntervalChange} />  msec</Update>
          {this.state.isRunning ?
            <Pause onClick={this.stopGame}/> :
            <Play onClick={this.runGame}/>
          }
          
          
        </div>
        
      </div>
    );
  }
}
export default Game;
