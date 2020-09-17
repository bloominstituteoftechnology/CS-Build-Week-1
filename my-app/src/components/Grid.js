import React, { Component } from 'react';

export default class Grid extends Component {
	render() {
		const { grid, columns, rows, onToggleCell } = this.props;
		let display = grid.map((row, j) =>
			row.map((col, i) => (
				<div
					className={`Cell ${grid[i][j] ? 'isActive' : ''}`}
					onClick={e => onToggleCell(i, j)}
					key={`${i}_${j}`}
				/>
			))
		);

		return (
			<div
				className="Grid"
				style={{
					width: this.props.columns * 14
				}}>
				{display}
			</div>
		);
	}
}