import React, { Component } from 'react';
import Cell from './Cell.js';

class Row extends Component {
	// state = {
	//     cells = this.props.cells
	// }
	render() {
		return this.props.cells.map(cell => 
			<Cell value={cell} />
		);
	}
}

export default Row;
