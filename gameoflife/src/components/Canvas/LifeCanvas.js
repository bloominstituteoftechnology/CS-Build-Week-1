import React from 'react';
import Life from './Life';

class LifeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            continueAnimation: true,
            life: new Life(window.innerWidth, window.innerHeight),
            prevTimestamp: null,
            clicked: false
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

        timestamp = Math.floor(timestamp / 1000);

        if (timestamp !== this.state.prevTimestamp || this.state.clicked) {
            this.setState({ prevTimestamp: timestamp, clicked: false });

            const canvas = this.refs.canvas;
            const context = canvas.getContext('2d');
            const cellSize = 10;
            const cells = this.state.life.getCells();

            for (let i = 0; i < cells.length; i++) {
                context.lineWidth = 1;
                context.fillStyle = cells[i].alive ? "#FFFF00" : "#7E7E7E";
                context.fillRect(cellSize * cells[i].coords[0], cellSize * cells[i].coords[1], cellSize, cellSize);
                context.strokeStyle = "#999999";
                context.strokeRect(cellSize * cells[i].coords[0], cellSize * cells[i].coords[1], cellSize, cellSize);
            }
        }
    }

    toggleLife = event => {
        const rect = this.refs.canvas.getBoundingClientRect();
        let x = Math.floor((event.clientX - rect.left) / 10);
        let y = Math.floor((event.clientY - rect.top) / 10);

        this.state.life.toggleCell(x, y);
        this.setState({ clicked: true });
    }

    clearCells = () => {
        this.state.life.clearCells();
        this.setState({ clicked: true });
    }

    render() {
        return (
            <div>
                <button onClick={this.clearCells}>Clear</button>
                <canvas onClick={this.toggleLife} ref="canvas" width={this.state.life.width} height={this.state.life.height} />
            </div>
        );
    }
}

export default LifeCanvas;