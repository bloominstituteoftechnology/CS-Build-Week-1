import React, {Component} from 'react';
import Footer from './Footer';
import Cell from './Cell';
import '../App.css';
import Header from './Header';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gridSize: [70, 30],
            inGame: false,
         }
    }

    createGrid = () => {
        let newGrid = [];
        let row = [];

        for (let i = 0; i < this.state.gridSize[0]; i++) {
            for (let j = 0; j < this.state.gridSize[1]; j++) {
                row.push(<Cell key = {[i, j]} />);
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
                <Footer />
            </div>
         );
    }
}
 
export default Grid;