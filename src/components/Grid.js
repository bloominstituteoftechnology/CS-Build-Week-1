import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
// import useTheme from '@material-ui/styles/useTheme';

import Cell from './Cell';

const useStyles = makeStyles((theme, gridX, gridY) => ({
	root: {
		width: '100%',
		height: '100%'
	},
	grid: {
		display: 'grid'
		// gridTemplateColumns: `repeat(${gridX}, 40px)`,
		// gridTemplateRows: 'repeat(gridY, 40px)'
	}
}));

export default function Grid({ cellData, gridX, gridY }) {
	const classes = useStyles(gridX, gridY);
	// const theme = useTheme();

	console.log(cellData);
	return (
		<div
			className={classes.grid}
			style={{
				gridTemplate: `repeat(${gridY}, 40px) / repeat(${gridX}, 40px)`
			}}
		>
			{cellData.map((cell, index) => {
				return <Cell key={cell.index} status={cell} />;
			})}
		</div>
	);
}
