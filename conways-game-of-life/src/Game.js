import React from 'react';
import './Game.css';
import GameCell from './GameCell'


const game_cell = 25;
const game_width = 850;
const game_height = 650;



class Game extends React.Component {
    constructor() {
        super();
        this.rows = game_height / game_cell;
        this.columns = game_width / game_cell;
        this.gameboard = this.makeNewBoard();
      }
      state = {
        gamecells: [],
      }
      // Create an empty board
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
      // Create cells from this.board
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

    render() {
        const { gamecells } = this.state;
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
            </div>

        );
    }
}

export default Game;