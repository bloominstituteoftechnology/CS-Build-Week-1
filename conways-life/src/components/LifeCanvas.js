import React from 'react';
import './LifeCanvas.css';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';

const Rules = styled.div`
    font-size: 1.2rem;
    font-weight: 900;
    color: blue;
    position: absolute;
    width: 350px;
    top: 75px;
    right: 75px;
`;

const Input = styled.input`
    width: 50px;
    text-align: center;
`;

const Button = styled.button`
    background: black;
    color: red;
    font-size: 1.2rem;
    font-weight: 800;
    padding: 0.5rem;
    margin: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    outline: none;
`;

class Cell extends React.Component{
    render(){
        const {x, y, cellSize} = this.props;
        return(
            <div 
                className="cell"
                style={{
                    left: `${cellSize * x + 1}px`,
                    top: `${cellSize * y + 1}px`,
                    width: `${cellSize - 1}px`,
                    height: `${cellSize - 1}px`,
                }}
           />
        )
    }
}

class LifeCanvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height: 600,
            width: 600,
            cellSize: 40,
            cells: [],
            interval: 500,
            isRunning: false,
            generation: 0,
            random: 20,
            dropdownOpen: false,
        }
        this.board = this.initializeBoard();
    }
    
    initializeBoard = () => {
        let board = [];
        for(let x = 0; x < (this.state.height/this.state.cellSize); x++){
            board[x] = [];
            for (let y = 0; y < (this.state.width/this.state.cellSize); y++){
                board[x][y] = false;
            }
        }
        return board;
    }
    makeCells = () => {
        let cells = [];
        for (let x = 0; x < this.state.height/this.state.cellSize; x++) {
            for (let y = 0; y < this.state.width/this.state.cellSize; y++) {
                if (this.board[x][y]) {
                    cells.push({ x, y });
                }
            }
        }
        return cells;
    }
    getOffset = () => {
        const boardRef = ReactDOM.findDOMNode(this.refs.gameboard)
        const rect = boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        }
    }
    handleClick = e => {
        if (!this.state.isRunning) {
            const offset = this.getOffset();
            const offsetX = e.clientX - offset.x;
            const offsetY = e.clientY - offset.y;

            const x = Math.floor(offsetX/this.state.cellSize);
            const y = Math.floor(offsetY/this.state.cellSize);

            if (x >= 0 && x <= (this.state.height/this.state.cellSize) && y >= 0 && y <= (this.state.width/this.state.cellSize)){
                this.board[x][y] = !this.board[x][y];
            }

            this.setState({ cells: this.makeCells()});
        }
    }
    checkNeighbors = (board, x, y) => {
        let neighbors = 0;
        const validNeighbors = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < validNeighbors.length; i++){
            var validNeighbor = validNeighbors[i];
            let x1 = x + validNeighbor[0];
            let y1 = y + validNeighbor[1];

            if (x1 >= 0 && x1 < this.state.height/this.state.cellSize && y1 >= 0 && y1 < this.state.width/this.state.cellSize && board[x1][y1]){
                neighbors++;
            }
        }
        return neighbors;
    }
    runGameOfLife = () => {
        if (this.state.cells.length > 0){
            this.setState({isRunning: true});
            this.runCycle();
        }
    }
    runCycle = () => {
        let newGame = this.initializeBoard();

        //plots the next board
        for (let x = 0; x < this.state.height/this.state.cellSize; x++){
            for (let y = 0; y < this.state.width/this.state.cellSize; y++){
                let neighbors = this.checkNeighbors(this.board, x, y);
                if (this.board[x][y]){
                    //covers rule # 1,2,3
                    if (neighbors === 2 || neighbors === 3){
                        newGame[x][y] = true;
                    } else {
                        newGame[x][y] = false;
                    }
                } else {
                    //covers rule # 4
                    if (!this.board[x][y] && neighbors === 3){
                        newGame[x][y] = true;
                    }
                }
            }
        }

        this.board = newGame;
        this.setState({cells: this.makeCells()});
        this.timeoutHandler = window.setTimeout(() => {this.runCycle();}, this.state.interval);
        this.setState(prevState => ({
            generation: prevState.generation + 1
        }));
    }
    stopGameOfLife = () => {
        this.setState({isRunning: false});
        if (this.timeoutHandler){
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }
    clearBoard = e => {
        e.preventDefault();
        //make new board first
        this.board = this.initializeBoard();
        //initialize cells
        this.setState({cells: this.makeCells(), generation:0});
    }
    randomize = e => {
        e.preventDefault();
        if (this.state.random > Math.pow((this.state.height/this.state.cellSize),2)){
            alert(`Cells to be generated is greater than the board size. Please enter a number less than ${Math.pow((this.state.height/this.state.cellSize),2)}`);
            return;
        }
        this.board = this.initializeBoard();
        let count = 0;
        for (let i = 0; i < this.state.random; i++){
            while (count < this.state.random) {
                let x = (Math.floor(Math.random()*(this.state.height/this.state.cellSize))+1);
                let y = (Math.floor(Math.random()*(this.state.height/this.state.cellSize))+1);
                if (x >= 0 && x < this.state.height/this.state.cellSize && y >= 0 && y < this.state.width/this.state.cellSize && !this.board[x][y] && count < this.state.random){
                    this.board[x][y] = true;
                    count++
                }
            }
        }
        
        this.setState({cells: this.makeCells()});
    }
    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    toggle = () => {
        this.setState( prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }))
    }
    handleBoardSize = e => {
        e.preventDefault();
        if (e.target.name === 'small'){
            this.setState({
                height: 600,
                width: 600,
            }, () => {
                this.board = this.initializeBoard();
            })
        } else if (e.target.name === 'medium'){
            this.setState({
                height: 880,
                width: 880,
            }, () => {
                this.board = this.initializeBoard();
            })
        } else if (e.target.name === 'large'){
            this.setState({
                height: 1200,
                width: 1200,
            }, () => {
                this.board = this.initializeBoard();
            })
        }
    }

    render(){
        return(
            <div>
                <h1>GAME OF LIFE</h1>
                <div>
                    <div    
                        className="board"
                        style={{
                            width: this.state.width,
                            height: this.state.height,
                            backgroundSize:`${this.state.cellSize}px ${this.state.cellSize}px`}}
                        onClick={this.handleClick}
                        ref="gameboard">   
                        {this.state.cells.map(cell => (
                            <Cell cellSize={this.state.cellSize} x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                        ))}
                    </div>
                    <Rules>
                        <h2>Game of Life Rules</h2>
                        <p>1. Any live cell with fewer than two live neighbors dies, as if caused by under population.</p>
                        <p>2. Any live cell with two or three live neighbors lives on to the next generation.</p>
                        <p>3. Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
                        <p>4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</p>
                    </Rules>
                </div>
     
                <div className="controls">
                    <p>
                        Each cycle takes <Input onChange={this.handleChange} name='interval' value={this.state.interval} /> ms
                    </p>
                    <div>
                        <Button onClick={this.runGameOfLife}>Start</Button>
                        <Button onClick={this.stopGameOfLife}>Stop</Button>
                        <Button onClick={this.clearBoard}>Clear</Button> 
                    </div>
                    <div>
                        <span># of Random Cells <Input onChange={this.handleChange} name='random' value={this.state.random} /></span>
                        <Button onClick={this.randomize}>Generate</Button>
                    </div>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                        <DropdownToggle caret style={{background:"black", color: "red", outline:"none", fontSize:"1.2rem", fontWeight:"800"}}>Change Grid Size</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={this.handleBoardSize} name='small'>Small (15x15)</DropdownItem>
                            <DropdownItem onClick={this.handleBoardSize} name='medium'>Medium (22x22)</DropdownItem>
                            <DropdownItem onClick={this.handleBoardSize} name='large'>Large (30x30)</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div>Generation # {this.state.generation}</div>
            </div>
        )
    }
}

export default LifeCanvas;


//smiley face
// 0: {x: 3, y: 4}
// 1: {x: 11, y: 4}
// 2: {x: 2, y: 5}
// 3: {x: 4, y: 5}
// 4: {x: 10, y: 5}
// 5: {x: 12, y: 5}
// 6: {x: 1, y: 6}
// 7: {x: 5, y: 6}
// 8: {x: 9, y: 6}
// 9: {x: 13, y: 6}
// 10: {x: 1, y: 10}
// 11: {x: 13, y: 10}
// 12: {x: 2, y: 11}
// 13: {x: 12, y: 11}
// 14: {x: 3, y: 12}
// 15: {x: 11, y: 12}
// 16: {x: 4, y: 13}
// 17: {x: 5, y: 13}
// 18: {x: 6, y: 13}
// 19: {x: 7, y: 13}
// 20: {x: 8, y: 13}
// 21: {x: 9, y: 13}
// 22: {x: 10, y: 13}