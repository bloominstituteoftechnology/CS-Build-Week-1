import React from 'react';
import Cell from './Cell.js';
import './grid.css';

const Row = (props) => {

	const height = (1/props.size*100).toString()
	// const rowStyles = {
	// 	height: height+'%',
	// 	width: '100%'
	// }

	return (
		<div className="row">
			{props.cells.map((cell, idx) => (
				<Cell
					key={idx}
					// true or false
					value={cell}
					// row number
					yCoord={props.yCoord}
					// column number
					xCoord={idx}
					// whether game is running
					running={props.running}
					// drill down the toggle method
					toggle={props.toggle}
					// drill down the grid size
					size={props.size}
				/>
			))}
		</div>
	);
};

export default Row;
