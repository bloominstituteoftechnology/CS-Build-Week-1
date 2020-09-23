import React, { useState, useEffect } from 'react';


const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const Cells = (x, y) => {
    
    return (
        
        <div id='Cell' className='Cell-light' style={{
            left: `${CELL_SIZE * x + 1}px`,
            top: `${CELL_SIZE * y + 1}px`,
            width: `${CELL_SIZE - 1}px`,
            height: `${CELL_SIZE - 1}px`,
        }} />
    );

}



export default Cells;