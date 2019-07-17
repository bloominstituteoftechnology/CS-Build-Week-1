import React from 'react';

const Cell = props => {
	// show one thing if the value is true
	if (props.value) {
		return <div>TRUE</div>;
		// show another if the value is false
	} else {
		return (
			<div
				onClick={() => {
                    // if (!props.running) 
                    {
						props.toggle(props.xCoord, props.yCoord);
					}
				}}
			>
				FALSE
			</div>
		);
	}
};

export default Cell;
