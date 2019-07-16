import React, { Component } from 'react';
import Row from './Row.js';

class Grid extends Component {
	state = {
		grid: [[]],
		size: 0,
		generation: 0
	};

	componentDidMount() {
		this.updateGrid();
	}
	// any live cell with < 2 live neighbors dies
	// any live cell with 2 or 3 live neighbors lives on to next gen
	// any live cell with > 3 live neighbors dies
	// any dead cell with >=3 live neighbors becomes alive
	updateGrid() {
		// O(n^2) but capped at size of grid.
		if (this.state.size>0) {
			// loop through outer array
			for (let i = 0; i < this.state.grid.length; i++) {
				// loop through each inner array
				for (let j = 0; j < this.state.grid[i].length; j++) {
					// call helper function, returns an object with { alive: #, dead: # }
					const count = this.findNeighbors(i, j, this.state.grid);
					// if this cell is alive check the Conway conditions
					if (this.state.grid[i][j]) {
						// live cell with two live neighbors, kill it
						if (count.alive < 2) {
							this.state.grid[i][j] = false;
						}
						// live cell with three live neighbors, kill it
						if (3 < count.alive) {
							this.state.grid[i][j] = false;
						}
					}
					// else the cell is dead, check the Conway conditions
					else {
						// dead cell with 3 live neighbors, lazarous
						if (count.alive > 3) {
							this.state.grid[i][j] = true;
						}
					}
				}
			}
		}
	}

	findNeighbors = (x, y, arr) => {
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
	};

	createGrid = int => {
		const row = Array(int).fill(false);
		const grid = Array(int).fill(row);
		this.setState({
			grid: grid,
			size: int // not sure we'll need this
		});
	};

	changeHandler = e => {

		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		if (this.state.size == 0) {
			return (
				<form>
					<input
						type="text"
						value={this.state.size}
						name="size"
						placeholder="how big would you like your square?"
						onChange={this.changeHandler}
						onSubmit={this.setSize}
					/>
					<button type="submit">SUBMIT</button>
				</form>
			);
		} else {
			return this.state.grid.map(row => <Row cells={row} />);
		}
	}
}

export default Grid;
