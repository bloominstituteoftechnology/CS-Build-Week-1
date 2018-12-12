import React, { Component } from 'react';
import Life from './Life.js';

class Grid extends Component{
    constructor(){
        super();
        this.continueAnimation=true;
        this.state={
          generation:0,
          board:[]
        }
    }
    componentDidMount() {
        this.draw();
        this.life=new Life();
        this.setState({board:this.life.createGrid()});
    } 
    componentWillUnmount() {
      this.continueAnimation = false;
    }
    draw() {
        const ctx = this.refs.canvas.getContext('2d');
        for(let i = 0; i <= 375; i += 25){
            for(let j = 0 ; j <= 375; j+= 25){
              ctx.moveTo(i, 0);
              ctx.lineTo(i, j)
              ctx.moveTo(0, j);
              ctx.lineTo(i, j)
            }
        }
        ctx.stroke();
    }
    getPosition=(e)=>{
        const canvas=this.refs.canvas;
        const grid=canvas.getBoundingClientRect();
        const x=e.clientX-grid.left;
        const y=e.clientY-grid.top;
        this.toggleState(x,y);
        this.fillsquares();
    }
    
    toggleState(x,y){
        const x_index=Math.floor(x/25);
        const y_index=Math.floor(y/25);
        if (this.life.grid[x_index][y_index].isClickable){
          this.life.grid[x_index][y_index].currentState===0 ? 
          this.life.grid[x_index][y_index].currentState=1 : 
          this.life.grid[x_index][y_index].currentState=0;
        }
        this.setState({board:this.life.grid},()=>this.fillsquares());
    }
    fillsquares=()=>{
        const ctx = this.refs.canvas.getContext('2d');
        for (let i=0; i<this.life.grid.length;i++) {
          for (let j=0; j<this.life.grid[0].length; j++) {
            if (this.life.grid[i][j].currentState) {
              ctx.fillRect(i*25, j*25, 25, 25);
            } else {
              ctx.clearRect(i*25,j*25,25,25);
            }
          }
        }
        this.draw();
    }
    play=()=>{
      console.log(this.state.board);
      const board=this.state.board.map(arr=>[...arr]);
      this.life.runIteration(board);
      //this.fillsquares();
    }
    render(){
        return (
          <div>
            <canvas ref="canvas" width={375} height={375} onClick={(e)=>this.getPosition(e)}/>
            <p>Current generation: {this.state.generation}</p>
            <button onClick={()=>this.play()}>Start</button>
          </div>
        );
    }
}
export default Grid;