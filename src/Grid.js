import React, { Component } from 'react';

class Grid extends Component {
  state = {
    currentNodeHolder: [],
    canClick: true
  }

  componentDidMount() {
    let nextNodeHolder = [];

    class Node {
      constructor() {
        this.isAlive = false;
      }
      makeDead() {
        this.isAlive = false;
      }
      makeAlive() {
        this.isAlive = true;
      }
    }

    for (let i = 0; i < 16; i++) {
      nextNodeHolder.push([]);
    }
    let id = 0;
    for (let i = 0; i < nextNodeHolder.length; i++) {
      for (let j = 0; j < nextNodeHolder.length; j++) {
        nextNodeHolder[i].push(new Node(id));
        id++
      }
    }
    
    this.setState({ currentNodeHolder: nextNodeHolder });
  }
  
  startGame = () => {
    this.setState({canClick: false});
  }
  
  endGame = () => {
    this.setState({canClick: true});
  }
  
  toggleCell = (col) => {
    console.log(col.isAlive)
    if (col.isAlive) {
      col.makeDead();
    } else {
      col.makeAlive();
    }
    console.log(col.isAlive)
    this.forceUpdate()
  }
  
  clearCells = () => {
    let nextNodeHolder = this.state.currentNodeHolder.slice();
    console.log(nextNodeHolder.length)

    for (let i = 0; i < nextNodeHolder.length; i++) {
      for (let j = 0; j < nextNodeHolder.length; j++) {
        if (nextNodeHolder[i][j].isAlive) {
          console.log('alive')
          nextNodeHolder[i][j].makeDead();
        }
      }
    }
    
    this.setState({ currentNodeHolder: nextNodeHolder });
  }
  
  render() {
    return (
      <div>
        {this.state.currentNodeHolder.map((row, index) => {
          return (
            <div>
              {this.state.currentNodeHolder[index].map(col => {
                return (
                  col.isAlive ? <span onClick={this.state.canClick? () => this.toggleCell(col) : null}> 1 </span> : <span onClick={this.state.canClick? () => this.toggleCell(col) : null}> 0 </span>
                  );
                })}
            </div>
          );
        })}
        <hr/>
        <button onClick={this.state.canClick? this.startGame: null}>Start</button>
        <button onClick={this.endGame}>End</button>
        <button onClick={this.state.canClick? this.clearCells: null}>Clear Grid</button>
      </div>
    );
  }
}

export default Grid;