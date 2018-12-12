import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    matrix: {},
    //grid set up
    matrixMirror : {}, 
    matrixUsing: [],
    mirror: [], 
    row_count: 15, //default
    col_count: 15, //default

    width: "330px",
    //presets 
    presets: ["Block", "Beehive", "Loaf", "Boat", "Tub"],
    //cell choices
    if_one_color: "black",
    if_zero_color: "white",
    //game instructions
    gameRunning: false,
    generation: 0,
  };

  componentWillMount() {
    this.setMatrixUp();
  }

  generateRandom = () => {
    console.log("random generating");
    const keys = Object.keys(this.state.matrix);
    const matrix = {...this.state.matrixMirror};//creates a copy 

    for(let i = 0; i< keys.length; i++){
      for(let j = 0; j<matrix[i].length; j++){
        const grabRandom = Math.random(); 
        const convertToNumber = (grabRandom *2);
    
        const floorNumber =Math.floor(convertToNumber);
    
        if (floorNumber === 1) {
          matrix[i][j] = 1; 
          
        } else {
          matrix[i][j] = 0; 
        }
      }
    }
    console.log(matrix); 
    this.setState({matrix});
    this.continueWithGame();
    

  }

  setMatrixUp = () => {
    const matrixUsing = [];
    let count = 0;
    let beginRow = 0;
    let beginColumn = 0;
    const matrix = {};
    while (beginRow < this.state.row_count) {
      beginColumn = 0;
      matrix[beginRow] = [];
      while (beginColumn < this.state.col_count) {
        matrix[beginRow].push(0);
        beginColumn++;
      }
      beginRow++;
    }
    Object.entries(matrix).forEach(entry => {
      for (let x of entry[1]) {
        const temp_hash = {
          row: 0,
          position_in_row: 0,
          actual_number: 0,
          color: this.state.if_zero_color
        };
        temp_hash.row = Number(entry[0]);
        temp_hash.position_in_row = count % this.state.col_count;
        temp_hash.actual_number = count;
        temp_hash.value = x; //just to get rid of the warning. 
        matrixUsing.push(temp_hash);
        count++;
      }
    });
    const width_size = 22 * this.state.col_count;
    const width = `${width_size}px`;

    this.setState({ matrix, matrixUsing, width, matrixMirror: matrix });
    return true; // means its finished. 
  };
  continueWithGame = () => {
    const matrixUsing = [];
    const matrix = {...this.state.matrix};//creates a copy
    let count = 0;
    
    Object.entries(matrix).forEach(entry => {
      for (let x of entry[1]) {
        const temp_hash = {
          row: 0,
          position_in_row: 0,
          actual_number: 0,
          color: this.state.if_zero_color
        };
        temp_hash.row = Number(entry[0]);
        temp_hash.position_in_row = count % this.state.col_count;
        temp_hash.actual_number = count;
        temp_hash.value = x; //just to get rid of the warning. 
        matrixUsing.push(temp_hash);
        count++;
      }
    });
    const width_size = 22 * this.state.col_count;
    const width = `${width_size}px`;

    this.setState({ matrix, matrixUsing, width });
  }

  manualTurnOnOrOff = (row, position_in_row) => {
    //Just add 1 to the % of 2  it will provide 0 or 1. The conditional is already set up on the div to set the div to the correct class based off the value
    if (this.state.gameRunning === false) {
      const matrix = this.state.matrix;
      // matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? this.state.if_one_color: this.state.if_zero_color;
      matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? 1 : 0;
      this.setState({ matrix });
    }
  };
  // Game functions being declared below this line.
  handleChangeRow = event => {
    //Will handle the changing of the rows.
    //function allows for user to change the amount of rows that is being used.
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeColumn = event => {
    //Will handle changing the columns.
    //function allows user to change the amount of columns that is being used.
    this.setState({ [event.target.name]: event.target.value });
  };

  updateRowCol = () => {
    //this function will actually check if the value is acceptable and then make the change.
    const rowValue = this.state.row_count;
    const colValue = this.state.col_count;

    if (rowValue < 15 || rowValue > 30) {
      alert("Must be a numerical value of at least 15 and less than 30!");
      return;
    }
    if (colValue < 15 || colValue > 30) {
      alert("Must be a numerical value of at least 15 and less than 30!");
      return;
    }

    this.setMatrixUp();
  };


  runGamne = () => {
    //functionaly for gameplay goes here
    console.log("Starting the game");
    const matrix = this.state.matrixUsing.slice(); 
    let gameRunning = true; 
    const state_matrix = {...this.state.matrix};//creates a copy 
    
    

    for(let i = 0; i<matrix.length; i++){

        let aliveNeighbors = this.findLiveNeighbors({row: matrix[i].row, position_in_row: matrix[i].position_in_row});
        let current_cell_alive = this.state.matrix[matrix[i].row][matrix[i].position_in_row] === 1 ? true : false; 
        if (current_cell_alive){
          if(aliveNeighbors !== 2 || aliveNeighbors !== 3){
            //kill the cell that is currently alive. 
            console.log(`Killing the cell ${matrix[i].row}, ${matrix[i].position_in_row}`);
            state_matrix[matrix[i].row][matrix[i].position_in_row] = 0; 
            // this.setState({state_matrix});
            this.continueWithGame();
          }
        } else {
          if(aliveNeighbors ===3){
            //resurrect the currently dead cell. 
            console.log(`Resurrecting the cell ${matrix[i].row}, ${matrix[i].position_in_row}`);
            state_matrix[matrix[i].row][matrix[i].position_in_row] = 1;
            // this.setState({state_matrix});
            this.continueWithGame();
          }
        }
        console.log(matrix[i].row);
    }
    // setTimeout(this.presetChange("Block"), 3000); 
    // this.setState(prevState => ({generation: prevState.generation + 1}) );
    // setTimeout(this.presetChange("Beehive"), 3000); 
    // this.setState(prevState => ({generation: prevState.generation + 1}) );
    // setTimeout(this.presetChange("Loaf"), 3000); 
    // this.setState(prevState => ({generation: prevState.generation + 1}) );
    // setTimeout(this.presetChange("Boat"), 3000); 
    // this.setState(prevState => ({generation: prevState.generation + 1}) );
    // setTimeout(this.presetChange("Tub"), 3000); 
    // this.setState(prevState => ({generation: prevState.generation + 1}) );
    
    this.setState({matrix : state_matrix});
      
  };

  startTheGame = () => {
    //Function will start the game.
    let intervalRef = setInterval(this.runGamne(), 10); 
    if (this.state.gameRunning === false) {
      this.setState(
        {
          gameRunning: true,
          intervalRef
        });
    }
  };
  stopTheGame = () => {
    // //Function will stop the game.
    clearInterval(this.state.intervalRef);
    console.log("Stop the game");
    this.setState(prevState => ({gameRunning: !prevState.gameRunning}) );
  };

  nextGeneration = () => {
    const state_matrix = {...this.state.matrix}; 
    const keys = Object.keys(state_matrix); 

    for(let i = 0; i<keys.length; i++){

      // let aliveNeighbors = this.findLiveNeighbors({row: keys[i].row, position_in_row: keys[i].position_in_row});
      // let current_cell_alive = state_matrix[ === 1 ? true : false; 
      for (let j = 0; j < state_matrix[i].length; j++){
        console.log(i, j);
        let aliveNeighbors = this.findLiveNeighbors({row: i, position_in_row: j});
        let current_cell_alive = state_matrix[i][j] === 1 ? true : false; 
        if (current_cell_alive){
          if(aliveNeighbors !== 2 || aliveNeighbors !== 3){
            //kill the cell that is currently alive. 
            console.log(`Killing the cell ${i}, ${j}`);
            state_matrix[i][j] = 0; 
            this.setState({matrix: state_matrix});
            
            this.continueWithGame();
          } else {
          if(aliveNeighbors ===3){
            //resurrect the currently dead cell. 
            console.log(`Resurrecting the cell ${i}, ${j}`);
            state_matrix[i][j] = 1;
            this.setState({matrix: state_matrix});
            this.continueWithGame();
          }
        }
      }

    }
   }
  }


  handleColorChangeIfZero = color => {
    this.setState({ if_zero_color: color });
  };

  handleColorChangeIfOne = color => {
    this.setState({ if_one_color: color });
  };

  

  findLiveNeighbors = position => {
    //find neighbors of the live cell to use the rules on.
    //position should be an object featuring  the row and  position in row.
    //A neighbor will be  to the left to the right  up down and diagonal  which will be up to the left, up to the right and down to the left down to the right.
    let totalAlive = 0;

    let lookUp = true;
    let lookDown = true;
    let lookRight = true;
    let lookLeft = true;

    //logic for if I should look up or down.
    if (position.row === 0) {
      lookUp = false;
    } else if (position.row === this.state.row_count - 1) {
      lookDown = false;
    }

    //logic for if I should look right or left.
    if (position.position_in_row === 0) {
      lookLeft = false;
    } else if (position.position_in_row === this.state.col_count - 1) {
      lookRight = false;
    }
    //find the alive
    if (lookUp) {
      //1
      if (this.state.matrix[position.row - 1][position.position_in_row] === 1) {
        totalAlive++;
      }
      if (lookRight) {
        

        //diagonal right up one to the right one
        if (
          //3
          this.state.matrix[position.row - 1][position.position_in_row + 1] ===
          1
        ) {
          totalAlive++;
        }

        if (lookLeft) {
          //diagonal left up one minus one
          if (
            //5
            this.state.matrix[position.row - 1][
              position.position_in_row - 1
            ] === 1
          ) {
            totalAlive++;
          }
        }
      }
    } // end of the lookUP

    if (lookDown) {
      //6
      if (this.state.matrix[position.row + 1][position.position_in_row] === 1) {
        totalAlive++;
      }

      if (lookRight) {
        //down one to the right (plus one)
        if (
          //7
          this.state.matrix[position.row + 1][position.position_in_row + 1] ===
          1
        ) {
          totalAlive++;
        }
      }
      if (lookLeft) {
        //down one to the left (minus one)
        if (
          //8
          this.state.matrix[position.row][position.position_in_row - 1] === 1
        ) {
          totalAlive++;
        }
      }

      //only 8 possible ways but currently if  top is false the cells next to it won't be checked. Need to check them solo. 
      if (lookRight) {
        if (
          //next in line plus one
          //2
          this.state.matrix[position.row][position.position_in_row + 1] === 1
        ) {
          totalAlive++;
        }
      }

      if (lookLeft) {
        //previous in line minus one
        if (
          //4
          this.state.matrix[position.row][position.position_in_row - 1] === 1
        ) {
          totalAlive++;
        }
      }
    }

    return totalAlive;
  };

  presetChange = (type) => {
    
    const finished = this.setMatrixUp();//will reset the grid before setting it up. 
    
    let row_index = 0;
    let col_index = 0; 
    if (finished){
      console.log(finished);
      console.log(this.state.matrix);
      const matrix = {...this.state.matrixMirror};//creates a copy
      if(Object.keys(matrix).length){
        switch(type){
          case "Block":
            this.setMatrixUp();//will reset the grid before setting it up. 
            row_index = this.state.row_count % 2 === 0 ? this.state.row_count / 2 : (this.state.row_count - 1) / 2; 
            col_index = this.state.col_count % 2 === 0 ? this.state.col_count / 2 : (this.state.col_count - 1) / 2; 
            matrix[row_index][col_index] = 1; 
            matrix[row_index-1][col_index] = 1; 
            matrix[row_index-1][col_index-1] = 1; 
            matrix[row_index][col_index - 1]  = 1; 
            this.setState({matrix}, () => {this.continueWithGame()});
            
            break;
          case "Beehive":
            row_index = this.state.row_count % 2 === 0 ? this.state.row_count / 2 : (this.state.row_count - 1) / 2; 
            col_index = this.state.col_count % 2 === 0 ? this.state.col_count / 2 : (this.state.col_count - 1) / 2; 
            matrix[row_index][col_index] = 1; 
            matrix[row_index][col_index-1] = 1; 
            matrix[row_index -1][col_index-2] = 1;
            matrix[row_index-2][col_index] = 1; 
            matrix[row_index-2][col_index -1] = 1; 
            matrix[row_index-1][col_index + 1] = 1;
            
            this.setState({matrix}, () => {this.continueWithGame()});
            break; 
          case "Loaf":
            row_index = this.state.row_count % 2 === 0 ? this.state.row_count / 2 : (this.state.row_count - 1) / 2; 
            col_index = this.state.col_count % 2 === 0 ? this.state.col_count / 2 : (this.state.col_count - 1) / 2; 
            matrix[row_index][col_index] = 1; 
            matrix[row_index-1][col_index] = 1;
            matrix[row_index+1][col_index-1] = 1;
            matrix[row_index][col_index-2] =1;
            matrix[row_index-1][col_index-3] = 1;
            matrix[row_index-2][col_index-2] = 1;
            matrix[row_index-2][col_index-1] = 1;
            
            this.setState({matrix}, () => {this.continueWithGame()});
            break;
          case "Boat":
            row_index = this.state.row_count % 2 === 0 ? this.state.row_count / 2 : (this.state.row_count - 1) / 2; 
            col_index = this.state.col_count % 2 === 0 ? this.state.col_count / 2 : (this.state.col_count - 1) / 2; 
            matrix[row_index-1][col_index] = 1; 
            matrix[row_index-1][col_index-2] = 1; 
            matrix[row_index-2][col_index-2] = 1;
            matrix[row_index-2][col_index-1] = 1; 
            matrix[row_index][col_index - 1]  = 1;
            this.setState({matrix}, () => {this.continueWithGame()});
            break; 
          case "Tub":
            row_index = this.state.row_count % 2 === 0 ? this.state.row_count / 2 : (this.state.row_count - 1) / 2; 
            col_index = this.state.col_count % 2 === 0 ? this.state.col_count / 2 : (this.state.col_count - 1) / 2; 
            matrix[row_index-1][col_index] = 1; 
            matrix[row_index-1][col_index-2] = 1; 
            matrix[row_index-2][col_index-1] = 1; 
            matrix[row_index][col_index - 1]  = 1; 
            this.setState({matrix}, () => {this.continueWithGame()});
            break;
          case "Blinker 1":
            row_index = this.state.row_count % 2 === 0 ? this.state.row_count / 2 : (this.state.row_count - 1) / 2; 
            col_index = this.state.col_count % 2 === 0 ? this.state.col_count / 2 : (this.state.col_count - 1) / 2; 
            matrix[row_index][col_index] = 1;
            matrix[row_index - 1][col_index] = 1;
            matrix[row_index + 1][col_index] = 1; 
    
            this.setState({matrix}, () => {this.continueWithGame()});
            break;
          case "Blinker 2":
            row_index = this.state.row_count % 2 === 0 ? this.state.row_count / 2 : (this.state.row_count - 1) / 2; 
            col_index = this.state.col_count % 2 === 0 ? this.state.col_count / 2 : (this.state.col_count - 1) / 2; 
            matrix[row_index][col_index] = 1;
            matrix[row_index][col_index-1] = 1; 
            matrix[row_index][col_index+1] = 1; 
            this.setState({matrix}, () => {this.continueWithGame()});
            break;
          default:
            console.log("That type doesn't exist");//only for react warning purposes this won't actually hit. 
        }
      }
    }
  }

  test = () => {
    console.log("test");
  }

  render() {
    
    console.log("test");
    const matrix = this.state.matrixUsing.slice();

    return (
      <div className="container" style={{ width: this.state.width }}>
        <h2 className="titleApp">Jonathan's Game of Life</h2>
        <p>Rules: 
          •	If a cell is alive and it has exactly 2 or 3 living neighbors, it stays alive. 
          
          •	If a cell is dead and it has exactly 3 living neighbors, it rises again.
        </p>
        <h4 className="titleApp">Generation : {this.state.generation}</h4>
        <div className="topButtons">
          <div>
              <button onClick = {this.startTheGame}>Start</button>{" "}
            </div>
            <div>
              <button onClick = {this.stopTheGame}>Stop</button>
            </div>
            <div>
              <button onClick={this.updateRowCol}>Clear</button>
            </div>
            <div>
              <button onClick = {this.generateRandom}>Random</button>
            </div>
            <div>
              <button onClick = {this.nextGeneration}>Next</button>
            </div>
            <br/>
            <br/>
            <br/>
        
        </div>
        {matrix.map((hash, id) => (
          <div
            key={id}
            onClick={() =>
              this.manualTurnOnOrOff(hash.row, hash.position_in_row)
            }
            
            style={{
              background:
                this.state.matrix[hash.row][hash.position_in_row] === 0
                  ? this.state.if_zero_color
                  : this.state.if_one_color,
              color:
                this.state.matrix[hash.row][hash.position_in_row] === 0
                  ? this.state.if_zero_color
                  : this.state.if_one_color
            }}
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
          <h5>Presets</h5>
          <div className = "presetsDiv">
            
            <p onClick = {() => this.presetChange("Block")}>Block</p>
            <p onClick = {() => this.presetChange("Beehive")}>Beehive</p>
            <p onClick = {() => this.presetChange("Loaf")}>Loaf</p>
            <p onClick = {() => this.presetChange("Boat")}>Boat</p>
            <p onClick = {() => this.presetChange("Tub")}>Tub</p>
          </div>

          <h5>Oscillator</h5>
          <div className="presetsDiv">
            <p onClick = {() => this.presetChange("Blinker 1")}>Blinker 1</p>
            <p onClick = {() => this.presetChange("Blinker 2")}>Blinker 2</p>
          </div>
          

          <div className="slidecontainer">
            <h5>Row Count {this.state.row_count}</h5>
            <input
              type="range"
              min="15"
              max="30"
              value={this.state.row_count}
              className="slider"
              id="myRange"
              name="row_count"
              onChange={this.handleChangeRow}
            />
            <h5>Col Count {this.state.col_count}</h5>
            <input
              type="range"
              min="15"
              max="30"
              value={this.state.col_count}
              className="slider"
              id="myRange"
              name="col_count"
              onChange={this.handleChangeColumn}
            />
            <button onClick={this.updateRowCol}>Update Grid</button>
            <br />
            <h5> Dead Color: {this.state.if_zero_color}</h5>
            <div className="colorChoices">
              <div
                className="divcolor white"
                onClick={() => this.handleColorChangeIfZero("white")}
              >
                w
              </div>
              <div
                className="divcolor black"
                onClick={() => this.handleColorChangeIfZero("black")}
              >
                b
              </div>
              <div
                className="divcolor blue"
                onClick={() => this.handleColorChangeIfZero("blue")}
              >
                bl
              </div>
              <div
                className="divcolor green"
                onClick={() => this.handleColorChangeIfZero("green")}
              >
                g
              </div>
              <div
                className="divcolor orange"
                onClick={() => this.handleColorChangeIfZero("orange")}
              >
                o
              </div>
              <div
                className="divcolor purple"
                onClick={() => this.handleColorChangeIfZero("purple")}
              >
                pu
              </div>
              <div
                className="divcolor pink"
                onClick={() => this.handleColorChangeIfZero("pink")}
              >
                pk
              </div>
              <div
                className="divcolor yellow"
                onClick={() => this.handleColorChangeIfZero("yellow")}
              >
                y
              </div>
            </div>
            <h5> Alive Color: {this.state.if_one_color}</h5>
            <div className="colorChoices">
              <div
                className="divcolor white"
                onClick={() => this.handleColorChangeIfOne("white")}
              >
                w
              </div>
              <div
                className="divcolor black"
                onClick={() => this.handleColorChangeIfOne("black")}
              >
                b
              </div>
              <div
                className="divcolor blue"
                onClick={() => this.handleColorChangeIfOne("blue")}
              >
                bl
              </div>
              <div
                className="divcolor green"
                onClick={() => this.handleColorChangeIfOne("green")}
              >
                g
              </div>
              <div
                className="divcolor orange"
                onClick={() => this.handleColorChangeIfOne("orange")}
              >
                o
              </div>
              <div
                className="divcolor purple"
                onClick={() => this.handleColorChangeIfOne("purple")}
              >
                p
              </div>
              <div
                className="divcolor pink"
                onClick={() => this.handleColorChangeIfOne("pink")}
              >
                pk
              </div>
              <div
                className="divcolor yellow"
                onClick={() => this.handleColorChangeIfOne("yellow")}
              >
                y
              </div>
            </div>

            
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
