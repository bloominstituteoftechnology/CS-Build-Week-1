import React, { Component } from 'react';

class Canvas extends Component {
    state = {

    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 300;
        ctx.canvas.height = 300;
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
                />
            </div>
        )
    }
}

export default Canvas;