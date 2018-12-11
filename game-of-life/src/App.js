import React, { Component } from 'react';
import './App.css';

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.row, this.props.col);
  }

  render(){
    return(
      <div
          className = {this.props.boxClass}
          id = {this.props.id}
          onClick = {this.selectBox}
      />

    );
  }
}

class Grid extends React.Component{

  render(){
    //set a constant width equal to the number columns
    const width = this.props.cols * 31;
    let rowArray = [];

    let boxClass = "";
    for(let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j; // the first box id would be 1_1

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowArray.push(
          <Box
            boxClass = {boxClass}
            key = {boxId}
            boxId = {boxId}
            row = {i}
            col = {j}
            selectBox = {this.props.selectBox}
            />
        )
      }
    }

    return (
      <div className = "grid" style = {{width: width}}>
        {rowArray}
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.rows = 15;
    this.cols = 15;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
  }

  render(){

    return (
      <div className="App">
        <h1>
          Conway's Game Of Life
        </h1>
        <h4>
          Generations: {this.state.generation}
        </h4>
        <Grid 
          gridFull = {this.state.gridFull}
          rows = {this.rows}
          cols = {this.cols}
          selectBox = {this.selectBox}
        />

      </div>
    );
  }
}

function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

export default App;
