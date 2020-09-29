import React, { Component } from 'react';
import Grid from './Grid';
import {Badge, ButtonGroup, Button } from 'reactstrap';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 30,
			columns: 30,
			grid: [],
			intervalId: 0,
			generation: 0
		};
		this.makeGrid = this.makeGrid.bind(this);
		this.step = this.step.bind(this);
		this.count = this.count.bind(this);
		this.seed = this.seed.bind(this);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
		this.toggleCell = this.toggleCell.bind(this);
		this.reset = this.reset.bind(this);
	}

	componentDidMount() {
		console.log(this.props.boop)
		this.props.boop()
		this.reset();
	}

	makeGrid() {
		const { columns, rows } = this.state;
		let grid = new Array(columns);
		for (let i = 0; i < grid.length; i++) {
			grid[i] = new Array(rows);
		}
		return grid;
	}

	step() {
		let next = this.makeGrid();
		const { grid, columns, rows, generation } = this.state;

		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				let state = grid[i][j];
				let neighbors = this.count(grid, i, j);

				if (state === 0 && neighbors === 3) {
					next[i][j] = 1;
				} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
					next[i][j] = 0;
				}else {
					next[i][j] = state;
				}
			}
		}
		this.setState({ grid: next, generation: generation + 1 });
		if(generation % 33 === 0){
			console.log(generation)
			this.props.boop()
		}
		
	}

	count(grid, x, y) {
		const { columns, rows } = this.state;
		let sum = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let col = (x + i + columns) % columns;
				let row = (y + j + rows) % rows;
				sum += grid[col][row];
			}
		}

		sum -= grid[x][y];
		return sum;
	}

	seed() {
		const { columns, rows, grid } = this.state;
		for (let i = 0; i < columns; i++) {
			this.props.boop()
			for (let j = 0; j < rows; j++) {
				grid[i][j] = Math.round(Math.random());
				// this.props.boop()
			}
		}
		this.setState({ grid });
	}

	play() {
		clearInterval(this.state.intervalId);
		const intervalId = setInterval(this.step, 100);
		this.setState({ intervalId });
		this.props.boop()
	}

	pause() {
		clearInterval(this.state.intervalId);
	}

	reset() {
		const { columns, rows } = this.state;
		let grid = this.makeGrid();
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = 0;
			}
		}
		this.setState({ grid, generation: 0 });
	}

	toggleCell(x, y) {
		const { grid } = this.state;
		grid[x][y] = grid[x][y] ? 0 : 1;
		this.setState({ grid });
	}

	render() {
		const { grid, columns, rows, generation } = this.state;
		return (
			<div style={{ textAlign: 'center' }}>
				<ButtonGroup size="lg">
  				{/* <Button size="lg" onClick={this.step}>STEP</Button> */}
  				<Button size="lg" onClick={this.seed}>SEED</Button>
  				<Button size="lg" onClick={this.play}>PLAY</Button>
					<Button size="lg" onClick={this.pause}>PAUSE</Button>
  				<Button size="lg" onClick={this.reset}>RESET</Button>
				</ButtonGroup>

				<Grid
					grid={grid}
					columns={columns}
					rows={rows}
					onToggleCell={this.toggleCell}
				/>
				 <Badge color="dark" pill>Generation: {generation}</Badge>
			</div>
		);
	}
}

export default Board;