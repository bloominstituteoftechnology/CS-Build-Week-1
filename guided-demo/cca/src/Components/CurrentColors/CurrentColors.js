import React from 'react';
import COLORS from '../../Utilities/Colors';
import './current-colors.css';

const CurrentColors = () => {
  return (
    <div>
      <h1>Current Colors</h1>
      <div className="colors-container">
        <div style={{ color: 'white', backgroundColor: `rgb(${COLORS[0][0]},${COLORS[0][1]},${COLORS[0][2]})` }}>1</div>
        <div style={{ backgroundColor: `rgb(${COLORS[1][0]},${COLORS[1][1]},${COLORS[1][2]})` }}>2</div>
        <div style={{ backgroundColor: `rgb(${COLORS[2][0]},${COLORS[2][1]},${COLORS[2][2]})` }}>3</div>
        <div style={{ backgroundColor: `rgb(${COLORS[3][0]},${COLORS[3][1]},${COLORS[3][2]})` }}>4</div>
        <div style={{ backgroundColor: `rgb(${COLORS[4][0]},${COLORS[4][1]},${COLORS[4][2]})` }}>5</div>
        <div style={{ backgroundColor: `rgb(${COLORS[5][0]},${COLORS[5][1]},${COLORS[5][2]})` }}>6</div>
        <div style={{ backgroundColor: `rgb(${COLORS[6][0]},${COLORS[6][1]},${COLORS[6][2]})` }}>7</div>
        <div style={{ backgroundColor: `rgb(${COLORS[7][0]},${COLORS[7][1]},${COLORS[7][2]})` }}>8</div>
      </div>
    </div>
  );
};

export default CurrentColors;
