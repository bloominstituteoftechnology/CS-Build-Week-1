import React, {Component} from 'react';
import Footer from './Footer';
import Cell from './Cell';
import '../App.css';
import Header from './Header';
import Game_of_life from '../Logic/Game_of_life';
import Controls from './Controls';
import {Container} from 'reactstrap';
import RulesModal from './RulesModal';
import HistoryModal from './HistoryModal';
class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gridSize: [25, 25],
            runningGame: false,
            game_of_life: new Game_of_life(),
            interval: 100,
         }         
    }


    play = () => {
        if (!this.state.runningGame) {
            this.setState({
                runningGame: true,
            });
        this.startTheShow();
        console.log("Play");
        }
    }

    stop = () => {
        this.setState({
            runningGame: false,
        });

        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
        console.log("Stop");
    }

    reset = () => {
         this.setState({
             gridSize: [30, 30],
             runningGame: false,
             game_of_life: new Game_of_life(),
         });

         if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
        console.log('reset');

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
        this.timeoutHandler = window.setTimeout(() => {
            this.startTheShow();
          }, this.state.interval);
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
            newGrid.push(<div style = {{textAlign: 'center', justifyContent: 'center'}} className = "row" key = {i}>{row}</div>);
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
            <Container>
                <div className = 'history-rules'>
                    <RulesModal />
                    <HistoryModal />
                </div>
                <Header generation = {this.state.game_of_life.generate()}/>
                    <Container >
                    {this.createGrid()}
                    </Container>
                <Footer 
                    play = {this.play}
                    stop = {this.stop}
                    reset = {this.reset}
                    random = {this.randomGrid}
                />
                <Controls 
                    rows = {this.state.gridSize[1]}
                    columns = {this.state.gridSize[0]}
                    interval = {this.state.interval}

                    rowsOnChange = {this.rowsOnChange}
                    columnsOnChange = {this.columnsOnChange}
                    intervalChange = {this.intervalChange}

                />
            </Container>
         );
    }
}
 
export default Grid;