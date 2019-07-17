import React, { Component } from 'react';
import Cell from './Cell.js';
import './grid.css';

const Row = (props) => {
	return (
		<div className="row">
			{props.cells.map((cell, idx) => (
				<Cell
					// true or false
					value={cell}
					// row number
					xCoord={props.xCoord}
					// column number
					yCoord={idx}
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
