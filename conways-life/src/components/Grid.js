import React, {Component} from 'react';

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = 400;
        ctx.canvas.height = 400;

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
            <canvas class="canvas" ref="canvas" />
        );
    }
}