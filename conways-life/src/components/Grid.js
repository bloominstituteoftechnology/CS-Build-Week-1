import React, {Component} from 'react';

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'white',

        };
    }

    handleClick = (e) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        if(this.state.currentState === 'white'){
            this.setState(state => ({
                currentState: 'black'
            }))
        }
        else if(this.state.currentState === 'black'){
            this.setState(state => ({
                currentState: 'white'
            }))
        }
        ctx.fillStyle = this.state.currentState;
        ctx.fillRect(Math.floor(e.offsetX / 20) * 20, Math.floor(e.offsetY / 20) *20, 20, 20);
    }

    clearGrid = (e) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let x = 0; x <= 400; x+=20){
            for(let y = 0; y<= 400; y+=20){
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 400);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(400, y);
                ctx.stroke();
            }
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 400;
        ctx.canvas.height = 400;
        canvas.addEventListener('click', this.handleClick);
        canvas.addEventListener('clear', this.clearGrid);

        for(let x = 0; x <= 400; x+=20){
            for(let y = 0; y<= 400; y+=20){
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 400);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(400, y);
                ctx.stroke();
            }
        }
    }

    render() {
        return(
            <div>
                <canvas class="canvas" ref="canvas" />
                <button onClick={this.play}>Play</button>
                <button onClick={this.pause}>Pause</button>
                <button onClick={this.clearGrid}>Clear</button>
            </div>
        );
    }
}