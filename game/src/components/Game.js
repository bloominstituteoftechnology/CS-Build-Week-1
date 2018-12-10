import React from 'react';
import {matrix1} from './matrix1';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        this.drawBoard();
    }

    drawBoard = () => {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');

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
            matrix1[event.pageX % 10] = matrix1[event.pageX % 10] === 1 ? 0 : 1;
        })

        for (let i = 0; i < matrix1.length; i++) {
            if (matrix1[i]) {
                context.fillStyle = "yellow";
                context.fillRect(i * 10 + 1, 1, 9, 9);
            } else {
                context.fillStyle = "dodgerblue";
                context.fillRect(i * 10 + 1, 1, 9, 9);
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