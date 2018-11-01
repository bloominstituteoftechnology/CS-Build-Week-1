import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const Grid = styled.div`
  position: relative;
  margin: 10px auto;
  background-color: #222;
  background-image: linear-gradient(#333 1px, transparent 1px),
    linear-gradient(90deg, #333 1px, transparent 1px);
`;

const Controls = styled.div`
  margin-top: 10px;
`;

const Presets = styled.div`
  margin-top: -650px;
  margin-left: 690px;
`;

const Info = styled.div`
  margin-top: -50px;
  margin-left: 20px;
  max-width: 600px;
  text-align: justify;
`;

const Button = styled.button`
  margin-left: 12px;
  cursor: pointer;
`;

const ButtonInactive = styled.button`
  margin-left: 12px;
  opacity: 0.3
  cursor: not-allowed;
`;

const Input = styled.input`
  width: 30px;
  text-align: center;
`;

const CELL_SIZE = 25;
const WIDTH = 600;
const HEIGHT = 600;

class Board extends React.Component {
  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;

    this.board = this.makeBoard();
  }

  state = {
    cells: [],
    isRunning: false,
    generation: 0,
    speed: 50,
    canClick: true,
  };

  makeBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false;
      }
    }

    return board;
  }

  getCellLocation() {
    // get a reference to the board
    const rect = this.boardRef.getBoundingClientRect();

    return {
      x: rect.left,
      y: rect.top,
    };
  }

  populateBoard() {
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

  handleClick = e => {
    if (!this.state.isRunning || this.state.canClick) {
      const elemOffset = this.getCellLocation();
      const offsetX = e.clientX - elemOffset.x;
      const offsetY = e.clientY - elemOffset.y;

      const x = Math.floor(offsetX / CELL_SIZE);
      const y = Math.floor(offsetY / CELL_SIZE);

      if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
        this.board[y][x] = !this.board[y][x];
      }

      this.setState({ cells: this.populateBoard() });
    }
  };

  runGame = () => {
    this.setState({ isRunning: true });
    this.runIteration();
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  };

  runIteration() {
    let newBoard = this.makeBoard();

    // keep track of which generation we're on
    this.setState({ generation: this.state.generation + 1 });

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
    this.setState({ cells: this.populateBoard() });

    this.timer = window.setTimeout(() => {
      this.runIteration();
    }, this.state.speed);
  }

  // Calculate the number of neighbors
  calculateNeighbors(board, x, y) {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (
        x1 >= 0 &&
        x1 < this.cols &&
        y1 >= 0 &&
        y1 < this.rows &&
        board[y1][x1]
      ) {
        neighbors++;
      }
    }

    return neighbors;
  }

  handleTimerChange = e => {
    this.setState({ speed: e.target.value });
  };

  handleClear = () => {
    this.board = this.makeBoard();
    this.setState({ cells: this.populateBoard(), generation: 0 });
    this.stopGame();
  };

  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = Math.random() >= 0.85;
      }
    }

    this.setState({ cells: this.populateBoard() });
  };

  handleEater = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = 0;
      }
    }

    /* prettier-ignore */
    const eater = [
      [4, 2], [2, 3], [3, 4], [4, 3], [4, 4], [17, 16], [17, 17], [18, 16], [19, 17],
      [19, 18], [19, 19], [20, 19],
    ];
    for (let i = 0; i < eater.length; i++) {
      let x = eater[i][0];
      let y = eater[i][1];
      this.board[y][x] = 1;
    }

    this.setState({ cells: this.populateBoard(), generation: 0 });
  };

  handleGalaxy = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = 0;
      }
    }

    /* prettier-ignore */
    const galaxy = [
      [9, 7], [12, 7], [14, 7],
      [7, 8], [8, 8], [10, 8], [12, 8], [13, 8], [14, 8],
      [8, 9], [15, 9],
      [7, 10], [8, 10], [14, 10],
      [8, 12], [14, 12], [15, 12],
      [7, 13], [14, 13],
      [8, 14], [9, 14], [10, 14], [12, 14], [14, 14], [15, 14],
      [8, 15], [10, 15], [13, 15],
    ];
    for (let i = 0; i < galaxy.length; i++) {
      let x = galaxy[i][0];
      let y = galaxy[i][1];
      this.board[y][x] = 1;
    }

    this.setState({ cells: this.populateBoard(), generation: 0 });
  };

  handleAcorn = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = 0;
      }
    }

    /* prettier-ignore */
    const acorn = [
      [8, 9],
      [10, 10],
      [7, 11], [8, 11], [11, 11], [12, 11], [13, 11],
    ];
    for (let i = 0; i < acorn.length; i++) {
      let x = acorn[i][0];
      let y = acorn[i][1];
      this.board[y][x] = 1;
    }

    this.setState({ cells: this.populateBoard(), generation: 0 });
  };

  handleRpentomino = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.board[y][x] = 0;
      }
    }

    /* prettier-ignore */
    const rpentomino = [
      [11, 9], [12, 9],
      [10, 10],[ 11, 10],
      [11, 11],
    ];
    for (let i = 0; i < rpentomino.length; i++) {
      let x = rpentomino[i][0];
      let y = rpentomino[i][1];
      this.board[y][x] = 1;
    }

    this.setState({ cells: this.populateBoard(), generation: 0 });
  };

  handleCanClick = e => {
    this.setState({ canClick: !this.state.canClick });
  };

  render() {
    const { cells, speed, generation, isRunning, canClick } = this.state;
    return (
      <div>
        <Grid
          style={{
            width: WIDTH,
            height: HEIGHT,
            backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`,
          }}
          onClick={this.handleClick}
          ref={square => {
            // get a reference for each square clicked on
            this.boardRef = square;
          }}
        >
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`} />
          ))}
        </Grid>

        <Controls>
          Generation: {generation}
          <br />
          Update every <Input value={speed} onChange={this.handleTimerChange} />
          {isRunning ? (
            <Button onClick={this.stopGame}>Pause</Button>
          ) : (
            <Button onClick={this.runGame}>Run</Button>
          )}
          {isRunning ? (
            <ButtonInactive onClick={this.handleRandom} disabled>
              Random
            </ButtonInactive>
          ) : (
            <Button onClick={this.handleRandom}>Random</Button>
          )}
          {isRunning ? (
            <ButtonInactive onClick={this.handleClear} disabled>
              Clear
            </ButtonInactive>
          ) : (
            <Button onClick={this.handleClear}>Clear</Button>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <input
            type="checkbox"
            checked={canClick}
            onChange={this.handleCanClick}
          />
          Edit whilst running
        </Controls>
        <Presets>
          {isRunning ? (
            <ButtonInactive onClick={this.handleEater} disabled>
              Eater
            </ButtonInactive>
          ) : (
            <Button onClick={this.handleEater}>Eater</Button>
          )}
          <br />
          {isRunning ? (
            <ButtonInactive onClick={this.handleGalaxy} disabled>
              Galaxy
            </ButtonInactive>
          ) : (
            <Button onClick={this.handleGalaxy}>Galaxy</Button>
          )}
          <br />
          {isRunning ? (
            <ButtonInactive onClick={this.handleAcorn} disabled>
              Acorn
            </ButtonInactive>
          ) : (
            <Button onClick={this.handleAcorn}>Acorn</Button>
          )}
          <br />
          {isRunning ? (
            <ButtonInactive onClick={this.handleRpentomino} disabled>
              R-pentomino
            </ButtonInactive>
          ) : (
            <Button onClick={this.handleRpentomino}>R-pentomino</Button>
          )}
        </Presets>
        <Info>
          Conway's Game of Life
          <br />
          <br />
          It all started in late 1940s, John von Neumann defined life as a
          creation (as a being or organism) which can reproduce itself and
          simulate a Turing machine. His ideas weren't technologically feasible
          at the time but a brilliant fellow named Stanisław Ulam invented
          cellular automata to simulate von Neumann's idea. About 20 years
          later, John Conway began doing experiments in 1968 with a variety of
          different 2D cellular automaton rules. He came up with the Game of
          Life.
          <br />
          <br />
          The standard Game of Life is symbolized as B3/S23; a cell is <b>B</b>
          orn if it has exactly three neighbours, <b>S</b>
          urvives if it has two or three living neighbours, and dies otherwise.
          The first number, or list of numbers, is what is required for a dead
          cell to be born. The second set is the requirement for a live cell to
          survive to the next generation.
          <br />
          <br />
          Some intersting shapes:
          <br />
          Acorn: a pattern of seven cells developed by Charles Corderman, takes
          5206 generations to stabilize (given a big enough board to grow in).
          <br /> <br />
          The R-pentomino, a pattern of five cells first considered by John
          Conway that takes 1103 generations before stabilizing as a pattern of
          eight blocks, six gliders, four beehives, four blinkers, one boat, one
          loaf, and one ship. This pattern is particularly notable as almost all
          other patterns of similar size stabilize within 10 generations.
        </Info>
      </div>
    );
  }
}

export default Board;
