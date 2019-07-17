import React, { Component } from 'react';
import Row from './Row.js';

class Grid extends Component {
	state = {
		grid: [[]],
		size: 0,
		generation: 0,
		running: false
	};

	componentDidMount() {
		this.updateGrid();
	}

	updateGrid() {
		// O(n^2) but capped at size of grid.
		// check that the grid has been configured
		if (this.state.size > 0) {
			// declare variables that you'll manipulate and eventually set to state
			const newGrid = this.state.grid;
			const newGen = this.state.generation + 1;
			// loop through outer array
			for (let i = 0; i < newGrid.length; i++) {
				// loop through each inner array
				for (let j = 0; j < newGrid[i].length; j++) {
					// call helper function, returns an object with { alive: #, dead: # }
					const count = this.findNeighbors(i, j, newGrid);
					// if this cell is alive check the Conway conditions
					if (newGrid[i][j]) {
						// live cell with two live neighbors, kill it
						if (count.alive < 2) {
							newGrid[i][j] = false;
						}
						// live cell with three live neighbors, kill it
						if (3 < count.alive) {
							newGrid[i][j] = false;
						}
					}
					// else the cell is dead, check the Conway conditions
					else {
						// dead cell with 3 live neighbors, lazarous
						if (count.alive > 3) {
							newGrid[i][j] = true;
						}
					}
				}
			}
			// update state with the new grid, increment the generation
			this.setState({
				grid: newGrid,
				generation: newGen
			});
		}
	}

	findNeighbors(x, y, arr) {
		const neighbors = [];
		const count = {
			alive: 0,
			dead: 0
		};
		// north
		neighbors.push(arr[x - 1][y]);
		// east
		neighbors.push(arr[x][y + 1]);
		// south
		neighbors.push(arr[x + 1][y]);
		// west
		neighbors.push(arr[x][y - 1]);
		// north east
		neighbors.push(arr[x - 1][y + 1]);
		// south east
		neighbors.push(arr[x + 1][y + 1]);
		// south west
		neighbors.push(arr[x + 1][y - 1]);
		// north west
		neighbors.push(arr[x - 1][y - 1]);
		neighbors.forEach(neighbor => {
			neighbor ? count.alive++ : count.dead++;
		});

		return count;
	}

	createGrid = e => {
		e.preventDefault();
		const int = this.state.size;
		const cell = false
		const row = []
		const grid = []
		// i miss python
		for (let i = 0; i < int; i++){
			row.push(cell)
		}
		for (let i = 0; i < int; i++){
			grid.push(row)
		}
		this.setState({
			grid: grid,
			generation: 1 
		});
	};

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		if (this.state.generation === 0) {
			return (
				<form onSubmit={this.createGrid} >
					<input
						type="text"
						value={this.state.size}
						name="size"
						placeholder="how big would you like your square?"
						onChange={this.changeHandler}
						
					/>
					<button type="submit">SUBMIT</button>
				</form>
			);
		} else {
			return this.state.grid.map(row => <Row cells={row} running={this.state.running} />);
		}
	}
}

export default Grid;
