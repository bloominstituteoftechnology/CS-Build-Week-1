import React, { Component } from 'react';
import './App.css';

class Canvas extends Component {

    constructor(props) {
        super(props);

        this.continueAnimaiton = true;
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


        for (let height = 0; height < canvas.height; height++) {
            for (let width = 0; width < canvas.width; width++) {
                let index = (height * canvas.width + width) * 4;

                imageData.data[index + 3] = 0xff;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        if (this.continueAnimaiton) {
            requestAnimationFrame(() => {
                this.animFrame();
            });
        }
    }

    stop = () => {
        this.continueAnimaiton = false;
    };

    start = () => {
        this.continueAnimaiton = true;
        this.animFrame();
    };

    clear = () => {
        this.continueAnimaiton = false;
        this.refs.canvas
            .getContext('2d')
            .clearRect(0, 0, this.props.width, this.props.height);
        this.life.clear();
    };


    render() {
        return (
            <div>
                <canvas
                    ref="canvas"
                    width={this.props.width}
                    height={this.props.height}
                />

            </div>
        );
    }
}

export default Canvas;