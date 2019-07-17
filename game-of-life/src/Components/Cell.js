import React from 'react';
import "./grid.css"

const Cell = props => {
	// show one thing if the value is true
	if (props.value === 1) {
		return <div onClick={() => {
            // if (!props.running) 
            
                props.toggle(props.yCoord, props.xCoord);
            
        }}>ALIVE</div>;
		// show another if the value is false
	} else {
		return (
			<div
            className="cell"
				onClick={() => {
                    // if (!props.running) 
                    
						props.toggle(props.xCoord, props.yCoord);
					
				}}
			>
				DEAD
			</div>
		);
	}
};

export default Cell;
