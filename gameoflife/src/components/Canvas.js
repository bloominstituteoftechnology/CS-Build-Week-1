import React, { Component } from 'react';


export default class Canvas extends Component {
    constructor(props) {
        super(props);
    }

    canvasHandler = () => {
        const canvas = this.ref.canvas; // refers to the ref attribute in render()  
        const context = canvas.getContext('2d'); // etc.
        context.lineWidth = 10;
        context.strokeRect(75,140,150,110);
        context.fillRect(130, 190, 40, 60);
        context.moveTo(50, 140);
        context.lineTo(150, 60);
        context.lineTo(250, 140);
        context.closePath();
        context.stroke();
      }

    render() {
        return (
            <div className="canvas">
                {console.log("running")}
                <canvas  ref="canvas" width={"500"} height={"500"} canvasHandler={this.canvasHandler} />
            </div>
        );
    }
}

