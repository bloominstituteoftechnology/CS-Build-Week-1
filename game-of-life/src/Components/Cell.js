import React from 'react';
import './grid.css';

const Cell = props => {
	// set style object to control width
	const width = (1 / props.size*100).toString();
	const cellStyles = {
		width: width + '%',
		height:'100%'
	};

	
		return (
			<div
				// style={cellStyles}
				className={props.value ? 'cell on' : 'cell off'}
				onClick={() => {
					if (!props.running)
						props.toggle(props.yCoord, props.xCoord);
				}}
			/>
		);
		// show another if the value is false
	
};

export default Cell;
