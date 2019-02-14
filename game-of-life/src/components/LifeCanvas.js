import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Cell {  /* boolean   int     int     int */
  constructor(living, xcoord, ycoord) {
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
    arr[j][k] = new Cell(0, 10*j, 10*k);
  }
}

export default class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.slow = 600;
    this.med = 300;
    this.fast = 50;
    this.cellsize = 10;
    this.height = 500;
    this.width = 500;
    this.state = {
      interval: 500,
      continueAnimation: false,
      cells: arr,
      generation: 0,
      dropdownOpen: false
    }
  }

  sample1 = () => {
    const rows = this.height/this.cellsize;
    const cols = this.width/this.cellsize;
    const midX = Math.floor(rows/2);
    const midY = Math.floor(cols/2);
    this.clearGrid();
    const mirrorCells = this.state.cells;
    mirrorCells[midX][midY].toggle();
    mirrorCells[midX+1][midY].toggle();
    mirrorCells[midX][midY+1].toggle();
    mirrorCells[midX+1][midY+1].toggle();
    mirrorCells[midX+2][midY+2].toggle();
    mirrorCells[midX+3][midY+2].toggle();
    mirrorCells[midX+2][midY+3].toggle();
    mirrorCells[midX+3][midY+3].toggle();

    mirrorCells[midX-15][midY+15].toggle();
    mirrorCells[midX-14][midY+15].toggle();
    mirrorCells[midX-15][midY+16].toggle();
    mirrorCells[midX-14][midY+16].toggle();
    mirrorCells[midX-13][midY+17].toggle();
    mirrorCells[midX-12][midY+17].toggle();
    mirrorCells[midX-13][midY+18].toggle();
    mirrorCells[midX-12][midY+18].toggle();

    mirrorCells[midX-15][midY-15].toggle();
    mirrorCells[midX-14][midY-15].toggle();
    mirrorCells[midX-15][midY-14].toggle();
    mirrorCells[midX-14][midY-14].toggle();
    mirrorCells[midX-13][midY-13].toggle();
    mirrorCells[midX-12][midY-13].toggle();
    mirrorCells[midX-13][midY-12].toggle();
    mirrorCells[midX-12][midY-12].toggle();

    mirrorCells[midX+15][midY+15].toggle();
    mirrorCells[midX+16][midY+15].toggle();
    mirrorCells[midX+15][midY+16].toggle();
    mirrorCells[midX+16][midY+16].toggle();
    mirrorCells[midX+17][midY+17].toggle();
    mirrorCells[midX+18][midY+17].toggle();
    mirrorCells[midX+17][midY+18].toggle();
    mirrorCells[midX+18][midY+18].toggle();

    mirrorCells[midX+15][midY-15].toggle();
    mirrorCells[midX+16][midY-15].toggle();
    mirrorCells[midX+15][midY-14].toggle();
    mirrorCells[midX+16][midY-14].toggle();
    mirrorCells[midX+17][midY-13].toggle();
    mirrorCells[midX+18][midY-13].toggle();
    mirrorCells[midX+17][midY-12].toggle();
    mirrorCells[midX+18][midY-12].toggle();
    this.draw();
  }

  sample2 = () => {
    const rows = this.height/this.cellsize;
    const cols = this.width/this.cellsize;
    const midX = Math.floor(rows/2);
    const midY = Math.floor(cols/2);
    this.clearGrid();
    const mirrorCells = this.state.cells;
    mirrorCells[midX][midY].toggle();
    mirrorCells[midX][midY+1].toggle();
    mirrorCells[midX][midY+2].toggle();
    mirrorCells[midX-1][midY+2].toggle();
    mirrorCells[midX-2][midY+1].toggle();

    mirrorCells[midX-5][midY-5].toggle();
    mirrorCells[midX-5][midY-4].toggle();
    mirrorCells[midX-5][midY-3].toggle();
    mirrorCells[midX-6][midY-3].toggle();
    mirrorCells[midX-7][midY-4].toggle();

    mirrorCells[midX-5][midY].toggle();
    mirrorCells[midX-5][midY+1].toggle();
    mirrorCells[midX-5][midY+2].toggle();
    mirrorCells[midX-6][midY+2].toggle();
    mirrorCells[midX-7][midY+1].toggle();

    mirrorCells[midX][midY-5].toggle();
    mirrorCells[midX][midY-4].toggle();
    mirrorCells[midX][midY-3].toggle();
    mirrorCells[midX-1][midY-3].toggle();
    mirrorCells[midX-2][midY-4].toggle();
    this.draw();
  }

  sample3 = () => {
    const rows = this.height/this.cellsize;
    const cols = this.width/this.cellsize;
    const midX = Math.floor(rows/2);
    const midY = Math.floor(cols/2);
    this.clearGrid();
    const mirrorCells = this.state.cells;
    mirrorCells[midX][midY].toggle();
    mirrorCells[midX][midY+1].toggle();
    mirrorCells[midX][midY+2].toggle();
    mirrorCells[midX][midY+4].toggle();
    mirrorCells[midX][midY+5].toggle();
    mirrorCells[midX][midY-1].toggle();
    mirrorCells[midX][midY-2].toggle();
    mirrorCells[midX][midY-4].toggle();
    mirrorCells[midX][midY-5].toggle();
    mirrorCells[midX+1][midY+3].toggle();
    mirrorCells[midX-1][midY+3].toggle();
    mirrorCells[midX+1][midY-3].toggle();
    mirrorCells[midX-1][midY-3].toggle();
    this.draw();
  }

  stepBy1Gen = () => {
    if (this.state.continueAnimation) {
      return;
    }
    this.update();
    this.draw();
    this.nextgen();
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
    ctx.strokeStyle = 'black';
    ctx.stroke();
    let cells = this.state.cells;
    cells.forEach(cellRow => {
      cellRow.forEach(cell => {
        cell.living = 0;
      });
    });
    this.setState({ cells, generation: 0, continueAnimation: false });
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
    this.setState({ cells, generation: 0, continueAnimation: false });
    this.draw()
  }

  nextgen = () => {
    this.setState(prevState => ({ generation: prevState.generation+1 }))
  }

  draw = () => {
    const canv = this.refs.canvas;
    const ctx = canv.getContext('2d');
    const color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

    for (let j=0; j<this.height/this.cellsize; j++) {
      for (let k=0; k<this.width/this.cellsize; k++) {
        if (this.state.cells[j][k].living == 1) {
          ctx.fillStyle = color;
          ctx.fillRect(j*this.cellsize, k*this.cellsize, this.cellsize-1, this.cellsize-1);
        }
        else {
          ctx.fillStyle = 'lightgray';
          ctx.fillRect(j*this.cellsize, k*this.cellsize, this.cellsize-1, this.cellsize-1);
        }
      }
    }
  }

  update = () => {
    const rows = this.height/this.cellsize;
    const cols = this.width/this.cellsize;
    const mirrorCells = new Array(rows).fill(0).map(row => new Array(cols).fill(0));

    for (let x=0; x<rows; x++) {
      for (let y=0; y<cols; y++) {
        mirrorCells[x][y] = new Cell(0, x*this.width, y*this.height);
      }
    }

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

        if (this.state.cells[j][k].living == 0 && liveneighbors === 3) {
              mirrorCells[j][k].toggle();
        }
        if (this.state.cells[j][k].living == 1) {
          switch (liveneighbors) {
            case 2:
            case 3:
              mirrorCells[j][k].toggle();
              break;
          }
        }
        // else {
        //   console.log("Something went wrong in your update function!")
        // }
      }
    }
    this.setState({ cells: mirrorCells });
  }

  animate = () => {
    setTimeout(this.tick, this.state.interval)
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
    if (this.state.continueAnimation) {
      return;
    }
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
    const ctx = canv.getContext('2d');
    const lft = canv.offsetLeft;
    const top = canv.offsetTop;
    let cells = this.state.cells;
    const x = e.pageX - lft;
    const y = e.pageY - top;
    const xindex = Math.floor(x/this.cellsize);
    const yindex = Math.floor(y/this.cellsize);
    console.log(xindex, yindex);
    cells[xindex][yindex].toggle();
    // this.draw()
    ctx.fillStyle = cells[xindex][yindex].living ? 'white' : 'gray';
    ctx.fillRect(xindex*this.cellsize, yindex*this.cellsize, this.cellsize-1, this.cellsize-1);
    this.setState({ cells })
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
    ctx.strokeStyle = 'black';
    ctx.stroke();
    this.draw();
    requestAnimationFrame(this.tick);
  }

  render() {
        return (
          <div className="GameContainer">
            <div className="GameHeader">
              <h1>Jordan's Game of Life</h1>
              <p>Click squares or pick a preset to begin:</p>
              <Link to='/rules'><button>Rules of the Game</button></Link>
              <Link to='/about'><button>About the Algorithm</button></Link>
              <p>Generations: {this.state.generation}</p>
            </div>
            <div className="Game">
              <div className="Buttons">
                <button className="Config" onClick = {this.sample1}>Preset 1</button>
                <button className="Config" onClick = {this.sample2}>Preset 2</button>
                <button className="Config" onClick = {this.sample3}>Preset 3</button>
                <button className="Config" onClick = {this.randomize}>Randomize</button>
                <button onClick = {this.start}>Start</button>
                <button onClick = {this.stop}>Stop</button>
                <button onClick = {this.clearGrid}>Clear</button>
                <button onClick = {this.stepBy1Gen}>Next Generation</button>
              </div>
              <canvas ref="canvas" width={this.width} height={this.height} onClick = {this.clickListener} /> <br/>
            </div>
          </div>
        )
    }
}
