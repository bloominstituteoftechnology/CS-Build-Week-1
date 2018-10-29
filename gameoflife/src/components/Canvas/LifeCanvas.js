import React from 'react';
import Life from './Life';

class LifeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            continueAnimation: true,
            life: new Life(window.innerWidth, window.innerHeight)
        }
    }

    componentDidMount() {
        requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });
    }

    componentWillUnmount() {
        this.setState({ continueAnimation: false });
    }

    onAnimFrame(timestamp) {
        if (this.state.continueAnimation) {
            requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });
        }

        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        const cellSize = 10;

        for (let x = 0; x < canvas.width / cellSize; x++) {
            for (let y = 0; y < canvas.height / cellSize; y++) {
                context.lineWidth = 1;
                context.fillStyle = "#7E7E7E";
                context.fillRect(cellSize * x, cellSize * y, cellSize, cellSize);
                context.strokeStyle = "#999999";
                context.strokeRect(cellSize * x, cellSize * y, cellSize, cellSize);
            }
        }
    }

    render() {
        return <canvas ref="canvas" width={this.state.life.width} height={this.state.life.height} />
    }
}

export default LifeCanvas;