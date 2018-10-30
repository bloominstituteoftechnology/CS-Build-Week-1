import React from 'react';
import '../App.css';

const WIDTH = 800;
const HEIGHT = 600;

class Grid extends React.Component {

    render() {

        return (
            <div>
                <div className="grid"
                    style={{ width: WIDTH, height: HEIGHT, }}>
                </div>
                <div className="controls">

                    <button className="button1">Play/Pause</button>
                    <button className="button">Stop</button>

                    <button className="button">Randomized</button>
                    <button className="button">Clear</button>
                </div>

           </div>
        );
    }
}


export default Grid;


