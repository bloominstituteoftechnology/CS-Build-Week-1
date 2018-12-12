import React, { Component } from 'react';

class Grid extends Component {
  state = {
    currentNodeHolder: [],
    canClick: true,
    isPlaying: false
  }

  componentDidMount() {
    let nextNodeHolder = [];

    class Node {
      constructor(id) {
        this.id = id;
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
    console.log('one')
    this.setState({canClick: false, isPlaying: true});
    this.playGame();
    // console.log('two')
    // if (this.state.isPlaying) {
    //   while(this.state.isPlaying) {
    //     setTimeout(() => {
    //       if (this.state.isPlaying) {
    //         this.playGame();
    //       }
    //     }, 500)
    //   }
    // }
  }
  
  playGame = () => {
    console.log('three')
    let nextNodeHolder = this.state.currentNodeHolder.slice();
    let len = nextNodeHolder.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {

        if (!nextNodeHolder[i][j].isAlive) {
          let checker = 0;
        
          if (j > 0 && nextNodeHolder[i][j-1]) {
            if (nextNodeHolder[i][j-1].isAlive) {
              checker++
            }
          }
          if (j < 15 && nextNodeHolder[i][j+1]) {
            if (nextNodeHolder[i][j+1].isAlive) {
              checker++
            }
          }
          if (i > 0 && j > 0 && nextNodeHolder[i-1][j-1]) {
            if (nextNodeHolder[i-1][j-1].isAlive) {
              checker++
            }
          }
          if (i > 0 && nextNodeHolder[i-1][j]) {
            if (nextNodeHolder[i-1][j].isAlive) {
              checker++
            }
          }
          if (i > 0 && j < 15 && nextNodeHolder[i-1][j+1]) {
            if (nextNodeHolder[i-1][j+1].isAlive) {
              checker++
            }
          }
          if (j > 0 && i < 15 && nextNodeHolder[i+1][j-1]) {
            if (nextNodeHolder[i+1][j-1].isAlive) {
              checker++
            }
          }
          if (i < 15 && nextNodeHolder[i+1][j]) {
            if (nextNodeHolder[i+1][j].isAlive) {
              checker++
            }
          }
          if (i < 15 && j < 15 && nextNodeHolder[i+1][j+1]) {
            if (nextNodeHolder[i+1][j+1].isAlive) {
              checker++
            }
          }
          console.log('DEAD', checker, nextNodeHolder[i][j].id)
          if (checker === 3) {
            nextNodeHolder[i][j].makeAlive();
          }
        }

        if (nextNodeHolder[i][j].isAlive) {
          let checker = 0;
        
          if (j > 0 && nextNodeHolder[i][j-1]) {
            if (nextNodeHolder[i][j-1].isAlive) {
              checker++
            }
          }
          if (j < 15 && nextNodeHolder[i][j+1]) {
            if (nextNodeHolder[i][j+1].isAlive) {
              checker++
            }
          }
          if (i > 0 && j > 0 && nextNodeHolder[i-1][j-1]) {
            if (nextNodeHolder[i-1][j-1].isAlive) {
              checker++
            }
          }
          if (i > 0 && nextNodeHolder[i-1][j]) {
            if (nextNodeHolder[i-1][j].isAlive) {
              checker++
            }
          }
          if (i > 0 && j < 15 && nextNodeHolder[i-1][j+1]) {
            if (nextNodeHolder[i-1][j+1].isAlive) {
              checker++
            }
          }
          if (j > 0 && i < 15 && nextNodeHolder[i+1][j-1]) {
            if (nextNodeHolder[i+1][j-1].isAlive) {
              checker++
            }
          }
          if (i < 15 && nextNodeHolder[i+1][j]) {
            if (nextNodeHolder[i+1][j].isAlive) {
              checker++
            }
          }
          if (i < 15 && j < 15 && nextNodeHolder[i+1][j+1]) {
            if (nextNodeHolder[i+1][j+1].isAlive) {
              checker++
            }
          }
          console.log('ALIVE',checker,nextNodeHolder[i][j].id)
          if (checker === 2 || checker === 3) {
            console.log('f')
          } else {
            nextNodeHolder[i][j].makeDead();
          }
        }
      }
    }
    console.log('fdfg')
    this.setState({currentNodeHolder: nextNodeHolder});
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