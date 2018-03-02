import React, { Component } from 'react';
import Life from './life';
import './App.css';

/**
 * Life canvas
 */
class LifeCanvas extends Component {
	/**
	 * Constructor
	 */
	constructor(props) {
		super(props);

		this.life = new Life(props.width, props.height);
		this.life.randomize();
	}

	/**
	 * Component did mount
	 */
	componentDidMount() {
		requestAnimationFrame(() => {
			this.animFrame();
		});
	}

	/**
	 * Handle an animation frame
	 */
	animFrame() {
		//
		// !!!! IMPLEMENT ME !!!!
		//

		const { height, width } = this.props;

		// Update life and get cells
		const cells = this.life.getCells();

		// Get canvas framebuffer, a packed RGBA array
		let canvas = this.refs.canvas;
		let ctx = canvas.getContext('2d');
		let imageData = ctx.getImageData(0, 0, width, height);

		// Convert the cell values into white or black for the canvas
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const index = (y * width + x) * 4; //4 because RGBA

				let state = cells[y][x];
				let color = state === 0 ? 0x00 : 0xff;

				imageData.data[index + 0] = color; //Red Channel
				imageData.data[index + 1] = color; //Green Channel
				imageData.data[index + 2] = color; //Blue Channel
				imageData.data[index + 3] = 0xff; //Alpha Channel
			}
		}

		// Put the new image data back on the canvas
		ctx.putImageData(imageData, 0, 0);

		// Next generation of life
		this.life.step();

		// Request another animation frame
		requestAnimationFrame(() => {
			this.animFrame();
		});
	}

	/**
	 * Render
	 */
	render() {
		return (
			<canvas
				ref="canvas"
				width={this.props.width}
				height={this.props.height}
			/>
		);
	}
}

/**
 * Life holder component
 */
class LifeApp extends Component {
	/**
	 * Render
	 */
	render() {
		return (
			<div>
				<LifeCanvas width={400} height={300} />
			</div>
		);
	}
}

/**
 * Outer App component
 */
class App extends Component {
	/**
	 * Render
	 */
	render() {
		return (
			<div className="App">
				<LifeApp />
			</div>
		);
	}
}

export default App;
