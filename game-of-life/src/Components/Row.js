import React from 'react';
import Cell from './Cell.js';
import './grid.css';

const Row = (props) => {
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
				/>
			))}
		</div>
	);
};

export default Row;
