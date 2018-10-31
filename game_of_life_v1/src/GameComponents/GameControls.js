import React, { Component } from 'react';

const GameControls = props => {
    return (
        <div>
            <h1>Game Controls Dashboard</h1>
            <form>
                <input 
                    type="number"
                    placeholder = "Grid width [cells]"
                    name = "gridwidth"
                />
            </form>
        </div>
    );
}

export default GameControls;