import React from 'react';
import '../styles/Game.css';

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

class Game extends React.Component {
  constructor(){
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeEmptyBoard();
  }
  state = {
    //array of cells
    cells: [],
    interval: 200,
    isRunning: false,
    gen: 0,
  }
  //method to create an empty board:
  makeEmptyBoard(){
    let board = [];
    for(let y = 0; y < this.rows; y++){
      //make y axis of arrays
      board[y] = [];
      for (let x = 0; x < this.cols; x++){
        // so we have a "2D" array with an array of arrays for entries.
        board[y][x] = false;
      }
    }
    //return an empty board, with all false values for now.
    return board;
  }
  //Create cells from this.board:
  makeCells(){
    let cells = [];
    for (let y = 0; y < this.rows; y++){
      for (let x = 0; x < this.cols; x++){
        if(this.board[y][x]){
          cells.push({ x, y});
        }
      }
    }
    return cells;
  }
  //getElementOffset calculates the  position of a board element (obv will be mappped on the whole array eventually)
  //getBoundingClientRect return shte size of an element and its position relative to the viewport
  //The returned value is a DOMRect object which is the union of the rectangles returned by getClientRects() for the element, i.e., the CSS border-boxes associated with the element. The result is the smallest rectangle which contains the entire element, with read-only left, top, right, bottom, x, y, width, and height properties describing the overall border-box in pixels. Properties other than width and height are relative to the top-left of the viewport.
  // sicne we are in a grid we can use this with some simple calculations.
  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;

    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  handleClick = (event) => {
    if(this.state.isRunning == false){
      const elemOffset = this.getElementOffset();
      const offsetX = event.clientX - elemOffset.x;
      const offsetY = event.clientY - elemOffset.y;

      const x = Math.floor(offsetX / CELL_SIZE);
      const y = Math.floor(offsetY / CELL_SIZE);

      if(x>= 0 && x <= this.cols && y>= 0 && y<= this.rows){
        this.board[y][x] = !this.board[y][x];
      }

      this.setState({ cells: this.makeCells() });
    }
    else{
      console.log("noclick");
    }
  }

  //helper functions to run the game:
  //toggle runnning on/off
  runGame = () => {
    this.setState({ isRunning: true});
    this.runIteration();
  }

  stopGame = () => {
    this.setState( {isRunning: false});
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }

  runIteration() {
    console.log('running iteration');
    //double buffering
    let newBoard = this.makeEmptyBoard();

    //logic for each iteration:
      for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
              let neighbors = this.calculateNeighbors(this.board, x, y);
              //cehck neighbors from old array.
              if (this.board[y][x]) {
                  if (neighbors === 2 || neighbors === 3) {
                    //individual cell in  new 2d array
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

    this.setState({ gen: this.state.gen +1});
    this.board = newBoard;
    this.setState({ cells: this.makeCells() });
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }


  /*
    * Calculate the number of neighbors at point (x, y)
  * @param {Array} board
  * @param {int} x
  * @param {int} y
  */

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

  handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value });
  }

  handleClear = () => {
    this.board = this.makeEmptyBoard();
    this.setState({ cells: this.makeCells() });
    this.setState({ gen:0 });
  }

  handleRandom = () => {
      for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.cols; x++) {
              this.board[y][x] = (Math.random() >= 0.5);
          }
      }

      this.setState({ cells: this.makeCells() });
  }

  handleGlider = () => {
    //set the right indices in the 2d array:
    this.board[1][1] = 1;
    this.board[1][3] = 1;
    this.board[2][2] = 1;
    this.board[2][3] = 1;
    this.board[3][2] = 1;

    //make the cells:
    this.setState({ cells: this.makeCells() });

  }

  handleBlinker = () => {
    //set the right indices in the 2d array:
    this.board[14][18] = 1;
    this.board[14][19] = 1;
    this.board[14][20] = 1;
    //make the cells:
    this.setState({ cells: this.makeCells() });
  }

  handleEater = () => {
    //set the right indices in the 2d array:
    this.board[12][16] = 1;
    this.board[12][17] = 1;
    this.board[13][16] = 1;
    this.board[13][17] = 1;

    this.board[14][18] = 1;
    this.board[14][19] = 1;
    this.board[15][18] = 1;
    this.board[15][19] = 1;

    //make the cells:
    this.setState({ cells: this.makeCells() });
  }

  // presetHanddler = e => {
  //   switch(e.target.value){
  //     case: 'glider':
  //       break;
  //     case: 'blinker':
  //       break;
  //   }
  // }

  //event handler with render method to allow user to toggle cells to true(on) onClick.
  render() {
    const { cells } = this.state;
    return (
      <div>
        <div>current gen: {this.state.gen}</div>
        <div className="Board"
          style = {{ width: WIDTH, height: HEIGHT,
             backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}} onClick={this.handleClick}
          ref={(n) => { this.boardRef = n; }}>
          {cells.map(cell => (<Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
          ))}
        </div>
        <div className="controls">
          Update every <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec
          {this.state.isRunning ?
            <button className="button"
              onClick={this.stopGame}>Stop</button> :
            <button className="button"
              onClick={this.runGame}>Run</button>
          }
          <div>
            <button className="button" onClick={this.handleRandom}>Random</button>
            <button className="button" onClick={this.handleGlider}>Gilder</button>
            <button className="button" onClick={this.handleBlinker}>Blinker</button>
            <button className="button" onClick={this.handleEater}>Eater</button>
            <button className="button" onClick={this.handleClear}>Clear</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
