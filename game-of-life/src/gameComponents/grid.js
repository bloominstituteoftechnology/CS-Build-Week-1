import React, { Component } from 'react';
import Cell from './cell.js';

class Grid extends Component{
    constructor(){
        super();
        this.state={
            grid:[]
        }
    }
    componentDidMount() {
        this.createGrid();
    } 
    draw() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.canvas.width = 375;
        ctx.canvas.height = 375;
        ctx.strokeStyle='#3b444b';
        const grid=this.state.grid.slice();
        for (let i = 0; i <=375; i += 25) {
            for (let j = 0; j <=375; j += 25) {
                ctx.moveTo(i,0);
                ctx.lineTo(i,j);
                ctx.moveTo(0,j);
                ctx.lineTo(i,j);
                ctx.stroke();
                if (j/25<15 && i/25<15 && grid[j/25][i/25].currentState===1) {
                    this.fillsquares(j/25,i/25);
                }
            }
        }
    }
    getPosition=(e)=>{
        const canvas=this.refs.canvas;
        const grid=canvas.getBoundingClientRect();
        const x=e.clientX-grid.left;
        const y=e.clientY-grid.top;
        this.toggleState(x,y);
    }
    createGrid(){
        const grid=[];
        for (let i=0; i<15; i++) {
            grid[i]=[];
            for (let j=0; j<15; j++) {
                grid[i].push({currentState:0,isClickable:true});
            }
        }
        this.setState({grid:grid},()=>this.draw());
    }
    toggleState(x,y){
        const grid=this.state.grid.slice();
        const x_index=Math.floor(x/25);
        const y_index=Math.floor(y/25);
        const grid_item=Object.assign({},this.state.grid[y_index][x_index]);
        grid_item.currentState===0 ? grid_item.currentState=1 : grid_item.currentState=0;
        grid[y_index][x_index]=grid_item;
        this.setState({grid:grid},()=>{this.draw()});
    }
    fillsquares=(x,y)=>{
        const ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle='#3b444b';
        ctx.fillRect(y*25, x*25, 25, 25);
    }
    changeClickState=()=>{
        const grid=this.state.grid.slice();
        for (let i=0; i<15;i++) {
            for (let j=0; j<15; j++) {
                const grid_item=Object.assign({},grid[i][j]);
                grid_item.isClickable=!grid_item.isClickable;
                grid[i][j]=grid_item;
            }
        } 
        this.setState({grid:grid});
    }
    startGame=(board)=>{
        const newBoard = board.map(arr=>arr.slice());
        const height=board.length;
        const width=board[0].length;
        for (let i=0; i<height; i++) {
          for (let j=0; j<width; j++) {
            neighbors=getNeighbors(board,i,j);
            if (neighbors===3 && !board[i][j]) {
              newBoard[i][j]=1;
            } else if ((neighbors===2 || neighbors===3) && board[i][j]) {
              newBoard[i][j]=1;
            } else {
              newBoard[i][j]=0;
            }
          }
        }
        return newBoard;
      };
      getNeighbors=(board,i,j)=>{
        const height=board.length;
        const width=board[0].length;
        let count=0;
        for (let x=-1;x<=1;x++) {
          for (let y=-1;y<=1;y++) {
            if (!x && !y) {
              continue;
            }
            const x_index=x+i;
            const y_index=y+j;
            if (x_index>=0 && x_index<width && y_index>=0 && y_index<height) {
              if (board[x_index][y_index]) {
                count++;
              }
            }
          }
        }
        return count;
      }
    render(){
        return (
            <canvas ref="canvas" onClick={(e)=>this.getPosition(e)}>
                {this.state.grid.map((e)=>e.map((e,i)=><Cell key={i}></Cell>))}
            </canvas>
        );
    }
}
export default Grid;