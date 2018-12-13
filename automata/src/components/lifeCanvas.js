import React, { Component } from 'react';

class Canvas extends Component {
    state = {
        simRun: false,
        cycleCount: 0,
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
            let tempX = (e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20;
            let tempY = (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20;
            let selectedCell = `${tempX},${tempY}`;
            // console.log(this.state[`${tempCoord}`]);
            this.setState({[`${selectedCell}`]: "living"});
            console.log(`topLeftN = ${tempX-1},${tempY-1}`);
            console.log(`botRightN = ${tempX+1},${tempY+1}`);
        } else {console.log('Grid is not interactive while simulation is running');}
        
    }

    handleDoubleClick = (e) => {
        if (this.state.simRun === false) {
            const canvo = this.refs.canvas
            const ctx = canvo.getContext("2d");
            const pos = canvo.getBoundingClientRect()
            const squareSize = 20
            let xStart = e.clientX - pos.x - ((e.clientX - pos.x) % squareSize);
            let yStart = e.clientY - pos.y - ((e.clientY - pos.y) % squareSize);
            ctx.clearRect(xStart, yStart, squareSize, squareSize);
            ctx.strokeRect(xStart, yStart, squareSize, squareSize);
            ctx.strokeStyle = 'rgba(111, 111, 111, 0.8)';
            let tempCoord = `${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`;
            this.setState({[`${tempCoord}`]: "deadite"});
        } else {console.log('Grid is not interactive while simulation is running');}
        
    }

    simulationToggle = (e) => {
        this.setState({simRun: !this.state.simRun});
    }

    clearCanvas = (e) => {
        this.setState({simRun: false, cycleCount: 0});
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
        ctx.strokeStyle = 'rgba(111, 111, 111, 0.8)';
        for (let x=0; x<=300; x+= 20) {
            for (let y=0; y<=300; y+= 20) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 300);
                // ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(300, y);
                ctx.stroke();
            }
        }
    }

    updateCanvas = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        const squareSize = 20
        for (let item in this.state) {
            let xVal = parseInt(item.substring(0, item.indexOf(',')));
            let yVal = parseInt(item.substring(item.indexOf(',')+1));
            // console.log(`${item},${xVal+1},${yVal}`);
            ctx.strokeRect(xVal*20, yVal*20, squareSize, squareSize);
            if (this.state[item] === "deadite") {
                ctx.clearRect(xVal*20, yVal*20, squareSize, squareSize);
            } else if (this.state[item] === "living") {
                ctx.fillRect(xVal*20, yVal*20, squareSize, squareSize);
            }
            
        }
    }

    gameCycle = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        if (this.state.simRun) {
            let stateBuffer = {...this.state};
            for (let x=0; x<=300; x+= 20) {
                for (let y=0; y<=300; y+= 20) {
                    let LNC = 0;
                    let topLeftN = `${x/20-1},${y/20-1}`;
                    let topN = `${x/20},${y/20-1}`;
                    let topRightN = `${x/20+1},${y/20-1}`;
                    let leftN = `${x/20-1},${y/20}`;
                    let rightN = `${x/20+1},${y/20}`;
                    let botLeftN = `${x/20-1},${y/20+1}`;
                    let botN = `${x/20},${y/20+1}`;
                    let botRightN = `${x/20+1},${y/20+1}`;
                    if (this.state[topLeftN] === "living") {
                        ++LNC;
                    }
                    if (this.state[topN] === "living") {
                        ++LNC;
                    }
                    if (this.state[topRightN] === "living") {
                        ++LNC;
                    }
                    if (this.state[leftN] === "living") {
                        ++LNC;
                    }
                    if (this.state[rightN] === "living") {
                        ++LNC;
                    }
                    if (this.state[botLeftN] === "living") {
                        ++LNC;
                    }
                    if (this.state[botN] === "living") {
                        ++LNC;
                    }
                    if (this.state[botRightN] === "living") {
                        ++LNC;
                    }
                    if (this.state[`${x/20},${y/20}`] === "living" && (LNC != 2||3)) {
                        console.log(`Welcome to the deadites ${x/20},${y/20}`);
                        stateBuffer[`${x/20},${y/20}`] = "deadite";
                    } else if (this.state[`${x/20},${y/20}`] === "deadite" && LNC === 3) {
                        console.log(`Welcome to the living ${x/20},${y/20}`);
                        stateBuffer[`${x/20},${y/20}`] = "living";
                    }
                }
            } 
            let cycleCountTemp = this.state.cycleCount;
            cycleCountTemp++;
            this.setState({...stateBuffer, cycleCount: cycleCountTemp});
            this.updateCanvas();
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
                <p>Generation: {this.state.cycleCount}</p>
                <div className='controls' >
                    <button onClick={this.simulationToggle}>Start / Stop simulation</button>
                    <button onClick={this.clearCanvas}>Clear Board</button>
                    <button onClick={this.gameCycle}>Step</button>
                </div>
            </div>
        )
    }
}

export default Canvas;