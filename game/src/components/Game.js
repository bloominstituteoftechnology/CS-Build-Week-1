import React from 'react';
import {matrix2} from './matrix2';
import {matrix3} from './matrix3';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array1: matrix2,
            continueAnimating: false,
            cycle: 'A',
            buttonTag: 'Start'
        }
    }

    componentDidMount = () => {
        this.drawBoard();
        requestAnimationFrame((timestamp) => {this.onAnimFrame(timestamp)});
    }

    componentDidUpdate = () => {
        this.toggleSquares();
    }

    componentWillUnmount = () => {
        this.setState({continueAnimating: false});
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
            let xCoord = Number((Math.ceil((event.pageX - rect.left) / 10))) - 1;
            let yCoord = Number((Math.ceil((event.pageY - rect.top) / 10))) - 1;
            console.log("xCoord: ", xCoord);
            console.log("pageX:", event.pageX);
            console.log("yCoord: ", yCoord);
            console.log("pageY:", event.pageY);
            matrix2[yCoord][xCoord] = matrix2[yCoord][xCoord] === 1 ? 0 : 1;
            this.setState({array1: matrix2});
        }.bind(this));

        // for (let i = 0; i < 80; i++) {
        //     for (let j = 0; j < 190; j++) {
        //         if (this.state.array1[i][j]) {
        //             context.fillStyle = "yellow";
        //             context.fillRect(j * 10 + 1, i * 10 + 1, 9, 9);
        //         } else {
        //             context.fillStyle = "dodgerblue";
        //             context.fillRect(j * 10 + 1, i * 10 + 1, 9, 9);
        //         }
        //     }
        // }
    }

    toggleSquares = () => {
        const canvas = this.refs.canvas;
        const context = canvas.getContext('2d');
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

    onAnimFrame = (timestamp) => {
        if (this.state.cycle === 'A') {
            if (this.state.continueAnimating) {
                requestAnimationFrame((timestamp) => {setInterval(() => {this.onAnimFrame(timestamp)}, 500)});
            }
            const canvas = this.refs.canvas;
            const context = canvas.getContext('2d');
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
            // set the next buffer
            for (let i = 0; i < 80; i++) {
                for (let j = 0; j < 190; j++) {
                    // wrap around
                    let prevRow = i - 1;
                    if (prevRow === -1) {
                        prevRow = 79;
                    }
                    let nextRow = i + 1;
                    if (nextRow === 80) {
                        nextRow = 0
                    }
                    let prevCol = j - 1;
                    if (prevCol === -1) {
                        prevCol = 189;
                    }
                    let nextCol = j + 1;
                    if (nextCol === 189) {
                        nextCol = 0;
                    }

                    // count living neighbors
                    let count = 0;
                    if (matrix2[prevRow][prevCol]) {
                        count++;
                    }
                    if (matrix2[prevRow][j]) {
                        count++;
                    }
                    if (matrix2[prevRow][nextCol]) {
                        count++;
                    }
                    if (matrix2[i][prevCol]) {
                        count++;
                    }
                    if (matrix2[i][nextCol]) {
                        count++;
                    }
                    if (matrix2[nextRow][prevCol]) {
                        count++;
                    }
                    if (matrix2[nextRow][j]) {
                        count++;
                    }
                    if (matrix2[nextRow][nextCol]) {
                        count++;
                    }

                    // toggle state based on neighbors
                    if (matrix2[i][j] && count < 2) {
                        matrix3[i][j] = 0;
                    } else if (matrix2[i][j] && (count === 2 || count === 3)) {
                        matrix3[i][j] = 1;
                    } else if (matrix2[i][j] && count > 3) {
                        matrix3[i][j] = 0;
                    } else if (!matrix2[i][j] && count === 3) {
                        matrix3[i][j] = 1;
                    }
                }
            }
            this.setState({array1: matrix3});
            this.setState({cycle: 'B'});
        } else {
            if (this.state.continueAnimating) {
                requestAnimationFrame((timestamp) => {setInterval(() => {this.onAnimFrame(timestamp)}, 500)});
            }
            const canvas = this.refs.canvas;
            const context = canvas.getContext('2d');
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
            // set the next buffer
            for (let i = 0; i < 80; i++) {
                for (let j = 0; j < 190; j++) {
                    // wrap around
                    let prevRow = i - 1;
                    if (prevRow === -1) {
                        prevRow = 79;
                    }
                    let nextRow = i + 1;
                    if (nextRow === 80) {
                        nextRow = 0
                    }
                    let prevCol = j - 1;
                    if (prevCol === -1) {
                        prevCol = 189;
                    }
                    let nextCol = j + 1;
                    if (nextCol === 189) {
                        nextCol = 0;
                    }

                    // count living neighbors
                    let count = 0;
                    if (matrix3[prevRow][prevCol]) {
                        count++;
                    }
                    if (matrix3[prevRow][j]) {
                        count++;
                    }
                    if (matrix3[prevRow][nextCol]) {
                        count++;
                    }
                    if (matrix3[i][prevCol]) {
                        count++;
                    }
                    if (matrix3[i][nextCol]) {
                        count++;
                    }
                    if (matrix3[nextRow][prevCol]) {
                        count++;
                    }
                    if (matrix3[nextRow][j]) {
                        count++;
                    }
                    if (matrix3[nextRow][nextCol]) {
                        count++;
                    }

                    // toggle state based on neighbors
                    if (matrix3[i][j] && count < 2) {
                        matrix2[i][j] = 0;
                    } else if (matrix3[i][j] && (count === 2 || count === 3)) {
                        matrix2[i][j] = 1;
                    } else if (matrix3[i][j] && count > 3) {
                        matrix2[i][j] = 0;
                    } else if (!matrix3[i][j] && count === 3) {
                        matrix2[i][j] = 1;
                    }
                }
            }
            this.setState({array1: matrix2});
            this.setState({cycle: 'A'});
        }
    }

    toggleButton = () => {
        if (this.state.continueAnimating) {
            this.setState({continueAnimating: false});
        } else {
            this.setState({continueAnimating: true});
            requestAnimationFrame((timestamp) => {this.onAnimFrame(timestamp)});
        }
        if (this.state.buttonTag === 'Start') {
            this.setState({buttonTag: 'Stop'});
        } else {
            this.setState({buttonTag: 'Start'});
        }
    }
 
    render() {
        return (
            <div>
                <canvas ref="canvas" id="gameCanvas" width="1911" height="801" />
                <button onClick={this.toggleButton}>{this.state.buttonTag}</button>
            </div>
        );
    }
}

export default Game;