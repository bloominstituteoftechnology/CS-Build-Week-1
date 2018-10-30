import './Grid.css';
import Cell from './Cell';
import React, { Component } from 'react';



class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: [40, 20],
            
          }
          
  }


 

  
  makeGrid() {
    var newGame = [];
    var cellRow = [];

    for(var i = 0; i < this.state.size[0]; i++) {
      for (var j = 0; j < this.state.size[1]; j++){
          cellRow.push(<Cell key={[i, j]} />);
        }
        newGame.push(<div className="row" key={i}>{cellRow}</div>);
        cellRow = [];
      }

    return newGame;
  }
    
    
    
  render() {
    return (
      <div className="mainContainer">
        <div className="header">
          <div className="buttoncontainer">
            <label className="label">
              Rows:
              <input className="input" type="text" value={this.state.size[1]}  />
            </label>
            <label className="label">
              Columns:
              <input className="input" type="text" value={this.state.size[0]}  />
            </label>
          </div>
          <div className="headerButtons">
            <button className="submit" >Start</button>
            <button className="submit" >Stop</button>
          </div>
          Generation: 
        </div>
        <div className="gridContainer">
        {this.makeGrid()}
        </div>
      </div>
    );
  }
}
 
export default Grid;