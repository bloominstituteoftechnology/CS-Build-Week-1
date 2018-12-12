import React from "react";
import ReactDOM from "react-dom";
import { ButtonToolbar, MenuItem, DropdownButton } from "react-bootstrap";
import "./index.css";

function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr));
}

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.rows, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

const Intructions = () => {
  return (
    <div className="instructions">
      <h3>Game Rules</h3>
      <ol>
        <li>
          Any live cell with fewer than two live neighbors dies, as if by
          underpopulation.
        </li>
        <li>
          Any live cell with two or three live neighbors lives on to the next
          generation.
        </li>
        <li>
          Any live cell with more than three live neighbors dies, as if by
          overpopulation.
        </li>
        <li>
          Any dead cell with exactly three live neighbors becomes a live cell,
          as if by reproduction.
        </li>
      </ol>
    </div>
  );
};

const History = () => {
  return (
    <div className="history">
      <h3>History - Technical Details</h3>
      <h5>1940</h5>
      <p>
        John von Neumann defined life as a creation (as a being or organism)
        which can reproduce itself and simulate a Turing machine.
      </p>
      <h5>1968</h5>
      <p>
        John Conway began doing experiments with a variety of different 2D
        cellular automaton rules. Conway's initial goal was to define an
        interesting and unpredictable cell automaton.
      </p>
      <h5>1970</h5>
      <p>
        The game made its first public appearance in the October issue of
        Scientific American, in Martin Gardner's "Mathematical Games" column. In
        this respect, it foreshadowed the later popularity of computer-generated
        fractals. For many, Life was simply a programming challenge: a fun way
        to use otherwise wasted CPU cycles
      </p>
      <h5>1970 and beyond</h5>
      <p>
        Conway originally conjectured that no pattern can grow
        indefinitely—i.e., that for any initial configuration with a finite
        number of living cells, the population cannot grow beyond some finite
        upper limit. In the game's original appearance in "Mathematical Games",
        Conway offered a prize of fifty dollars to the first person who could
        prove or disprove the conjecture before the end of 1970
      </p>
    </div>
  );
};

const Grid = props => {
  const width = props.cols * 14;
  let boxClass = "";

  const rowsArr = props.gridFull.map((rowArr, rowIdx) =>
    rowArr.map((item, colIdx) => {
      const boxId = `${rowIdx}_${colIdx}`;

      boxClass = props.gridFull[rowIdx][colIdx] ? "box on" : "box off";
      return (
        <Box
          boxClass={boxClass}
          key={boxId}
          boxId={boxId}
          row={rowIdx}
          col={colIdx}
          selectBox={props.selectBox}
        />
      );
    })
  );

  return (
    <div className="grid" style={{ width }}>
      {rowsArr}
    </div>
  );
};

class Buttons extends React.Component {
  handleSelect = eventKey => {
    this.props.gridSize(eventKey);
  };

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>
            Start
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
            Stop
          </button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-default" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-default" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-default" onClick={this.props.seed}>
            Seed
          </button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <MenuItem eventKey="1">20x10</MenuItem>
            <MenuItem eventKey="2">50x30</MenuItem>
            <MenuItem eventKey="3">70x50</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows)
        .fill()
        .map(() => Array(this.cols).fill(false))
    };
  }

  componentDidMount() {
    this.seed();
    this.playButton();
  }

  selectBox = (row, col) => {
    const gridFull = this.state.gridFull.map((rowArr, rowIdx) =>
      rowArr.map((item, colIdx) =>
        rowIdx === row && colIdx === col ? !item : item
      )
    );
    this.setState(() => ({ gridFull }));
  };

  seed = () => {
    const gridFull = this.state.gridFull.map(rowArr =>
      rowArr.map(() => Math.floor(Math.random() * 4) === 1)
    );
    this.setState(() => ({ gridFull }));
  };

  playButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseButton = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1000;
    this.playButton();
  };

  fast = () => {
    this.speed = 100;
    this.playButton();
  };

  clear = () => {
    const gridFull = Array(this.rows)
      .fill()
      .map(() => Array(this.cols).fill(false));

    this.setState(() => ({
      gridFull,
      generation: 0
    }));
  };

  gridSize = size => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();
  };

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }

    this.setState(prevState => ({
      gridFull: g2,
      generation: prevState.generation + 1
    }));
  };

  render() {
    return (
      <div>
        <h1>Conway's Game of Life</h1>
        <h2>Number of Generations: {this.state.generation}</h2>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Intructions />
        <History />
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));
