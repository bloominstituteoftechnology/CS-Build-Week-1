import React, { Component } from 'react';
import Cell from './Cell.js';
import './grid.css'

class Row extends Component {
	// state = {
	//     cells = this.props.cells
	// }
	render() {
		return (
			<div className="row">
				{this.props.cells.map(cell => 
					<Cell value={cell} running={this.props.running} />
				)}
			</div>
		)
		
	}
}

export default Row;
