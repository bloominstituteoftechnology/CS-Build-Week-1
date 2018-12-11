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
        console.log(x,y);
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
    toggleState(){
        
    }
    render(){
        return (
            <canvas ref="canvas" onClick={(e)=>this.getPosition(e)}>
                
            </canvas>
        );
    }
}
export default Grid;