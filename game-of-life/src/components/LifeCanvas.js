import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const rows = 50;
const cols = 50;
let arr = [];
for (let i=0; i<rows; i++) {
  arr[i] = [];
}
for (let j=0; j<rows; j++) {
  for (let k=0; k<cols; k++) {
    arr[j][k] = 0;
  }
}

class LifeCanvas extends Component {
  constructor(props) {
    super(props);
    this.cellsize = 10;
    this.height = 500;
    this.width = 500;
    this.state = {
      continueAnimation: true,
      cells: arr
    }
  }

  draw = () => {
    const canv = this.refs.canvas;
    const ctx = canv.getContext('2d');
    for (let x = 0; x < this.width; x+=this.cellsize) {
      ctx.moveto(x, 0);
      ctx.lineto(x, this.height);
    }

    for (let y = 0; y<this.height; y+=this.cellsize) {
      ctx.moveto(0, y);
      ctx.lineto(this.width, y);
    }
    ctx.strokeStyle = black;
    ctx.stroke();

    for (let j=0; j<this.height/this.cellsize; j++) {
      for (let k=0; k<this.width/this.cellsize; k++) {
        if (this.state.cells[j][k] == 1) {
          ctx.fillStyle = “#FF0000”;
          ctx.fillRect(j*this.cellsize, k*this.cellsize, this.cellsize, this.cellsize);
        } else {
          ctx.fillStyle = 'black';
          ctx.fillRect(j*this.cellsize, k*this.cellsize, this.cellsize, this.cellsize);
        }
      }
    }
  }

  update = () => {
    let mirrorCells = this.state.cells;
    for (let j=0; j<this.height/this.cellsize; j++) {
      for (let k=0; k<this.width/this.cellsize; k++) {
        let liveneighbors = 0;
        liveneighbors += this.state.cells[j-1][k-1];
        liveneighbors += this.state.cells[j-1][k];
        liveneighbors += this.state.cells[j-1][k+1];
        liveneighbors += this.state.cells[j][k-1];
        liveneighbors += this.state.cells[j][k+1];
        liveneighbors += this.state.cells[j+1][k-1];
        liveneighbors += this.state.cells[j+1][k];
        liveneighbors += this.state.cells[j+1][k+1];
        if (this.state.cells[j][k] == 0) {
          switch (liveneighbors) {
            case 3:
              mirrorCells[j][k] = 1;
              break;
            default:
              mirrorCells[j][k] = 0;
          }
        } else if (this.state.cells[j][k] == 1) {
          switch (liveneighbors) {
            case 0:
            case 1:
              mirrorCells[j][k] = 0;
              break;
            case 2:
            case 3:
              mirrorCells[j][k] = 1;
              break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
              mirrorCells[j][k] = 0;
              break;
            default:
              mirrorCells[j][k] = 0;
          }
        } else {
          console.log("Something went wrong in your update function!")
        }
      }
    }
  }

  tick = () => {
    draw();
    update();
    this.props.nextgen();
    requestAnimationFrame(tick);
  }

  componentDidMount() {
    requestAnimationFrame(tick);
  }

  render() {
        return <canvas ref="canvas" width={this.width} height={this.height} />
    }
}
