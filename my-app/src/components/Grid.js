import React from 'react'

export default function Grid({ grid, columns, rows, onToggleCell }) {

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
					width: columns * 14
				}}>
				{display}
			</div>
  )
}