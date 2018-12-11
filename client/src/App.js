import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    matrix: {

    },

    matrixUsing: [],
    row_count: 15,//default
    col_count: 15,//default

    width: "330px",
    if_one_color : "black",
    if_zero_color: "white",  
  };

  componentWillMount() {
    this.setMatrixUp();
  }

  setMatrixUp = () => {
    const matrixUsing = [];
    let count = 0;
    let beginRow = 0; 
    let beginColumn = 0; 
    const matrix = {};
    while(beginRow != this.state.row_count){
      beginColumn = 0; 
      matrix[beginRow] = []; 
      while(beginColumn != this.state.col_count){
        matrix[beginRow].push(0);
        beginColumn++; 
      }
      beginRow++; 
    }
    Object.entries(matrix).forEach(entry => {
      for (let x of entry[1]) {
        const temp_hash = { row: 0, position_in_row: 0, actual_number: 0, value : "  "};
        temp_hash.row = Number(entry[0]);
        temp_hash.position_in_row = count % 15;
        temp_hash.actual_number = count;
        matrixUsing.push(temp_hash);
        count++;
      }
    });
    const width_size = 22* this.state.col_count;
    const width = `${width_size}px`; 

    this.setState({ matrix, matrixUsing, width });
  }

  turnOnOrOff = (row, position_in_row) => {
    //Just add 1 to the % of 2  it will provide 0 or 1. The conditional is already set up on the div to set the div to the correct class based off the value
    const matrix = this.state.matrix;
    matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? 1 : 0;
    this.setState({ matrix });
  };
  // Game functions being declared below this line.  
  handleChangeRow = (event) => {
    //Will handle the changing of the rows.
    //function allows for user to change the amount of rows that is being used.  
    this.setState({[event.target.name]: event.target.value});
  }
  handleChangeColumn = (event) => {
    //Will handle changing the columns. 
    //function allows user to change the amount of columns that is being used. 
    this.setState({[event.target.name]: event.target.value});
  }

  updateRowCol = () => {
    //this function will actually check if the value is acceptable and then make the change. 
    const rowValue = this.state.row_count;
    const colValue = this.state.col_count;

    if (rowValue < 15 || rowValue > 30){
      alert("Must be a numerical value of at least 15 and less than 30!");
      return; 
    }
    if (colValue < 15 || colValue > 30){
      alert("Must be a numerical value of at least 15 and less than 30!");
      return; 
    }

    this.setMatrixUp();

  }

  startTheGame = () => {
    //Function will start the game. 
  }
  stopTheGame = () => {
    //Function will stop the game. 
  }

  unPauseGame = () => {
    //This function will unpause the game running where it left off. 
    //This will pause the game if it is currently running. 
  }

  render() {
    const matrix = this.state.matrixUsing.slice();

    return (
      <div className="container" style = {{width: this.state.width}}>
        
        <h2 className = "titleApp">Jonathan's Game of Life</h2>
        
        {matrix.map((hash, id) => (
          <div
            key={id}
            onClick={() => this.turnOnOrOff(hash.row, hash.position_in_row)}
            className={
              this.state.matrix[hash.row][hash.position_in_row] === 0
                ? "offDiv gridDiv"
                : "onDiv gridDiv"
            }
          >
            {hash.position_in_row}
          </div>
        ))}

        <div>
          <div>
            <button>Start</button>{" "}
          </div>
          <div>
            <button>Stop</button>
          </div>
          <div>
            <button>Pause</button>
          </div>
          <div>
            <button>Clear</button>
          </div>
          <div>
            <button>Presets</button>{" "}
          </div>
          
          <div className = "slidecontainer">
            <h5>Row Size {this.state.row_count}</h5>
            <input type="text" name = "row_count" value = {this.state.row_count} onChange = {this.handleChangeRow}/>
            <input type = "range" min ="15" max = "30" value = {this.state.row_count} className = "slider" id = "myRange" name = "row_count" onChange = {this.handleChangeRow}/>
            <h5>Col Size {this.state.col_count}</h5>
            <input type="text" name ="col_count" value = {this.state.col_count} onChange = {this.handleChangeColumn}/>
            <input type = "range" min ="15" max = "30" value = {this.state.col_count} className = "slider" id = "myRange" name = "col_count" onChange = {this.handleChangeColumn}/>
            <br/>
            <button onClick = {this.updateRowCol}>Update Grid</button>
          </div>
        </div>
        
      </div>
      );
  }
}

export default App;
