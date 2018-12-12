import React from "react";

const Rules = props => {
    return (
        <div className="gameRules">
            <h4>Rules</h4>
            <ul>
                <li>If a cell is alive and it has exactly 2 or 3 neighbors, it stays alive.</li>
                <li>If a cell is alive and it has less than 2 or more than 3 live neighbors, it dies.</li>
                <li>If a cell is dead and it has exactly 3 live neighbors, it comes to life.</li>
            </ul>
        </div>
    );
  };


export default Rules;