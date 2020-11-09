import React from 'react';
import '../styles/Game.css';

const CELL_SIZE = 20;
const NUM_COLUMNS = 40;
const NUM_ROWS= 30;
const PX_WIDTH = CELL_SIZE * NUM_COLUMNS;
const PX_HEIGHT = CELL_SIZE * NUM_ROWS;

class Cell extends React.Component {
  render() {
    let randomColor = Math.floor(100000 + Math.random()*16777215).toString(16);
    const { x, y } = this.props;
    //offseting by x and y for left and top, everything relative to the left and top of grid
    return (
      <div className="Cell" style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
        background: `#${randomColor}`,
      }} />
    );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.boardRef = React.createRef();
    this.board = this.makeEmptyBoard();
  }
  state = {
    //array of cells
    cells: [],
    interval: 70,
    isRunning: false,
    gen: 0,
  }
  //method to create an empty board:
  makeEmptyBoard(){
    let board = [];
    for(let y = 0; y < NUM_ROWS; y++){
      //make y axis of arrays
      board[y] = [];
      for (let x = 0; x < NUM_COLUMNS; x++){
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
    for (let y = 0; y < NUM_ROWS; y++){
      for (let x = 0; x < NUM_COLUMNS; x++){
        if(this.board[y][x]){
          cells.push({ x, y});
        }
      }
    }
    return cells;
  }
  //getElementOffset calculates the  position of a board element (obv will be mappped on the whole array eventually)
  //getBoundingClientRect return the size of an element and its position relative to the viewport
  //The returned value is a DOMRect object which is the union of the rectangles returned by getClientRects() for the element, i.e., the CSS border-boxes associated with the element. The result is the smallest rectangle which contains the entire element, with read-only left, top, right, bottom, x, y, width, and height properties describing the overall border-box in pixels. Properties other than width and height are relative to the top-left of the viewport.
  // since we are in a grid we can use this with some simple calculations.
  // this basically will let us match the board click with the 
  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    console.log(rect);
    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  //listener function for increase in board size:
  handleResize = (expand) => {
    if(expand.row){
      //augment NUM_ROWS++
    }
    if(expand.column){
      //augment NUM_COLUMNS++
    }

    //call in render
  }

  handleClick = (event) => {
    if(this.state.isRunning === false){
      const elemOffset = this.getElementOffset();
      //client returns horz/vert mouse position
      //offset gives coordinates relative to css bound
      const offsetX = event.clientX - elemOffset.x;
      const offsetY = event.clientY - elemOffset.y;

      const x = Math.floor(offsetX / CELL_SIZE);
      const y = Math.floor(offsetY / CELL_SIZE);

      if(x>= 0 && x <= NUM_COLUMNS && y>= 0 && y<= NUM_ROWS){
        this.board[y][x] = !this.board[y][x];
      }

      this.setState({ cells: this.makeCells() });
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
    //double buffering
    let newBoard = this.makeEmptyBoard();

    //logic for each iteration:
      for (let y = 0; y < NUM_ROWS; y++) {
          for (let x = 0; x < NUM_COLUMNS; x++) {
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
    //timeout handler just feed in state variable
    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  mod(n, m) {
    return ((n % m) + m) % m;
  }

  calculateNeighbors(board, x, y) {
    //initialize neighbor count
     let neighbors = 0;
     const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
     for (let i = 0; i < dirs.length; i++) {
        //setting reference to sub array surrounding x,y coordinates
         const dir = dirs[i];
         //vertical
         let y1 = y + dir[0];
         // horitzontal (:
         let x1 = x + dir[1];
        
        //Make all neighbor checks inbounds
         x1 = this.mod(x1, NUM_COLUMNS);
         y1 = this.mod(y1, NUM_ROWS); 
        // if neighbor exists apped neighbor count
         board[y1][x1] && neighbors++;

     }
     //reutrns the number of live neighbors
     return neighbors;
  }
  //overwrite interval
  handleIntervalChange = (event) => {
    this.setState({ interval: event.target.value });
  }

  handleClear = () => {
    this.stopGame();
    this.board = this.makeEmptyBoard();
    this.setState({ cells: this.makeCells() });
    this.setState({ gen:0 });
  }

  handleRandom = () => {
      for (let y = 0; y < NUM_ROWS; y++) {
          for (let x = 0; x < NUM_COLUMNS; x++) {
              this.board[y][x] = (Math.random() >= 0.5);
          }
      }

      this.setState({ cells: this.makeCells() });
  }

  handleGlider = () => {
    this.handleClear();
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
    this.handleClear();
    //set the right indices in the 2d array:
    this.board[14][18] = 1;
    this.board[14][19] = 1;
    this.board[14][20] = 1;
    //make the cells:
    this.setState({ cells: this.makeCells() });
  }

  handleEater = () => {
    this.handleClear();
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


  render() {
    //event handler within render function to allow user to toggle cells to true(on) onClick.
    const { cells } = this.state;
    return (
      <div className="page">
        <div>current gen: {this.state.gen}</div>
        <div className="Board"
          style = {{ overflow: 'auto', resize: 'both', minWidth: PX_WIDTH, minHeight: PX_HEIGHT,
             backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}} onClick={this.handleClick}
          ref= { (n) => {this.boardRef = n}}>
          {cells.map(cell => (<Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
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
        <div className="rules">
          <div>
            <h1>Rules:</h1>
            <p>1. <strong>Births</strong>: Each <strong className = "dead"> dead </strong> cell adjacent to exactly three live neighbors will become <strong className = "live">live</strong> in the next generation.
            </p>
            <p>2. <strong>Death by isolation</strong>: Each <strong className = "live">live</strong> cell with one or fewer live neighbors will <strong className = "dead"> die </strong> in the next generation.
            </p>
            <p>3. <strong>Death by overcrowding</strong>: Each <strong className = "live">live</strong> cell with four or more live neighbors will <strong className = "dead"> die </strong> in the next generation.
            </p>
            <p>4. <strong>Survival</strong>: Each <strong className = "live">live</strong> cell with either two or three live neighbors will remain <strong className = "live">alive</strong> for the next generation.
            </p>
          </div>
          <div className = "about">
            <h2>About the algorithm</h2>
            <p>This implementation uses a double buffering technique with a 2d array. Cells are loaded onto a secondary matrix and states of life and death are kept track on the old matrix. Neighbors are caclulated by using a directional array to check the rectangle around squares. Then for each iteration the algorithim checks to see the number of live neighbors and implements the rules accordingly. </p>
            <p>Conways Game of life was written in the 70s as a solution to John VonNoumen's hypothetical self replicating machine. It is of theortical interest because the game of life has the power of a universal turing machine which means any computation that can be computed algoritimically can be computed using the game of life. </p>
            <p>Paul randall impleneted a Turing complete version which can be found <a href = "http://rendell-attic.org/gol/tm.htm"target = "_blank" rel="noopener noreferrer">here</a></p>

          </div>
        </div>
      </div>
    );
  }
}

export default Game;
