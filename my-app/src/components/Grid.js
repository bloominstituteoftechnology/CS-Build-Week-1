import React, {useEffect} from 'react'
import useSound from 'use-sound';
import boopSfx from './Canon.mp3';
// import { useEffect } from 'react';

export default function Grid({ grid, columns, rows, onToggleCell }) {

	useEffect(() => {
		play()
	}, [])

		let display = grid.map((row, j) =>
			row.map((col, i) => (
				<div
					className={`Cell ${grid[i][j] ? 'isActive' : ''}`}
					onClick={e => onToggleCell(i, j)}
					key={`${i}_${j}`}
				/>
			))
		);



		const [play] = useSound(boopSfx);
			

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