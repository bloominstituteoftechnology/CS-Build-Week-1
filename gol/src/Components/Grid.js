import React, {Component} from 'react';
import Footer from './Footer';
import Cell from './Cell';
import '../App.css';
import Header from './Header';
import Controls from './Controls';
import {Container} from 'reactstrap';
import RulesModal from './RulesModal';
import HistoryModal from './HistoryModal';
class Grid extends Component {
    constructor(props) {
        super(props);
        this.nextIteration = new Map();
        this.deadCells = new Map();
        this.aliveOrganizms = new Map();
        this.state = { 
            gridSize: [25, 25],
            runningGame: false,
            interval: 100,
            generation: 0,
            organism: 0
         }
    }

    iteration() {
        this.aliveOrganizms.forEach((cell) => {
            this.liveCellsCount(cell);
        })
        this.deadCells.forEach((cell) => {
            this.deadCellsCount(cell);
        })

        this.aliveOrganizms = this.nextIteration;
        this.nextIteration = new Map();
        this.deadCells = new Map();

        let inceremtGeneration = this.state.generation;
        inceremtGeneration ++;
        this.setState({
            generation: inceremtGeneration,
        });
    }

    newCell (coordinates) {
        this.aliveOrganizms.set(coordinates.x + "," + coordinates.y, {x: coordinates.x, y: coordinates.y});
    }

    deleteCell (coordinates) {
        this.aliveOrganizms.delete(coordinates);
    }

    aliveCells (coordinates) {
        return this.aliveOrganizms.has(coordinates);
    }

    toggleCell = (coordinates) => {
        if (this.aliveCells(coordinates.x + "," + coordinates.y)){
            this.deleteCell(coordinates.x + "," + coordinates.y);
            console.log("Delete cell");
        } else {
            this.newCell(coordinates);
            console.log("New Cell");
        }
        this.setState({
            cells: coordinates,
        });
    }

    ///////// Game rules goes here///////////

    // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

    // Need to check for any live nextdoor cells
    liveCellsCount (coordinates) {
        let nextdoorCells = 0;

        for (let i = coordinates.x - 1; i <= coordinates.x + 1; i++) {
            for (let j = coordinates.y - 1; j <= coordinates.y + 1; j++) {
                if (i === coordinates.x && j === coordinates.y) {
                    continue;
                }
                // Alve nexdoor cell is added to the nexdoorCells count.
                // Otherwises it is added to the deadCells
                if (this.aliveCells(i + "," + j)) {
                    nextdoorCells ++;
                } else {
                    this.deadCells.set(i + "," + j, {x: i, y: j});
                }
            }
        }

        // Any live cell with two or three live neighbors lives on to the next generation.
        if (nextdoorCells === 2 || nextdoorCells === 3) {
            this.nextIteration.set(coordinates.x + "," + coordinates.y, {x: coordinates.x, y: coordinates.y});
        }
    }
    // Need to check for any dead nextdoor cells
    deadCellsCount (coordinates) {
        let nextdoorCells = 0;

        for (let i = coordinates.x - 1; i <= coordinates.x + 1; i++) {
            for (let j = coordinates.y - 1; j <= coordinates.y + 1; j++) {
                if (i === coordinates.x && j === coordinates.y) {
                    continue;
                }
                if (this.aliveCells(i + "," + j)) {
                    nextdoorCells ++;
                }
            }
        }

        // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
        if (nextdoorCells === 3) {
            this.nextIteration.set(coordinates.x + "," + coordinates.y, {x: coordinates.x, y: coordinates.y});
        }
    }

    play = () => {
        console.log("Play");
        this.setState({
            runningGame: true,
        }, () =>this.startTheShow())

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
        this.aliveOrganizms.forEach((cell) => {
            this.deleteCell(cell.x + ',' + cell.y);
        });

         this.setState({
            runningGame: false,
            generation: 0,
         });

         if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
        console.log('reset');

    }

    randomGrid = () => {

        this.aliveOrganizms.forEach((cell) => {
            this.deleteCell(cell.x + ',' + cell.y);
        });

        for (let i = 0; i < this.state.gridSize[0]; i++) {
            for (let j = 0; j < this.state.gridSize[1]; j++) {
                    if (Math.floor(Math.random() * 4) === 1) {
                        this.newCell({x: i, y: j});
                    }
                }
            }
        this.setState({
            organism: -1,
        });   
    }

    startTheShow() {
       if (!this.state.runningGame)
           return;
        this.iteration();
        this.timeoutHandler = window.setTimeout(() => {
            this.startTheShow();
          }, this.state.interval);
    }


    createGrid = () => {
        let newGrid = [];
        let row = [];

        for (let i = 0; i < this.state.gridSize[0]; i++) {
            for (let j = 0; j < this.state.gridSize[1]; j++) {
                if (this.aliveCells(i + "," + j)) {
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
                <Header generation = {this.state.generation}/>
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