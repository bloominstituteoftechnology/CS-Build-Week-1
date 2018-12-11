import React, { Component } from 'react';

class Grid extends Component{
    constructor(){
        super();
        this.state={
            grid:[]
        }
    }
    componentDidMount() {
        const grid=[];
        for (let i=0; i<15; i++) {
            grid.push([]);
            for (let j=0; j<15;j++) {
                grid[i].push(0);
            }
        }
        this.setState({grid:grid},()=>{this.draw()});
    } 
    draw() {
        const ctx=this.refs.canvas.getContext('2d');
        const grid=this.state.grid.slice();
        ctx.canvas.width=375;
        ctx.canvas.height=375;
        for (let i = 0; i <=375; i+=25) {
            for (let j = 0; j <=375; j+=25) {
                ctx.moveTo(i,j);
                ctx.lineTo(i,375);
                ctx.stroke();
                ctx.moveTo(0,j);
                ctx.lineTo(375,j);
                ctx.stroke();
            }
        }
    }
    render(){
        return (
            <canvas ref="canvas"/>
        );
    }
}
export default Grid;