import React, { Component } from 'react';

class GameBoard extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          height: 300,
          width: 300,
          cells: 15,
          gameOn: false,
          count: 0,
      }
  }

  drawCanvas = () => {
      this.gridState();
      let canvas = this.refs.canvas.getContext('2d');
      canvas.fillStyle = 'white';

       const squares = this.state.height/this.state.cells;

       canvas.fillRect(0,0,this.state.height, this.state.width);

       for (let i = 0; i <= this.state.height; i += squares){
          canvas.moveTo(0,i);
          canvas.lineTo(this.state.width, i);
          for (let i = 0; i <= this.state.width; i += squares){
              canvas.moveTo(i,0);
              canvas.lineTo(i, this.state.height);
          }
      }
      canvas.stroke();
  }

 simulateGame = () => {
     const canvas = this.refs.canvas;
     const context = canvas.getContext('2d');
     let gameState = {...this.state};
     if (this.state.gameOn) {
         for (let x=0; x<=300; x+= 20) {
             for (let y=0; y<=300; y+= 20) {
                  let lnc = 0;
                  let tln = `${x/20-1},${y/20-1}`;
                  let tn = `${x/20},${y/20-1}`;
                  let trn = `${x/20+1},${y/20-1}`;
                  let ln = `${x/20-1},${y/20}`;
                  let rn = `${x/20+1},${y/20}`;
                  let bln = `${x/20-1},${y/20+1}`;
                  let bn = `${x/20},${y/20+1}`;
                  let brn = `${x/20+1},${y/20+1}`;
                if (this.state[tln] === "alive") {
                    lnc++;
                }
                if (this.state[tn] === "alive") {
                    lnc++;
                }
                if (this.state[trn] === "alive") {
                    lnc++;
                }
                if (this.state[ln] === "alive") {
                    lnc++;
                }
                if (this.state[rn] === "alive") {
                    lnc++;
                }
                if (this.state[bln] === "alive") {
                    lnc++;
                }
                if (this.state[bn] === "alive") {
                    lnc++;
                }
                if (this.state[brn] === "alive") {
                    lnc++;
                }
                if (this.state[`${x/20},${y/20}`] === "alive" && (lnc != 2||3)) {
                  gameState[`${x/20},${y/20}`] = "dead";
              } else if (this.state[`${x/20},${y/20}`] === "dead" && lnc === 3) {
                  gameState[`${x/20},${y/20}`] = "alive";
              }
          }
      } 
      let gameCount = this.state.count;
      gameCount++;
      this.setState({...gameState, count: gameCount});
             }
         } 

   componentDidMount(){
      this.drawCanvas()
  }

  handleClick = (e) => {
    if (this.state.gameOn === false){
    const can = this.refs.canvas
    const context = can.getContext("2d");
    const pos = this.refs.canvas.getBoundingClientRect()
    const squareSize = 20
    context.fillStyle = "black";
    context.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
      let cellX = `${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20}`;
      let cellY = `${(e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`;
      let cellState = `${cellX},${cellY}`;
      this.setState({[`${cellState}`]: "alive"});
    }else {console.log('Cannot complete task');}
  }

  unselectSquare = (e) => {
    const can = this.refs.canvas
    const context = can.getContext("2d");
    const pos = can.getBoundingClientRect()
    const squareSize = 20
    context.fillStyle = "white";
    context.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
}

gridState = () => {
  for (let i=0; i<300; i+=20){
      for (let j=0; j<300; j+=20){
      this.setState({[`${i/20},${j/20}`]: "dead"})
      }
  }
}

randomizeHandler = e => {
}

clearGrid = (e) => {
  const can = this.refs.canvas
  const context = can.getContext("2d");
  context.clearRect(0,0,can.width,can.height)
  this.drawCanvas()
}

playToggle = (e) => {
  this.setState({gameOn: !this.state.gameOn});
}

  render(){
      return(
        <>
          <canvas 
              onClick={this.handleClick}
              onDoubleClick={this.unselectSquare}
              ref="canvas"
              height={this.state.height}
              width={this.state.width} 
              /> 
              <div className = 'buttons'>
              <button onClick = {this.playToggle}>Play/Pause</button>
              <button onClick={this.clearGrid}>Clear</button>
              <button >Randomize</button>
              </div>
              <div>Game Rules:</div>
            </>
      );
  }
}
  export default GameBoard;