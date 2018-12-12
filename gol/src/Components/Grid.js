import React, {Component} from 'react';
import Footer from './Footer';
import Cell from './Cell';
import '../App.css';
import Header from './Header';
import Game_of_life from '../Logic/Game_of_life';
import Controls from './Controls';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gridSize: [30, 30],
            runningGame: false,
            game_of_life: new Game_of_life(),
            interval: 1000,
         }         
    }


    play = () => {
        if (!this.state.runningGame) {
            this.setState({
                runningGame: true,
            }, () => { this.intervalTimer = setInterval(() => this.startTheShow(), this.state.interval);
        })
        console.log("Play");
        }
    }

    pause = () => {
        console.log("Pause");
    }

    stop = () => {
        this.setState({
            runningGame: false,
        }, () => {
            if (this.intervalTimer) {
                clearInterval(this.intervalTimer);
            }
        });
        console.log("Stop");
    }

    reset = () => {
         this.setState({
             gridSize: [30, 30],
             runningGame: false,
             game_of_life: new Game_of_life(),
         },  () => {
            if (this.intervalTimer) {
                clearInterval(this.intervalTimer);
            }
        });
    }

    toggleCell = (coordinates) => {
        if (!this.state.runningGame) {
            this.setState({
                game_of_life: this.state.game_of_life.toggleCell(coordinates),
            });

            console.log("cell clicked");
        }
    }

    startTheShow() {
        this.setState({
            game_of_life: this.state.game_of_life.iteration()
        });
    }


    createGrid = () => {
        let newGrid = [];
        let row = [];

        for (let i = 0; i < this.state.gridSize[0]; i++) {
            for (let j = 0; j < this.state.gridSize[1]; j++) {
                if (this.state.game_of_life.aliveCells(i + "," + j)) {
                row.push(<Cell key = {[i, j]} coordinates = {{x: i, y: j}} liveCell = {true} toggleCell = {this.toggleCell} />);
                console.log('New cell at: ', i, j);
            } else {
                row.push(<Cell key = {[i, j]} coordinates = {{x: i, y: j}} liveCell = {false} toggleCell = {this.toggleCell} />);
            }
        }
            newGrid.push(<div className = "row" key = {i}>{row}</div>);
            row = [];
        }
        return newGrid;
    }

    intervalChange = (event) => {
        this.setState({
            interval: event.target.value,
        });
    }

    rowsOnChange = (event) => {
        let size = this.state.gridSize;
        size[1] = event.target.value;

        this.setState({
            gridSize: size,
        });

        this.createGrid();
    }

    columnsOnChange = (event) => {
        let size = this.state.gridSize;
        size[0] = event.target.value;
        
        this.setState({
            gridSize: size,
        });

        this.createGrid();
    }



    render() { 
        return (
            <div className = 'gol-container'>
                <Header generation = {this.state.game_of_life.generate()}/>
                    <div className = 'grid'>
                        {this.createGrid()}
                    </div>
                <Footer 
                    play = {this.play}
                    stop = {this.stop}
                    reset = {this.reset}
                />
                <Controls 
                    rows = {this.state.gridSize[1]}
                    columns = {this.state.gridSize[0]}
                    interval = {this.state.interval}

                    rowsOnChange = {this.rowsOnChange}
                    columnsOnChange = {this.columnsOnChange}
                    intervalChange = {this.intervalChange}

                />
            </div>
         );
    }
}
 
export default Grid;