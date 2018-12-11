import React, { Component } from 'react';

class Canvas extends Component {
    state = {

    }

    gridState = () => {
        for (let i=0; i<300; i+=20){
            for (let j=0; j<300; j+=20){
            this.setState({[`${i/20},${j/20}`]: "deadite"})
            }
        }
    }

    handleClick = (e) => {
        const canvo = this.refs.canvas
        const ctx = canvo.getContext("2d");
        const pos = canvo.getBoundingClientRect()
        const squareSize = 20
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
          e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
          squareSize,
          squareSize);
        console.log(`${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`);
    }

    handleDoubleClick = (e) => {
        const canvo = this.refs.canvas
        const ctx = canvo.getContext("2d");
        const pos = canvo.getBoundingClientRect()
        const squareSize = 20
        ctx.fillStyle = "white";
        ctx.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
          e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
          squareSize,
          squareSize);
    }

    componentDidMount() {
        this.gridState();
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 300;
        ctx.canvas.height = 300;
        // ctx.lineWidth = .1;
        // ctx.beginPath();
        // ctx.strokeStyle = 'blue';
        // ctx.globalAlpha = 0.9;
        // ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.strokeStyle = 'rgba(44, 255, 44, 0.8)';
        for (let x=0; x<=300; x+= 20) {
            for (let y=0; y<=300; y+= 20) {
                
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 300);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(300, y);
                ctx.stroke();
            }
        }
    }

    render() {
        return (
            <div>
                <canvas 
                ref="canvas" 
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                />
            </div>
        )
    }
}

export default Canvas;