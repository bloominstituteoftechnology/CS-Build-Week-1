import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    matrix: {

    },
    //grid set up
    matrixUsing: [],
    row_count: 15,//default
    col_count: 15,//default

    width: "330px",
    //cell choices
    if_one_color : "black",
    if_zero_color: "white", 
    //game instructions  
    gameRunning: false,
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
        const temp_hash = { row: 0, position_in_row: 0, actual_number: 0, color : this.state.if_zero_color};
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
    // matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? this.state.if_one_color: this.state.if_zero_color;
    matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? 1 : 0;
    this.setState({ matrix });
  };

  manualTurnOnOrOff = (row, position_in_row) => {
    //Just add 1 to the % of 2  it will provide 0 or 1. The conditional is already set up on the div to set the div to the correct class based off the value
    if (this.state.gameRunning === false){
      const matrix = this.state.matrix;
      // matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? this.state.if_one_color: this.state.if_zero_color;
      matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? 1 : 0;
      this.setState({ matrix });
    }
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

  runGamne = () => {
    //functionaly for gameplay goes here
  }

  startTheGame = () => {
    //Function will start the game. 
    if(this.state.gameRunning === false){
      this.setState({
        gameRunning: true, 
      }, () => {
        this.intervalRef = setInterval(() => this.runGame(), 10);
      })
    }
  }
  stopTheGame = () => {
    //Function will stop the game. 
    this.setState({
      gameRunning: false
    }, () => {
      if(this.intervalRef){
        clearInterval(this.intervalRef);
      }
    })
  }

  unPauseGame = () => {
    //This function will unpause the game running where it left off. 
    //This will pause the game if it is currently running. 
  }

  handleColorChangeIfZero = (color) => {
    this.setState({if_zero_color : color});
  }

  handleColorChangeIfOne = (color) => {
    this.setState({if_one_color : color});
  }

  render() {
    console.log(this.state.if_zero_color);
    
    const matrix = this.state.matrixUsing.slice();

    return (
      <div className="container" style = {{width: this.state.width}}>
        
        <h2 className = "titleApp">Jonathan's Game of Life</h2>
        
        {matrix.map((hash, id) => (
          <div
            key={id}
            onClick={() => this.manualTurnOnOrOff(hash.row, hash.position_in_row)}
            style = {{background: this.state.matrix[hash.row][hash.position_in_row] === 0 ? this.state.if_zero_color : this.state.if_one_color, color: this.state.matrix[hash.row][hash.position_in_row] === 0 ? this.state.if_zero_color : this.state.if_one_color}}
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
            <button onClick = {this.updateRowCol}>Clear</button>
          </div>
          <div>
            <button>Presets</button>{" "}
          </div>
          
          <div className = "slidecontainer">
            <h5>Row Count {this.state.row_count}</h5>
            <input type = "range" min ="15" max = "30" value = {this.state.row_count} className = "slider" id = "myRange" name = "row_count" onChange = {this.handleChangeRow}/>
            <h5>Col Count {this.state.col_count}</h5>
            <input type = "range" min ="15" max = "30" value = {this.state.col_count} className = "slider" id = "myRange" name = "col_count" onChange = {this.handleChangeColumn}/>
            <br/>
            <h5>Color 0: {this.state.if_zero_color}</h5>
            <div className = "colorChoices">
              <div className ="divcolor white" onClick = {() => this.handleColorChangeIfZero("white")}>w</div>
              <div className ="divcolor black" onClick = {() => this.handleColorChangeIfZero("black")}>b</div>
              <div className ="divcolor blue" onClick = {() => this.handleColorChangeIfZero("blue")}>bl</div>
              <div className ="divcolor green" onClick = {() => this.handleColorChangeIfZero("green")}>g</div>
              <div className ="divcolor orange" onClick = {() => this.handleColorChangeIfZero("orange")}>o</div>
              <div className ="divcolor purple" onClick = {() => this.handleColorChangeIfZero("purple")}>pu</div>
              <div className ="divcolor pink" onClick = {() => this.handleColorChangeIfZero("pink")}>pk</div>
              <div className ="divcolor yellow" onClick = {() => this.handleColorChangeIfZero("yellow")}>y</div>
              
            </div>
            <h5>Color 1: {this.state.if_one_color}</h5>
            <div className = "colorChoices">
              <div className ="divcolor white" onClick = {() => this.handleColorChangeIfOne("white")}>w</div>
              <div className ="divcolor black" onClick = {() => this.handleColorChangeIfOne("black")}>b</div>
              <div className ="divcolor blue" onClick = {() => this.handleColorChangeIfOne("blue")}>bl</div>
              <div className ="divcolor green" onClick = {() => this.handleColorChangeIfOne("green")}>g</div>
              <div className ="divcolor orange" onClick = {() => this.handleColorChangeIfOne("orange")}>o</div>
              <div className ="divcolor purple" onClick = {() => this.handleColorChangeIfOne("purple")}>p</div>
              <div className ="divcolor pink" onClick = {() => this.handleColorChangeIfOne("pink")}>pk</div>
              <div className ="divcolor yellow" onClick = {() => this.handleColorChangeIfOne("yellow")}>y</div>
            </div>

            <button onClick = {this.updateRowCol}>Update Grid</button>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </div>
        
      </div>
      );
  }
}

export default App;
