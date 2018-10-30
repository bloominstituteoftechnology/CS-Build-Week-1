import React from 'react';
import Life from './Life';
import LifeCanvasOptions from './LifeCanvasOptions';
import LifeCanvasHeader from './LifeCanvasHeader';

class LifeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            life: null,
            continueAnimation: false,
            prevTimestamp: null,
            clicked: false
        }
    }

    componentDidMount() {
        const canvas = document.getElementById('canvas');
        const options = document.getElementsByClassName('canvas-options');
        const header = document.getElementsByClassName('canvas-header');

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - options[0].clientHeight - header[0].clientHeight;

        this.setState({ life: new Life(canvas.width, canvas.height) });

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
            this.drawCanvas();
        }
    }

    drawCanvas() {
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

    start = () => {
        if (this.state.continueAnimation) {
            this.setState({ continueAnimation: false });
        } else {
            this.setState({ continueAnimation: true });
            requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });
        }
    }

    clear = () => {
        this.state.life.clearCells();
        this.setState({ clicked: true });
    }

    render() {
        return (
            <div className='canvas-container'>
                <LifeCanvasHeader />
                <canvas onClick={this.toggleLife} id='canvas' ref="canvas" />
                <LifeCanvasOptions continue={this.state.continueAnimation} start={this.start} clear={this.clear} />
            </div>
        );
    }
}

export default LifeCanvas;