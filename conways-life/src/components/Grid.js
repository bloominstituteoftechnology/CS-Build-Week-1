import React, {Component} from 'react';

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentState: 'white',
            generation: 0,
        };
    }

    cellsState = () => {
        for(let x = 0; x <= 400; x+=20){
            for(let y = 0; y<= 400; y+=20){
                this.setState({
                    [`${x/20}, ${y/20}`]: 'white'
                })
            }
        }
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
        this.cellsState();
        this.setState({generation: 0});
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 400;
        ctx.canvas.height = 400;
        canvas.addEventListener('click', this.handleClick);

        for(let x = 0; x <= 400; x+=20){
            for(let y = 0; y<= 400; y+=20){
                ctx.moveTo(x, 0);
                ctx.lineTo(x, 400);
                ctx.stroke();
                ctx.moveTo(0, y);
                ctx.lineTo(400, y);
                ctx.stroke();

                this.setState(state => {

                })
            }
        }
        this.cellsState();
    }

    handleClick = (e) => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        // let position = canvas.getBoundingClientRect();
        let xcoord = Math.floor(e.offsetX / 20);
        let ycoord = Math.floor(e.offsetY / 20);
        let cell = `${xcoord}, ${ycoord}`;
        // this.setState({[`${cell}`]: 'black'});
        if(this.state[`${cell}`] === 'white') {
            this.setState({[`${cell}`]: 'black'});
        }
        else if(this.state[`${cell}`] === 'black') {
            this.setState({[`${cell}`]: 'white'});
        }
        ctx.fillStyle = this.state[`${cell}`];
        ctx.fillRect(Math.floor(e.offsetX / 20) * 20, Math.floor(e.offsetY / 20) *20, 20, 20);
        console.log(this.state[`${cell}`]);
        console.log(this.state);
    }

    play = (e) => {
        e.preventDefault();
        this.setState({generation: this.state.generation + 1});
    }

    render() {
        return(
            <div>
                <h1>Generation: {this.state.generation}</h1>
                <canvas className="canvas" ref="canvas" />
                <button onClick={this.play}>Play</button>
                <button onClick={this.pause}>Pause</button>
                <button onClick={this.clearGrid}>Clear</button>
            </div>
        );
    }
}