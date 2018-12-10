import React from 'react';
import {matrix2} from './matrix2';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array1: matrix2
        }
    }

    componentDidMount = () => {
        this.drawBoard();
    }

    componentDidUpdate = () => {
        this.toggleSquares();
    }

    drawBoard = () => {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        for (let x = 0.5; x < 1911; x +=10) {
            context.moveTo(x, 0);
            context.lineTo(x, 1910);
        }

        for (let y = 0.5; y < 810; y += 10) {
            context.moveTo(0, y);
            context.lineTo(1911, y);
        }

        context.strokeStyle = "#000";
        context.stroke();

        canvas.addEventListener('click', function(event) {
            // context.fillStyle = "yellow";
            // context.fillRect(event.pageX - (event.pageX % 10) - 9, event.pageY - (event.pageY % 10) - 79, 9, 9);
            let xCoord = Number((Math.ceil((event.pageX - rect.left) / 10))) - 1;
            let yCoord = Number((Math.ceil((event.pageY - rect.top) / 10))) - 1;
            console.log("xCoord: ", xCoord);
            console.log("pageX:", event.pageX);
            console.log("yCoord: ", yCoord);
            console.log("pageY:", event.pageY);
            matrix2[yCoord][xCoord] = matrix2[yCoord][xCoord] === 1 ? 0 : 1;
            this.setState({array1: matrix2});
        }.bind(this));

        // for (let i = 0; i < this.state.array1.length; i++) {
        //     if (this.state.array1[i]) {
        //         context.fillStyle = "yellow";
        //         context.fillRect(i * 10 + 1, 1, 9, 9);
        //     } else {
        //         context.fillStyle = "dodgerblue";
        //         context.fillRect(i * 10 + 1, 1, 9, 9);
        //     }
        // }

        for (let i = 0; i < 80; i++) {
            for (let j = 0; j < 190; j++) {
                if (this.state.array1[i][j]) {
                    context.fillStyle = "yellow";
                    context.fillRect(j * 10 + 1, i * 10 + 1, 9, 9);
                } else {
                    context.fillStyle = "dodgerblue";
                    context.fillRect(j * 10 + 1, i * 10 + 1, 9, 9);
                }
            }
        }
    }

    toggleSquares = () => {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
        // for (let i = 0; i < this.state.array1.length; i++) {
        //     if (this.state.array1[i]) {
        //         context.fillStyle = "yellow";
        //         context.fillRect(i * 10 + 1, 1, 9, 9);
        //     } else {
        //         context.fillStyle = "dodgerblue";
        //         context.fillRect(i * 10 + 1, 1, 9, 9);
        //     }
        // }
        for (let i = 0; i < 80; i++) {
            for (let j = 0; j < 190; j++) {
                if (this.state.array1[i][j]) {
                    context.fillStyle = "yellow";
                    context.fillRect(j * 10 + 1, i * 10 + 1, 9, 9);
                } else {
                    context.fillStyle = "dodgerblue";
                    context.fillRect(j * 10 + 1, i * 10 + 1, 9, 9);
                }
            }
        }
    }
 
    render() {
        return (
            <div>
                <canvas ref="canvas" id="gameCanvas" width="1911" height="801" />
            </div>
        );
    }
}

export default Game;