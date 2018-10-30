import React, { Component } from "react";
import styled from 'styled-components';



const CanvasWindow = styled.canvas`
    border: 2px solid black;
`

class LifeCanvas extends Component{
  constructor(props){
    super(props)
    this.state = {
      numRows : this.props.rows,
      numCols : this.props.cols,
      cellBoundaries : [],
      offsetLeft : 0,
      offsetTop : 0,
    }
  }

  componentDidMount() {

    let numRows = this.state.numRows;
    let numCols = this.state.numCols;

    let canvas = this.refs.canvas;

    let squareWidth = canvas.width / numCols;
    let squareHeight = canvas.height / numRows;
    
    console.log("canvas: ", canvas);
    let c = canvas.getContext("2d");

    for (let i = 0; i < numRows; ++i) {
        for (let j = 0; j < numCols; ++j) {
            c.rect(j * squareWidth, i * squareHeight, squareWidth, squareHeight)
            c.stroke();
            let coords = {
                top : i * squareHeight,
                height : squareHeight,
                left :j * squareWidth,
                width : squareWidth
            }
            let boundaries = this.state.cellBoundaries;
            boundaries.push(coords); 
            this.setState({ cellBoundaries : boundaries})
            console.log("this.state.cellBoundaries: ", this.state.cellBoundaries);
        }
    }

    let imageData = c.getImageData(0,0,canvas.width, canvas.height);
    let screenBuffer = imageData.data;

    console.log("Image data: " , screenBuffer);
    this.setState({ offsetLeft : canvas.offsetLeft, offsetTop : canvas.offsetTop });

    canvas.addEventListener('click', this.handleClick)
    
  }

  handleClick = (event) => {
    console.log("clientX:", event.clientX, "clientY: ", event.clientY);
    console.log("canvas.offsetTop: ", this.state.offsetTop, "canvas.offsetLeft: ", this.state.offsetLeft);

    let y = event.clientY - this.state.offsetTop;
    let x = event.clientX - this.state.offsetLeft;

    console.log("x: ", x, "y: ", y);
    console.log("this.state.cellBoundaries", this.state.cellBoundaries);

    this.state.cellBoundaries.forEach((cell, index) => {
        console.log("cell top", cell.top, "cell height: ", cell.height, "cell left: ", cell.left, "cell width", cell.width);
        if (y > cell.top && y < cell.top + cell.height && x > cell.left && x < cell.left + cell.width) {
            alert(`clicked cell #${index}!!`);
        }
    })
  }


  render() {
    return (
      <div ref="outer">
        <CanvasWindow ref="canvas" width={300} height={300}/>
      </div>
    );
  }
}

export default LifeCanvas;