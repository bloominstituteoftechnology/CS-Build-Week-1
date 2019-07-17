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

	findNeighbors(x, y, arr) { // pass in coordinates and an array
		// create an array to map through later
		const neighbors = [];
		// this is likely unnecessary, as you just need to know alive, but this is what will be returned
		const count = {
			alive: 0,
			dead: 0
		};
	// push all neighbor values into the neighbors array
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
		// check the value of each neighor, increment alive if True and Dead if not.
		neighbors.forEach(neighbor => {
			neighbor ? count.alive++ : count.dead++;
		});

		return count;
	}

	gridHelper() {
		const int = parseInt(this.state.size)

		const row = [];
		const grid = [];
		// for (let i = 0; i < int; i++) {
		// 	row.push(false);
		// }
		for (let i = 0; i < int; i++) {

			grid[i] = new Array(int).fill(0)
			console.log('loop number: ', i);
		}
		console.log(grid)
		return grid
	}

	createGrid = e => {
		e.preventDefault();
		const newGrid = this.gridHelper()
		this.setState({
			grid: newGrid,
			generation: 1
		});
	};

	toggleCell = (x, y) => {
		// y = row, x = column
		// create a new grid with all false values NOTE this isn't going to work for multiple 
		const newGrid = this.state.grid
		// edit cell at x,y to == true
		console.log('row = ', y, 'column = ', x)
		console.log('target value: ', newGrid[y][x])
		// toggle value in copy of grid
		newGrid[y][x] = (!newGrid[y][x])
		console.log(newGrid)
		// setState w/ updated grid
		this.setState({
			grid : newGrid,
			running : true
		})
		// incremement generation
		// toggle running
	};

	changeHandler = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		if (this.state.generation === 0) {
			return (
				<form onSubmit={this.createGrid}>
					<input
						type="number"
						value={this.state.size}
						name="size"
						placeholder="how big would you like your square?"
						onChange={this.changeHandler}
					/>
					<button type="submit">SUBMIT</button>
				</form>
			);
		} else {
			return this.state.grid.map((row, idx) => (
				<Row 
					key={idx}
					// pass in the row values
					cells={row} 
					// pass down the row coordinate
					yCoord={idx} 
					// whether the game is running
					running={this.state.running}
					// drill down the toggle method
					toggle={this.toggleCell} 
				/>
			));
		}
	}
}

export default Grid;
