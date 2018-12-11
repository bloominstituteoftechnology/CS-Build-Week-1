import React, { Component } from 'react';
import './App.css';

class Box extends Component {
  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
      />
    );
  }
}

class Grid extends Component {
  render() {

    const width = this.props.cols * 16;
    var rowsArr = [];

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {

        let boxId = i + "_" + j;

        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box 
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        )
      }
    };

    return (
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.rows = 30;
    this.cols = 50;
    
    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Game of Life</h1>
        <Grid 
          rows={this.rows} 
          cols={this.cols} 
          gridFull={this.state.gridFull} 
        />
        <h3>Generation: {this.state.generation} </h3>
      </div>
    );
  }
}

export default App;
