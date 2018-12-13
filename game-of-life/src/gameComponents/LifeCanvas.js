import React, { Component } from 'react';
import Life from './Life.js';

class Grid extends Component{
    constructor(){
      super();
      this.state={
        generation:0
      }
    }
    componentDidMount() {
        this.draw();
        this.life=new Life();
        this.life.createBlankGrid();
        this.start=null;
        this.myreq=null;
        this.isClickable=true;
    } 
    draw() {
        const ctx = this.refs.canvas.getContext('2d');
        for(let i = 0; i <= 375; i += 25){
            for(let j = 0 ; j <= 375; j+= 25){
              ctx.moveTo(i,0);
              ctx.lineTo(i,j);
              ctx.moveTo(0,j);
              ctx.lineTo(i,j);
            }
        }
        ctx.stroke();
    }
    getPosition=(e)=>{
      if (this.isClickable) {
        const canvas=this.refs.canvas;
        const grid=canvas.getBoundingClientRect();
        const x=e.clientX-grid.left;
        const y=e.clientY-grid.top;
        this.toggleState(x,y);
      }
    }
    toggleState(x,y){
        const x_index=Math.floor(x/25);
        const y_index=Math.floor(y/25);
        this.life.grid[x_index][y_index]===0? 
        this.life.grid[x_index][y_index]=1: 
        this.life.grid[x_index][y_index]=0;
        this.fillsquares();
    }
    fillsquares=()=>{
        const ctx = this.refs.canvas.getContext('2d');
        for (let i=0; i<this.life.grid.length;i++) {
          for (let j=0; j<this.life.grid[0].length; j++) {
            if (this.life.grid[i][j]) {
              ctx.fillRect(i*25, j*25, 25, 25);
            } else {
              ctx.clearRect(i*25,j*25,25,25);
            }
          }
        }
        this.draw();
    }
    oneStep=()=>{
      this.life.runIteration(this.life.grid);
      this.setState({generation: this.state.generation+1},()=>{this.isClickable=false; this.fillsquares()});
    }
    animate=(timestamp)=>{
      this.myreq=requestAnimationFrame(this.animate);
      if (!this.start) {
        this.start=timestamp;
      }
      const elapsed=timestamp-this.start;
      if (elapsed>=500) {
        this.oneStep();
        this.start=timestamp;
      }
    }
    stopAnimation=()=>{
      cancelAnimationFrame(this.myreq);
    }
    clear=()=>{
      this.setState({generation:0},()=>{this.isClickable=true; this.life.createBlankGrid(); this.fillsquares();});
    }
    render(){
        return (
          <div>
            <canvas ref="canvas" width={375} height={375} onClick={(e)=>this.getPosition(e)}/>
            <p className='generationHeader'>Current generation: {this.state.generation}</p>
            <div className='button-container'>
              <button className='btn waves-effect waves-light' onClick={()=>this.oneStep()}>Step</button>
              <button className='btn waves-effect waves-light' onClick={()=>{this.myreq=requestAnimationFrame(this.animate)}}>Start</button>
              <button className='btn waves-effect waves-light' onClick={()=>this.stopAnimation()}>Stop</button>
              <button className='btn waves-effect waves-light' onClick={()=>this.clear()}>Clear</button>
            </div>
          </div>
        );
    }
}
export default Grid;