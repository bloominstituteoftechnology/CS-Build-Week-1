import React from 'react';
import ReactTimeout from 'react-timeout';
import './Game.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            isRunning: false,
            iterationCount: 0
        };

        this.startGame = e => {
            e.preventDefault();
            if (this.state.isRunning) { return; }
            this.setState({ isRunning: true });
            this.continueGame();
        };

        this.stopGame = e => {
            e.preventDefault();
            if (!this.state.isRunning) { return; }
            window.clearTimeout(this.timeout);
            this.setState({ isRunning: false, iterationCount: 0 });
        };

        this.continueGame = () => {
            let grid = this.state.grid.map(row => row.slice());
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    let count = this.countNeighbors(i, j);
                    if (grid[i][j]) {
                        if (count < 2 || count > 3) {
                            grid[i][j] = false;
                        }
                    } else {
                        if (count === 3) {
                            grid[i][j] = true;
                        }
                    }
                }
            }
            this.setState({
                grid: grid,
                iterationCount: this.state.iterationCount + 1
            });

            this.timeout = setTimeout(() => {
                this.continueGame();
            }, 500);
        };

        this.countNeighbors = (rowIndex, cellIndex) => {
            const neighbors = [
                [rowIndex - 1, cellIndex - 1],
                [rowIndex - 1, cellIndex],
                [rowIndex - 1, cellIndex + 1],
                [rowIndex, cellIndex - 1],
                [rowIndex, cellIndex + 1],
                [rowIndex + 1, cellIndex - 1],
                [rowIndex + 1, cellIndex],
                [rowIndex + 1, cellIndex + 1]
            ];

            let count = 0;

            for (let i = 0; i < neighbors.length; i++) {
                if ((neighbors[i][0] >= 0 && neighbors[i][0] <= 14) &&
                    (neighbors[i][1] >= 0 && neighbors[i][1] <= 14)) {
                    const position = neighbors[i];
                    if (this.state.grid[position[0]][position[1]]) {
                        count += 1;
                    }
                }
            }
            return count;
        };

        this.toggleCell = (rowIndex, cellIndex) => {
            let grid = this.state.grid;
            grid[rowIndex][cellIndex] = !grid[rowIndex][cellIndex];
            this.setState({ grid: grid });
        };

        this.clearGrid = e => {
            e.preventDefault();
            let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
            this.setState({ grid: grid });
        };
    }

    componentDidMount() {
        let grid = Array(15).fill(null).map(_ => Array(15).fill(false));
        this.setState({ grid: grid });
    }

    render() {
        return (
            <div className="container">
                <div className="grid-container">
                    {this.state.grid.map((row, rowIndex) => {
                        return <div key={rowIndex}
                            className="row">{row.map((cell, cellIndex) => {
                                return <div key={cellIndex}
                                    className={cell ? "live-cell" : "dead-cell"}
                                    onClick={!this.state.isRunning ?
                                        () => this.toggleCell(rowIndex, cellIndex) :
                                        null}
                                >{cell}</div>;
                            })}</div>;
                    })}
                </div>
                <div className="controls">
                    <p onClick={this.startGame}>start</p>
                    <p onClick={this.stopGame}>stop</p>
                    <p onClick={this.clearGrid}>clear</p>
                    <div>{this.state.iterationCount} generations</div>
                </div>
                <div className="options">
                    <p>patterns</p>
                    <p>colors</p>
                </div>
            </div>
        );
    }
}

export default ReactTimeout(App);