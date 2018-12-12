import React from 'react';
import './Game.css';
import GameCell from './GameCell'


const game_cell = 15;
const game_width = 660;
const game_height = 450;



class Game extends React.Component {
    constructor() {
        super();
        this.rows = game_height / game_cell;
        this.columns = game_width / game_cell;


       this.gameboard = this.makeNewBoard();
    }
      state = {
       gamecells: [],
       interval: 100,
       isEngaged: false,
      }
    
      makeNewBoard() {
        let gameboard = [];
        for (let y = 0; y < this.rows; y++) {
            gameboard[y] = [];
          for (let x = 0; x < this.columns; x++) {
            gameboard[y][x] = false;
          }
        }
        return gameboard;
      }
     
      makeNewCells() {
        let gamecells = [];
        for (let y = 0; y < this.rows; y++) {
          for (let x = 0; x < this.columns; x++) {
            if (this.gameboard[y][x]) {
              gamecells.push({ x, y });
            }
          }
        }
        return gamecells;
      }
      
      getElement() {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;
        return {
          x: (rect.left + window.pageXOffset) - doc.clientLeft,
          y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
      }


      onClick = (event) => {
        const elemOffset = this.getElement();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / game_cell);
        const y = Math.floor(offsetY / game_cell);
        if (x >= 0 && x <= this.columns && y >= 0 && y <= this.rows) {
          this.gameboard[y][x] = !this.gameboard[y][x];
        }
        this.setState({ gamecells: this.makeNewCells() });
      }

      startGame = () => {
        this.setState({ isEngaged: true });
        this.runCoordinates();
      }

      stopGame = () => {
        this.setState({ isEngaged: false });
        if (this.handleTimeOut) {
          window.clearTimeout(this.handleTimeOut);
          this.handleTimeOut = null;
        }
      }

      runCoordinates() {
        let newBoard = this.makeNewBoard();
    
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                let connections = this.makeConnections(this.gameboard, x, y);
             
                if (this.gameboard[y][x]) {
                    if (connections === 2 || connections === 3) {
                    //    newBoard[y][x] = true;  //cells live
                    } else {
                        newBoard[y][x] = false; //cells die
                    }
                } else {
                    if (!this.gameboard[y][x] && connections === 3) {
                        newBoard[y][x] = true; //new cell is born
                    }
                }
            }
      }

        this.gameboard = newBoard;
        this.setState({ gamecells: this.makeNewCells() });
        this.timeoutHandler = window.setTimeout(() => {
        this.runCoordinates();
    }, this.state.interval);
    }

    makeConnections(gameboard, x, y) {
        let connections = 0;
        const gridCoordinates = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
   
        for (let i = 0; i < gridCoordinates.length; i++) {
            const coordinate = gridCoordinates[i];
            let y1 = y + coordinate[0];
            let x1 = x + coordinate[1];
        
            if (x1 >= 0 && x1 < this.columns && y1 >= 0 && y1 < this.rows && gameboard[y1][x1]) {
                connections++;
            }
        }

        return connections;
    }


      intervalHandler = (event) => {
        this.setState({ interval: event.target.value });
      } 

    render() {
        const { gamecells, interval, isEngaged } = this.state;
        return (
            <div>
                <div className="graphBoard"
                    style={{ width: game_width, height: game_height, backgroundSize: `${game_cell}px ${game_cell}px`}}
                    onClick={this.onClick}
                    ref={(n) => { this.boardRef = n; }}>

                    {gamecells.map(gamecell => (
                        <GameCell x={gamecell.x} y={gamecell.y} key={`${gamecell.x},${gamecell.y}`}/>
                    ))}
                </div>
                      <div className="controls">
                          Update every <input value={this.state.interval} onChange={this.intervalHandler} /> msec
                          {isEngaged ?
                                <button className="button" onClick={this.stopGame}>Stop</button> :
                                <button className="button" onClick={this.startGame}>Run</button>
                          }
                      </div>
        
                </div>

        );
    }
}

export default Game;
