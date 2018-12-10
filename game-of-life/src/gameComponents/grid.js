import React, { Component } from 'react';

class Grid extends React.Component{
    constructor(){
        super();
        this.state={
            grid:[]
        }
    }
    componentDidMount() {
        this.init();
    }
    init=()=>{
        const grid=[];
        for(let i=0; i<15; i++) {
            grid.push([]);
            for (let j=0; j<15; j++) {
                grid[i].push(0);
            }
        }
        this.setState({grid:grid});
    } 
    render(){
        
    }
}
export default Grid;