import React, { Component } from 'react';
import './App.css';

class Box extends Component {
  // arrow function to select a box by row and column
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

class Grid extends Component{

  render(){
    //set a constant width equal to the number columns, consider the border which is one pixel
    const width = this.props.cols * 31;
    //array of all rows in the grid
    let rowArray = []; //add everything that will show up in the grid to this array

    let boxClass = "";
    // get this.props.rows and this.props.cols from parent "App"
    for(let i = 0; i < this.props.rows; i++) {
      // looping over the columns in each row
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j; // the id that goes with each box element the first box id would be 1_1

        //get this.props.gridFull from parent App component
        //ternary operator to identify the status of the box as on or off, fill the box to indicate "on" state
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        // push the box component into the array
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
      //this inline style will allow for a variable width
      <div className = "grid" style = {{width: width}}>
        {rowArray}
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();

    // these variables will not be accessible to other components
    // define these outside of state so we can reference them within the state
    this.rows = 15;
    this.cols = 15;

    this.state = {
      generation: 0, //this variable serves as a counter to track which generation the game is on
      /* create an array the size of the row variable and fill it with a map containing an array
      the size of the columns variable where each element in that array is false (cells start as turned-off)
      */
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }
  }

  selectBox = (row, col) => {
    // make a copy so that we are not updating state directly
    let gridCopy = arrayClone(this.state.gridFull);
    // find the box that was clicked and set it's state to the opposite of what it was
    gridCopy[row][col] = !gridCopy[row][col];
    // now update the state to be the grid copy
    this.setState({
      gridFull: gridCopy
    });
  }

  render(){

    return (
      //always wrap everything in a div
      <div className="App">
        <h1>
          Conway's Game Of Life
        </h1>
        <h4>
          Generations: {this.state.generation}
        </h4>
        <Grid
          /* pass in these variables in the parent component so as to reference them
          from within the Grid component */ 
          gridFull = {this.state.gridFull}
          rows = {this.rows}
          cols = {this.cols}
          selectBox = {this.selectBox}
        />

      </div>
    );
  }
}

/*create this helper function to take in an array and then stringify then copy it (deep clone)
 can't use slice because this is a nested array
*/
function arrayClone(arr){
  return JSON.parse(JSON.stringify(arr));
}

export default App;
