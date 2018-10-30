import React from 'react';
import Life from './Life';

class LifeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            continueAnimation: false,
            life: new Life(window.innerWidth, 500),
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
        requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });

        timestamp = Math.floor(timestamp / 1000);

        if (timestamp !== this.state.prevTimestamp || this.state.clicked) {
            if (this.state.continueAnimation) {
                this.state.life.step();
            }

            this.setState({ prevTimestamp: timestamp, clicked: false });

            const canvas = this.refs.canvas;
            const context = canvas.getContext('2d');
            const cells = this.state.life.getCells();
            const cellSize = this.state.life.getCellSize();

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
        if (!this.state.continueAnimation) {
            const rect = this.refs.canvas.getBoundingClientRect();
            const size = this.state.life.getCellSize();
            let x = Math.floor((event.clientX - rect.left) / size);
            let y = Math.floor((event.clientY - rect.top) / size);

            this.state.life.toggleCell(x, y);
            this.setState({ clicked: true });
        }
    }

    play = () => {
        this.setState({ continueAnimation: true });
        requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });
    }

    pause = () => {
        this.setState({ continueAnimation: false });
    }

    clearCells = () => {
        this.state.life.clearCells();
        this.setState({ clicked: true });
    }

    render() {
        return (
            <div>
                <button onClick={this.play}>Play</button>
                <button onClick={this.pause}>Pause</button>

                <button onClick={this.clearCells}>Clear</button>
                <canvas onClick={this.toggleLife} ref="canvas" width={this.state.life.width} height={this.state.life.height} />
            </div>
        );
    }
}

export default LifeCanvas;