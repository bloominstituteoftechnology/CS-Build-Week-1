import React from 'react';

const Rulemodal = (props) => {
  return (
    <div id="ruleModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={props.handleRuleClose}>&times;</span>
        <h1 className='title'>Game of life Rules:</h1>
        <ol>
          <li>1. Any LIVE cell with fewer than two live neighbors dies, as if by underpopulation.</li>
          <li>2. Any LIVE cell with two or three live neighbors lives on to the next generation.</li>
          <li>3. Any LIVE cell with more than three live neighbors dies, as if by overpopulation.</li>
          <li>4. Any DEAD cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
        </ol>
        <h1 className='title'>Controls:</h1>
        <p>Choose a figure from the templates below or make your own by click on a cell. The start/stop button 
          advances the cells generation(based off an iteration of the rules). Game speed can be controlled from 
          the buttons in the panel below.
        </p>
      </div>
    </div>
  );
}
 
export default Rulemodal;