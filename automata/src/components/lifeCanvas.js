import React, { Component } from 'react';

class Canvas extends Component {
    state = {
        simRun: false,
    }

    gridState = () => {
        for (let i=0; i<300; i+=20){
            for (let j=0; j<300; j+=20){
            this.setState({[`${i/20},${j/20}`]: "deadite"})
            }
        }
    }

    handleClick = (e) => {
        if (this.state.simRun === false) {
            const canvo = this.refs.canvas
            const ctx = canvo.getContext("2d");
            const pos = canvo.getBoundingClientRect()
            const squareSize = 20
            ctx.fillStyle = "lightgrey";
            ctx.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
            e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
            squareSize,
            squareSize);
            // console.log(`${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`);
            let tempCoord = `${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`;
            console.log(this.state[`${tempCoord}`]);
            this.setState({[`${tempCoord}`]: "living"});
        } else {console.log('Grid is not interactive while simulation is running');}
        
    }

    handleDoubleClick = (e) => {
        if (this.state.simRun === false) {
            const canvo = this.refs.canvas
            const ctx = canvo.getContext("2d");
            const pos = canvo.getBoundingClientRect()
            const squareSize = 20
            ctx.fillStyle = "white";
            ctx.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
            e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
            squareSize,
            squareSize);
        } else {console.log('Grid is not interactive while simulation is running');}
        
    }

    simulationToggle = (e) => {
        this.setState({simRun: !this.state.simRun});
    }

    clearCanvas = (e) => {
        this.setState({simRun: false});
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,canvas.width, canvas.height);
        this.initCanvas();
        this.gridState();
    }

    initCanvas = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 300;
        ctx.canvas.height = 300;
        // ctx.lineWidth = .1;
        // ctx.beginPath();
        // ctx.strokeStyle = 'blue';
        // ctx.globalAlpha = 0.9;
        // ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.strokeStyle = 'rgba(111, 111, 111, 0.8)';
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

    componentDidMount() {
        this.gridState();
        this.initCanvas();
    }

    render() {
        return (
            <div className="GameOfLife" >
                <canvas 
                ref="canvas" 
                onClick={this.handleClick}
                onDoubleClick={this.handleDoubleClick}
                />
                <div className='controls' >
                    <button onClick={this.simulationToggle}>Start / Stop simulation</button>
                    <button onClick={this.clearCanvas}>Clear Board</button>
                </div>
            </div>
        )
    }
}

export default Canvas;