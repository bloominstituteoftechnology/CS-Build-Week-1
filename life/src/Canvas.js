import React, { Component } from 'react';
import Life from './Life';
import './App.css';

class Canvas extends Component {

    constructor(props) {
        super(props);

        this.life = new Life(props.width, props.height);
        this.life.getRandomCells();
        this.gameOn = true;
    }


    componentDidMount() {
        requestAnimationFrame(() => {
            this.animFrame();
        });
    }

    animFrame() {

        let canvas = this.refs.canvas;
        let ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let cells = this.life.fetchCells();

        for (let height = 0; height < canvas.height; height++) {
            for (let width = 0; width < canvas.width; width++) {
                let index = (height * canvas.width + width) * 4;

                let lifeStatus = cells[height][width];
                let color = lifeStatus === 0 ? 0x00 : 0xff;

                imageData.data[index + 0] = color;
                imageData.data[index + 1] = color;
                imageData.data[index + 2] = color;
                imageData.data[index + 3] = '0xff';
            }
        }

        ctx.putImageData(imageData, 0, 0);

        if (this.gameOn) {
            requestAnimationFrame(() => {
                this.animFrame();
            });
        }
    }

    stop = () => {
        this.gameOn = false;
    };

    start = () => {
        this.gameOn = true;
        this.animFrame();
    };

    clear = () => {
        this.gameOn = false;
        this.refs.canvas
            .getContext('2d')
            .clearRect(0, 0, this.props.width, this.props.height);
        this.life.clear();
    };


    render() {
        return (
            <div className='canvas'>
                <canvas
                    ref="canvas"
                    width={this.props.width}
                    height={this.props.height}
                />
                <div className='buttons'>
                    <button onClick={this.handleRandom}>Random</button>
                    <button onClick={this.handleStop}>Pause</button>
                    <button onClick={this.handleStart}>Start</button>
                    <button onClick={this.handleClear}>Clear</button>
                </div>

            </div>
        );
    }
}

export default Canvas;