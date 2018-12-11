import React, {Component} from 'react';
import Footer from './Footer';
import Cell from './Cell';
import '../App.css';
import Header from './Header';
import Game_of_life from '../Logic/Game_of_life';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gridSize: [30, 30],
            runningGame: false,
            game_of_life: new Game_of_life(),
         }
    }

    play = () => {
        if (!this.state.runningGame) {
            this.setState({
                runningGame: true,
            });
        }
        console.log("Play");
    }

    pause = () => {
        console.log("Pause");
    }

    stop = () => {
        this.setState({
            runningGame: false,
        });
        console.log("Stop");
    }

    toggleCell = (coordinates) => {
        if (!this.state.runningGame) {
            this.setState({
                game_of_life: this.state.game_of_life.toggleCell(coordinates),
            });

            console.log("cell clicked");
        }
    }


    createGrid = () => {
        let newGrid = [];
        let row = [];

        for (let i = 0; i < this.state.gridSize[0]; i++) {
            for (let j = 0; j < this.state.gridSize[1]; j++) {
                if (this.state.game_of_life.aliveCells(i + "," + j)) {
                row.push(<Cell key = {[i, j]} coordinates = {{x: i, y: j}} liveCell = {true} toggleCell = {this.toggleCell} />);
            } else {
                row.push(<Cell key = {[i, j]} coordinates = {{x: i, y: j}} liveCell = {false} toggleCell = {this.toggleCell} />);
            }
        }
            newGrid.push(<div className = "row" key = {i}>{row}</div>);
            row = [];
        }

        return newGrid;
    }

    render() { 
        return (
            <div className = 'gol-container'>
                <Header />
                    <div className = 'grid'>
                        {this.createGrid()}
                    </div>
                <Footer 
                    play = {this.play}
                    pause = {this.pause}
                    stop = {this.stop}
                />
            </div>
         );
    }
}
 
export default Grid;