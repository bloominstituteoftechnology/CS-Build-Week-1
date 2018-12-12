import React, { Component } from "react";
import ReactDOM from "react-dom";
export default class GameGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstRun: true
    }
  }
  drawGrid = (arr) => {
    let canvas = ReactDOM.findDOMNode(this.refs.myCanvas);
    let ctx = canvas.getContext("2d");
    const offset = 0;

    

    canvas.width = window.innerHeight *.6;
    canvas.height =  window.innerHeight *.6;
    const size = (canvas.width / this.props.x)-(offset);
    if (arr.length === 0) {
      return;
    }
    ctx.fillStyle = '#000000';
    if(this.props.clickable && this.state.firstRun){
      canvas.addEventListener('click',(event)=>this.handleClick(event,canvas.getBoundingClientRect(),offset,size));
    }
   
    this.setState({firstRun:false});
    
    for (let x = 0; x < this.props.x; x++) {
      for (let y = 0; y < this.props.y; y++) {
        let curPix = ((y * this.props.x) + x);
        if (arr[curPix].alive){
          ctx.fillRect(x * (size +offset ), y * (size +offset ), size, size);
        }
      }
    }
  };
  handleClick = (e,offset,lineoffset,squaresize)=>{
    let xclickPos = e.clientX - offset.left;
    let yclickPos = e.clientY - offset.top;
    xclickPos =Math.floor(xclickPos/(squaresize));
    yclickPos =Math.floor(yclickPos/(squaresize));
    this.props.clickHandle((yclickPos * this.props.x) + xclickPos)
  }
  componentDidMount() {
    this.drawGrid(this.props.pixels);
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.pixels !== prevProps.pixels) {
      this.drawGrid(this.props.pixels );
    }
  }
  
  render() {
    return (
      // <div
      //   style={{
      //     gridTemplateColumns: `repeat(${this.props.x}, 1fr)`,
      //     gridTemplateRows: `repeat(${this.props.y}, 1fr)`
      //   }}
      //   className="screen"
      // >
      //   {this.props.pixels.map((e, i) => {
      //     return e.isClickable ? (
      //       <div
      //         key={i}
      //         id={i}
      //         className="pixel"
      //         style={{ backgroundColor: e.color }}
      //         onClick={this.props.clickHandle}
      //       />
      //     ) : (
      //       <div
      //         key={i}
      //         id={i}
      //         className="pixel"
      //         style={{ backgroundColor: e.color }}
      //       />
      //     );
      //   })}
      // </div>
      <div className="canvasDiv">
        <canvas ref="myCanvas" />
      </div>
    );
  }
}
