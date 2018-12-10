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
  increaseCount () {
    this.setState({count : this.state.count + 1}); 
  }

  setMatrixUp () {
    const matrixUsing = []; 
    const temp_hash = {row: 0, position_in_row: 0, actual_number : 0, value: 0};

    Object.entries(this.state.matrix).forEach(entry => {
      for (let x of entry[1]){
        console.log(`|${x}|`);
        temp_hash.row = entry[0]; 
        temp_hash.position_in_row = this.state.count % 15;

        temp_hash.actual_number = this.state.count; 
        temp_hash.value = x; 
        matrixUsing.push(temp_hash); 
        
      }
    });
    this.setState({matrixUsing}); 
  }

  render() {
    const matrix = this.state.matrixUsing.slice(); 

    return (<div className="container"> 
      
      {matrix.map(hash => <div key = {hash.actual_number} className = {hash.value === 0 ? "offDiv" : "onDiv"} > </div> )}
      
    
    </div>);
  }
}

export default App;
