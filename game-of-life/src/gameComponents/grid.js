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
        this.draw();
        this.createGrid();
    } 
    draw() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.canvas.width = 375;
        ctx.canvas.height = 375;
        ctx.strokeStyle='#3b444b';
        for (let i = 0; i <=375; i += 25) {
            for (let j = 0; j <= 375; j += 25) {
                ctx.moveTo(i,0);
                ctx.lineTo(i,j);
                ctx.moveTo(0,j);
                ctx.lineTo(i,j);
                ctx.stroke();
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
        this.setState({grid:grid},()=>console.log(this.state.grid));
    }
    toggleState(x,y){
        const grid=this.state.grid.slice();
        const x_index=Math.floor(x/25);
        const y_index=Math.floor(y/25);
        const grid_item=Object.assign({},this.state.grid[y_index][x_index]);
        grid_item.currentState===0 ? grid_item.currentState=1 : grid_item.currentState=0;
        grid[y_index][x_index]=grid_item;
        this.setState({grid:grid},()=>console.log(this.state.grid));
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
        this.setState({grid:grid},()=>console.log(this.state.grid));
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