import React from 'react';
import './Game.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Game extends React.Component {
    render() {
        return (
            <div>
                <div className="Game"
                    style={{ width: WIDTH, height: HEIGHT,
                    backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px` }}>
                </div>
                <div className="Controls">
                    <p>start</p>
                    <p>stop</p>
                    <p>step</p>
                    <p>clear</p>
                </div>
                <div className="Presets">
                    <p>preset 1</p>
                    <p>preset 2</p>
                    <p>preset 3</p>
                </div>

            </div>
        );
    }
}
export default Game;