import React from 'react';
import './LifeCanvas.css';

class Cell extends React.Component{
    render(){
        const {x, y, cellSize} = this.props;
        return(
            <div 
                className="cell"
                style={{
                    left: `${cellSize * x + 1}`,
                    top: `${cellSize * y + 1}`,
                    width: `${cellSize - 1}`,
                    height: `${cellSize - 1}`,
                }}
                onClick={this.props.handleClick}
           />
        )
    }
}


class LifeCanvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height: 750,
            width: 750,
            cellSize: 15,
            data: [],
        }
        this.rows = this.state.height/this.state.cellSize;
        this.cols = this.state.width/this.state.cellSize;
        this.board = this.initializeBoard();
    }
    // initializeCanvas = () => {
    //     let canvas = this.refs.canvas.getContext('2d');
    //     canvas.fillStyle = 'white';

    //     const cells = this.state.height/this.state.cells;

    //     canvas.fillRect(0,0,this.state.height, this.state.width);

    //     for (let i = 0; i <= this.state.height; i += cells){
    //         //horizontal lines
    //         canvas.moveTo(0,i);
    //         canvas.lineTo(this.state.width, i);
    //         for (let j = 0; j <= this.state.width; j += cells){
    //             //vertical lines
    //             canvas.moveTo(j,0);
    //             canvas.lineTo(j, this.state.height);
    //         }
    //     }
    //     canvas.stroke();
    // }
    // getCursorPos = e => {
    //     let canvas = this.ref.canvas;
    //     let rect = canvas.getBoundingClientRect();
    //     let x = e.clientX - rect.left;
    //     let y = e.clientY - rect.top;
    //     console.log(x,y);
    // }
    initializeBoard = () => {
        let board = [];
        for(let y = 0; y < this.rows; y++){
            board[y] = [];
            for (let x = 0; x < this.cols; x++){
                board[y][x] = false;
            }
        }
        return board;
    }
    makeCells = () => {
        let cells = [];
        for(let y = 0; y < this.rows; y++){
            for (let x = 0; x < this.cols; x++){
                if (this.board[y][x]){
                    cells.push({x, y});
                }
            }
        }
        return cells;
    }
    getOffset = () => {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        }
    }
    handleClick = e => {
        const offset = this.getOffset();
        const offsetX = e.clientX - offset.x;
        const offsetY = e.clientY - offset.y;

        const x = Math.floor(offsetX/this.state.cellSize);
        const y = Math.floor(offsetY/this.state.cellSize);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows){
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ data: this.makeCells()});
    }
    render(){
        const { data } = this.state;
        return(
            <div    
                className="board"
                style={{
                    width: this.state.width,
                    height: this.state.height,
                    backgroundSize:`${this.state.cellSize}px ${this.state.cellSize}px`}}
                    onClick={this.handleClick}
                    ref={(n) => {this.boardRef = n; }}>   
                    {data.map(cell => (
                        <Cell cellSize={this.state.cellSize} x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`}/>
                    ))}
            </div>
        )
    }
}

export default LifeCanvas;