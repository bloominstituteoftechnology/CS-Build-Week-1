import React, { useState, useEffect } from 'react';
import Cell from './Cells'

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;


const Game = (props) => {
    // constructor(){
    //     super();
    //     this.rows = HEIGHT / CELL_SIZE;
    //     this.cols = WIDTH / CELL_SIZE;

    //     this.board = this.makeEmptyBoard();
    // }

    const initialState = [
        cells = [],
        interval = 100,
        isRunning = false,
        generation = 1,
        theme = 'dark',
    ]

    const [cells, setCells] = useState(initialState)
    const [isRunning, setRunning] = useState(initialState)
    const [generation, setGeneration] = useState(initialState)
    const [theme, setTheme] = useState(initialState)
    const [interval, setInterval] = useState(initialState)

 
    // Create an empty board
   
       const makeEmptyBoard = (rows, cols) => {
        let board = [];
        for (let y = 0; y < rows; y++){
            board[y] = [];
            for (let x = 0; x < cols; x++){
                board[y][x] = false;
            }
        }
        return board;
    }

        // Create cells from this.Board
        const makeCells =(rows, cols, board) =>{
             cells = [];
            for(let y = 0; y < rows; y++) {
                for(let x = 0; x < cols; x++){
                    if (board[y][x]){
                        cells.push({ x, y});
                    }
                }
            }
            return cells;
        }

    const handleClear = (board) =>{
        board = makeEmptyBoard();
        // this.setState({ cells: this.makeCells() });
        setCells(makeCells());
        // this.setState({ generation: 1 });
        setGeneration(1);
    }

    const handleRandom = () =>{
        for (let y = 0; y < Math.floor(Math.random() * 60); y++){
            for (let x = 0; x < Math.floor(Math.random() * 60); x++){
                this.board[y][x] = (Math.random() >-0.5);
            }
        }

        // this.setState({ cells: this.makeCells()});
        setCells(makeCells())
    }

        const runGame = () =>{
        setRunning(true);
        this.runIteration();
    }

    const stopGame = (timeoutHandler) =>{
        setRunning(false)
        if (timeoutHandler){
            window.clearTimeout(timeoutHandler);
            timeoutHandler = null;
        }
    }

    const handleIntervalChange = (event) =>{
        setInterval(event)
    }

     // Calculate the position of a board element

     const getElementOffset = (boardRef) => {
        const rect = boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return{
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }



    const handleClick = (event, cols, rows, board) => {
        const elemOffset = getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        
        if (x >= 0 && x <= cols && y >= 0 && y <= rows){
            board[y][x] = !board[y][x];
        }

        setCells(makeCells());
       
    }



// Game helpers

    useEffect(() =>{


        
    const runIteration = (rows, cols, board, cells) =>{
        console.log('running iteration');
        let newBoard = makeEmptyBoard();

        //  TODO: add logic for iterations here
        
        for (let y = 0; y < rows; y++){
            for (let x = 0; x < cols; x++){
                
                let neighbors = calculateNeighbors(board, x, y);
                
                if (board[y][x]){
                    if (neighbors === 2 || neighbors === 3){
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!board[y][x] && neighbors === 3){
                        newBoard[y][x] = true;
                    }
                }
                if(cells === 0){
                    stopGame()
                }
            }
        }

        board = newBoard;
        setCells({ cells: makeCells() });
        setGeneration++;

      const  timeoutHandler = window.setTimeout(() =>{
            runIteration();
        }, interval);
    }

    /**
     * Calculate number of neighbors at point (x,y)
     * @param {Array} board
     * @param {int} x 
     * @param {int} y
     */

    const calculateNeighbors= (board, x, y, cols, rows) =>{
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1] [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++){
            const dir = dirs[i];
            let y1 = y + dir[0]
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < cols && y1 >= 0 && y1 < rows && board[y1][x1]){
                neighbors++;
            }
        }

        return neighbors;
    }

  
    // setDarkTheme = (Board, Cell) =>{
    //     document.getElementById('Board').className = 'Board'
    //     document.querySelectorAll('.Cell').className = 'Cell';
   
    // }

    // setDarkCell =(Cell) =>{
    //     document.getElementById('Cell').className = 'Cell';
    // }

    // setLightTheme = () =>{
    //     document.getElementById('Board').className = 'Board-light';
    // }
    })
    
        // const { cells, interval, generation, isRunning } =this.state;
        return (
            <div>
                <div id='Board' className="Board-light" 
                style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
                    onClick={handleClick} ref={(n, boardRef) =>{
                        boardRef = n;
                    }}
                    >
                    
                   

                        <Cell id='Cell' className='Cell-light' x={cells.x} y={cells.y} key={`${cells.x}, ${cells.y}`}/>
                </div>

                <div className="controls">
                    Update every <input value={interval} onChange={handleIntervalChange}/> msec
                    {isRunning ? 
                        <button className="button" onClick={stopGame}>Stop</button> :
                        <button className="button" onClick={runGame}>Run</button>
                        
                    }
                    <p value={generation}>You are on Generation {generation}</p>
                    <button className="button" onClick={handleRandom}>Random</button>
                    <button className="button" onClick={handleClear}>Clear</button>
                    {/* <button className="button" onClick={this.setDarkTheme}>Dark Theme</button>
                    <button className="button" onClick={this.setLightTheme}>Light Theme</button>
                    <button className="button" onClick={this.setDarkCell}>Dark Cell</button> */}
                </div>
            </div>
        
        )}

// class Game extends React.Component{
//     constructor(){
//         super();
//         this.rows = HEIGHT / CELL_SIZE;
//         this.cols = WIDTH / CELL_SIZE;

//         this.board = this.makeEmptyBoard();
//     }

//     state = {
//         cells: [],
//         interval: 100,
//         isRunning: false,
//         generation: 1,
//         theme: 'dark',
//     }

//         componentDidMount = () =>{

//         }

//              // Trying to put in param to auto time out game when no living cells remain
//     // componentDidUpdate = () =>{
//     //     while(this.state.isRunning = false){
//     //         this.handleClick()
//     //     }
//     // }

//     // Create an empty board
//     makeEmptyBoard(){
//         let board = [];
//         for (let y = 0; y < this.rows; y++){
//             board[y] = [];
//             for (let x = 0; x < this.cols; x++){
//                 board[y][x] = false;
//             }
//         }
//         return board;
//     }

//     // Calculate the position of a board element

//     getElementOffset(){
//         const rect = this.boardRef.getBoundingClientRect();
//         const doc = document.documentElement;

//         return{
//             x: (rect.left + window.pageXOffset) - doc.clientLeft,
//             y: (rect.top + window.pageYOffset) - doc.clientTop,
//         };
//     }

//     // Create cells from this.Board
//     makeCells(){
//         let cells = [];
//         for(let y = 0; y < this.rows; y++) {
//             for(let x = 0; x < this.cols; x++){
//                 if (this.board[y][x]){
//                     cells.push({ x, y});
//                 }
//             }
//         }
//         return cells;
//     }

//     handleClick = (event) => {
//         const elemOffset = this.getElementOffset();
//         const offsetX = event.clientX - elemOffset.x;
//         const offsetY = event.clientY - elemOffset.y;

//         const x = Math.floor(offsetX / CELL_SIZE);
//         const y = Math.floor(offsetY / CELL_SIZE);

        
//         if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows){
//             this.board[y][x] = !this.board[y][x];
//         }

//         this.setState({ cells: this.makeCells() });
       
//     }

// // Game helpers

//     runGame = () =>{
//         this.setState({ isRunning: true });
//         this.runIteration();
//     }

//     stopGame = () =>{
//         this.setState({ isRunning: false });
//         if (this.timeoutHandler){
//             window.clearTimeout(this.timeoutHandler);
//             this.timeoutHandler = null;
//         }
//     }

//     handleIntervalChange = (event) =>{
//         this.setState({ interval: event.target.value });
//     }

//     runIteration(){
//         console.log('running iteration');
//         let newBoard = this.makeEmptyBoard();

//         //  TODO: add logic for iterations here
        
//         for (let y = 0; y < this.rows; y++){
//             for (let x = 0; x < this.cols; x++){
                
//                 let neighbors = this.calculateNeighbors(this.board, x, y);
                
//                 if (this.board[y][x]){
//                     if (neighbors === 2 || neighbors === 3){
//                         newBoard[y][x] = true;
//                     } else {
//                         newBoard[y][x] = false;
//                     }
//                 } else {
//                     if (!this.board[y][x] && neighbors === 3){
//                         newBoard[y][x] = true;
//                     }
//                 }
//                 if(this.cells === 0){
//                     this.stopGame()
//                 }
//             }
//         }

//         this.board = newBoard;
//         this.setState({ cells: this.makeCells() });
//         this.state.generation++;

//         this.timeoutHandler = window.setTimeout(() =>{
//             this.runIteration();
//         }, this.state.interval);
//     }

//     /**
//      * Calculate number of neighbors at point (x,y)
//      * @param {Array} board
//      * @param {int} x 
//      * @param {int} y
//      */

//     calculateNeighbors(board, x, y){
//         let neighbors = 0;
//         const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1] [1, 1], [1, 0], [1, -1], [0, -1]];
//         for (let i = 0; i < dirs.length; i++){
//             const dir = dirs[i];
//             let y1 = y + dir[0]
//             let x1 = x + dir[1];

//             if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]){
//                 neighbors++;
//             }
//         }

//         return neighbors;
//     }

//     handleClear = () =>{
//         this.board = this.makeEmptyBoard();
//         this.setState({ cells: this.makeCells() });
//         this.setState({ generation: 1 });
//     }

//     handleRandom = () =>{
//         for (let y = 0; y < Math.floor(Math.random() * 60); y++){
//             for (let x = 0; x < Math.floor(Math.random() * 60); x++){
//                 this.board[y][x] = (Math.random() >-0.5);
//             }
//         }

//         this.setState({ cells: this.makeCells()});
//     }

//     setDarkTheme = (Board, Cell) =>{
//         document.getElementById('Board').className = 'Board'
//         document.querySelectorAll('.Cell').className = 'Cell';
   
//     }

//     // setDarkCell =(Cell) =>{
//     //     document.getElementById('Cell').className = 'Cell';
//     // }

//     setLightTheme = () =>{
//         document.getElementById('Board').className = 'Board-light';
//     }

//     render(){
//         const { cells, interval, generation, isRunning } =this.state;
//         return (
//             <div>
//                 <div id='Board' className="Board-light" 
//                 style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}
//                     onClick={this.handleClick} ref={(n) =>{
//                         this.boardRef = n;
//                     }}
//                     >
                    
//                     {cells.map(cell =>(

//                         <Cell id='Cell' className='Cell-light' x={cell.x} y={cell.y} key={`${cell.x}, ${cell.y}`}/>
//                     ))}
//                 </div>

//                 <div className="controls">
//                     Update every <input value={this.state.interval} onChange={this.handleIntervalChange}/> msec
//                     {isRunning ? 
//                         <button className="button" onClick={this.stopGame}>Stop</button> :
//                         <button className="button" onClick={this.runGame}>Run</button>
                        
//                     }
//                     <p value={this.state.generation}>You are on Generation {generation}</p>
//                     <button className="button" onClick={this.handleRandom}>Random</button>
//                     <button className="button" onClick={this.handleClear}>Clear</button>
//                     <button className="button" onClick={this.setDarkTheme}>Dark Theme</button>
//                     <button className="button" onClick={this.setLightTheme}>Light Theme</button>
//                     <button className="button" onClick={this.setDarkCell}>Dark Cell</button>
//                 </div>
//             </div>
//         );
//     }
// }

export default Game;