import React from 'react';
import Life from './Life';
import LifeCanvasOptions from './LifeCanvasOptions';
import LifeCanvasHeader from './LifeCanvasHeader';

class LifeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentGeneration: 0,
            speed: 0,
            life: null,
            continueAnimation: false,
            prevTimestamp: null
        }
    }

    componentDidMount() {
        const canvas = document.getElementById('canvas');
        const options = document.getElementsByClassName('canvas-options');
        const header = document.getElementsByClassName('canvas-header');

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight - options[0].clientHeight - (header[0].clientHeight + 3);

        this.setState({ life: new Life(canvas.width, canvas.height) });

        requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });
    }

    componentWillUnmount() {
        this.setState({ continueAnimation: false });
    }

    onAnimFrame(timestamp) {
        requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });

        timestamp = Math.floor(timestamp / (1001 - this.state.speed));

        if (timestamp !== this.state.prevTimestamp) {
            if (this.state.continueAnimation) {
                this.setState({ currentGeneration: this.state.currentGeneration + 1 });
                this.state.life.step();
            }

            this.setState({ prevTimestamp: timestamp });
            this.drawCanvas();
        }
    }

    drawCanvas() {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        const cells = this.state.life.getCells();
        const cellSize = this.state.life.getCellSize();

        context.lineWidth = 1;
        context.fillStyle = "#7e7e7e";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "#999999";

        for (let i = 0; i < canvas.width; i += cellSize) {
            context.beginPath();
            context.moveTo(i + 0.5, 0);
            context.lineTo(i + 0.5, canvas.height);
            context.stroke();
        }

        for (let i = 0; i < canvas.height; i += cellSize) {
            context.beginPath();
            context.moveTo(0, i + 0.5);
            context.lineTo(canvas.width, i + 0.5);
            context.stroke();
        }

        context.fillStyle = "yellow";

        cells.forEach(cell => {
            if (cell.alive) {
                context.fillRect(cell.coords[0] * cellSize + 1, cell.coords[1] * cellSize + 1, cellSize - 1, cellSize - 1);
            }
        });
    }

    toggleLife = event => {
        if (!this.state.continueAnimation) {
            const rect = this.refs.canvas.getBoundingClientRect();
            const size = this.state.life.getCellSize();

            let x = Math.floor((event.clientX - rect.left) / size);
            let y = Math.floor((event.clientY - rect.top) / size);

            this.setState({ currentGeneration: 0 });
            this.state.life.toggleCell(x, y);
            this.drawCanvas();
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

    randomize = () => {
        this.setState({ currentGeneration: 0 });
        this.state.life.randomize();
        this.drawCanvas();
    }

    clear = () => {
        this.setState({ continueAnimation: false, currentGeneration: 0 });
        this.state.life.clearCells();
        this.drawCanvas();
    }

    next = () => {
        this.setState({ currentGeneration: this.state.currentGeneration + 1 });
        this.state.life.step();
        this.drawCanvas();
    }

    calculate = gen => {
        if (gen < this.state.currentGeneration) {
            alert('Cannot go backwards!');
        } else {
            const generation = gen - this.state.currentGeneration;
            this.state.life.calculateGeneration(generation);
            this.drawCanvas();
            this.setState({ currentGeneration: gen });
        }
    }

    setSpeed = speed => {
        this.setState({ speed });
    }

    render() {
        return (
            <div className='canvas-container'>
                <LifeCanvasHeader />
                <canvas onClick={this.toggleLife} id='canvas' ref="canvas" />
                <LifeCanvasOptions
                    continue={this.state.continueAnimation}
                    generation={this.state.currentGeneration}
                    setSpeed={this.setSpeed}
                    calculate={this.calculate}
                    randomize={this.randomize}
                    start={this.start}
                    next={this.next}
                    clear={this.clear}
                />
            </div>
        );
    }
}

export default LifeCanvas;