import React, { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    matrix: {
      0: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      1: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      5: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      6: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      7: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      8: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      11: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      12: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      13: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      14: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    count : 0, 
    matrixUsing : [], 
  };

  componentWillMount () {
    this.setMatrixUp(); 
  }
  increaseCount () {
    this.setState({count : this.state.count + 1}); 
  }

  setMatrixUp () {
    const matrixUsing = []; 
    const temp_hash = {row: 0, position_in_row: 0, actual_number : 0, value: 0};

    Object.entries(this.state.matrix).forEach(entry => {
      for (let x of entry[1]){
        temp_hash.row = entry[0]; 
        temp_hash.position_in_row = this.state.count % 14;

        temp_hash.actual_number = this.state.count; 
        temp_hash.value = x; 
        matrixUsing.push(temp_hash); 
        
      }
    });
    this.setState({matrixUsing}); 
    this.setState({count : 0 }); //reset count 
  }

  turnOnOrOff = (row, position_in_row, value) => {
      //Just add 1 to the % of 2  it will provide 0 or 1. The conditional is already set up on the div to set the div to the correct class based off the value
      console.log("Getting into the function.");
      console.log(row, position_in_row, value); 
      console.log("above is the paramaters for the function"); 
      const matrix = this.state.matrix; 
      console.log(matrix[row][position_in_row]); 
      matrix[row][position_in_row] = matrix[row][position_in_row] === 0 ? 1 : 0; 
      this.setState({matrix}); 
      
      
  }

  render() {
    const matrix = this.state.matrixUsing.slice(); 
    console.log(this.state.matrix); 

    return (<div className="container"> 
      
      {matrix.map(hash => <div key = {hash.actual_number} onClick = {() => this.turnOnOrOff(hash.row, hash.position_in_row, hash.value)} className = {this.state.matrix[hash.row][hash.position_in_row] === 0 ? "offDiv" : "onDiv"} >ADD</div> )}
      
    
    </div>);
  }
}

export default App;
