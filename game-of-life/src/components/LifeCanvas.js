import React, { Component } from 'react';


class Cell {  /* boolean   int     int     int */
  constructor(clickable, living, xcoord, ycoord) {
    this.clickable = clickable;
    this.living = living;
    this.x = xcoord;
    this.y = ycoord;
  }
  toggle = () => {
    if (this.living == 0) {
      this.living = 1;
    } else {
      this.living = 0;
    }
  }
}

const rows = 50;
const cols = 50;
let arr = [];
for (let i=0; i<rows; i++) {
  arr[i] = [];
}
for (let j=0; j<rows; j++) {
  for (let k=0; k<cols; k++) {
    arr[j][k] = new Cell(true, 0, 10*j, 10*k);
  }
}
export default class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.cellsize = 10;
    this.height = 500;
    this.width = 500;
    this.state = {
      continueAnimation: false,
      cells: arr,
      generation: 0
    }
  }

  clearGrid = () => {
    const canv = this.refs.canvas;
    const ctx = canv.getContext('2d');
    for (let x = 0; x < this.width; x+=this.cellsize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }

    for (let y = 0; y<this.height; y+=this.cellsize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    let cells = this.state.cells;
    cells.forEach(cellRow => {
      cellRow.forEach(cell => {
        cell.living = 0;
      });
    });
    this.setState({ cells, generation: 0 });
    this.draw()
  }

  randomize = () => {
    let cells = this.state.cells;
    cells.forEach(cellRow => {
      cellRow.forEach(cell => {
        const num = Math.round(Math.random());
        cell.living = num;
      });
    });
    this.setState({ cells, generation: 0 });
    this.draw()
  }

  nextgen = () => {
    this.setState({ generation: this.state.generation+1 })
  }

  draw = () => {
    const canv = this.refs.canvas;
    const ctx = canv.getContext('2d');

    for (let j=0; j<this.height/this.cellsize; j++) {
      for (let k=0; k<this.width/this.cellsize; k++) {
        if (this.state.cells[j][k].living == 1) {
          ctx.fillStyle = 'white'/*'#'+(Math.random()*0xFFFFFF<<0).toString(16)*/;
          ctx.fillRect(j*this.cellsize, k*this.cellsize, this.cellsize, this.cellsize);
        }
        else {
          ctx.fillStyle = 'black';
          ctx.fillRect(j*this.cellsize, k*this.cellsize, this.cellsize-1, this.cellsize-1);
        }
      }
    }
  }

  update = () => {
    let mirrorCells = this.state.cells;
    for (let j=0; j<this.height/this.cellsize; j++) {
      for (let k=0; k<this.width/this.cellsize; k++) {
        let liveneighbors = 0;
        if (j > 0) {
          if (k>0) {
            liveneighbors += this.state.cells[j-1][k-1].living;
          }
          if (k<this.width/this.cellsize-1) {
            liveneighbors += this.state.cells[j-1][k+1].living;
          }
          liveneighbors += this.state.cells[j-1][k].living;
        }
        if (k > 0) {
          if (j<this.height/this.cellsize-1) {
            liveneighbors += this.state.cells[j+1][k-1].living;
          }
          liveneighbors += this.state.cells[j][k-1].living;
        }
        if (j<this.height/this.cellsize-1) {
          if (k<this.width/this.cellsize-1) {
            liveneighbors += this.state.cells[j+1][k+1].living;
          }
          liveneighbors += this.state.cells[j+1][k].living;
        }
        if (k<this.width/this.cellsize-1) {
          liveneighbors += this.state.cells[j][k+1].living;
        }
        if (this.state.cells[j][k].living == 0) {
          switch (liveneighbors) {
            case 3:
              mirrorCells[j][k].toggle();
              break;
            default:
              mirrorCells[j][k].living = 0;
          }
        } else if (this.state.cells[j][k].living == 1) {
          switch (liveneighbors) {
            case 0:
            case 1:
              mirrorCells[j][k].toggle();
              break;
            case 2:
            case 3:
              mirrorCells[j][k].living = 1;
              break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              mirrorCells[j][k].toggle();
              break;
            default:
              mirrorCells[j][k].living = 0;
          }
        } else {
          console.log("Something went wrong in your update function!")
        }
      }
    }
    this.setState({ cells: mirrorCells });
  }

  animate = () => {
    setTimeout(this.tick, 300)
  }

  tick = () => {
    if (this.state.continueAnimation) {
      this.draw();
      this.update();
      this.nextgen();
      requestAnimationFrame(this.animate);
    }
  }

  start = (e) => {
    this.setState({ continueAnimation: true});
    requestAnimationFrame(this.tick);
  }

  stop = (e) => {
    this.setState({ continueAnimation: false});
  }

  clickListener = (e) => {
    if (this.state.continueAnimation === true) {
      return;
    }
    const canv = this.refs.canvas;
    const lft = canv.offsetLeft;
    const top = canv.offsetTop;
    let cells = this.state.cells;
    const x = e.pageX - lft;
    const y = e.pageY - top;
    cells.forEach(cellrow => {
      cellrow.forEach(cell => {
        if (x >= cell.x && x <= cell.x+10 && y >= cell.y && y <= cell.y+10) {
          cell.toggle();
        }
      });
    });
    this.setState({ cells });
    this.draw()
  }

  componentDidMount() {
    const canv = this.refs.canvas;
    const ctx = canv.getContext('2d');
    for (let x = 0; x < this.width; x+=this.cellsize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
    }

    for (let y = 0; y<this.height; y+=this.cellsize) {
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
    }
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    this.draw();
    requestAnimationFrame(this.tick);
  }

  render() {
        return (
          <div>
            <h3>Welcome to Jordan's Game of Life</h3>
            <p>Generations: {this.state.generation}</p>
            <canvas ref="canvas" width={this.width} height={this.height} onClick = {this.clickListener} />
            <button onClick = {this.start}>Start</button>
            <button onClick = {this.stop}>Stop</button>
            <button onClick = {this.randomize}>Randomize</button>
            <button onClick = {this.clearGrid}>Clear</button>
          </div>
        )
    }
}
