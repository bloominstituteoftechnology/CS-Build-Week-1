import React, { Component } from 'react';

class Rules extends Component {
  render(){
    return (
      <div className="rules">
        <h3 className="boldtext">Rules</h3>
        <p>
          • If the cell is alive and has 2 or 3 neighbors, then it remains alive. Else it dies.<br/>
          • If the cell is dead and has exactly 3 neighbors, then it comes to life. Else if remains dead.  
        </p>
      </div>
    );
  }
}


export default Rules;