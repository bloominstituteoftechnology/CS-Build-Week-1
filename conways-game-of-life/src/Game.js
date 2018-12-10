import React from 'react';
import './Game.css';


const game_cell = 25;
const game_width = 850;
const game_height = 650;

class Game extends React.Component {
    render() {
        return (
            <div>
                <div className="graphBoard"
                    style={{ width: game_width, height: game_height, backgroundSize: `${game_cell}px ${game_cell}px` }}>
                </div>
            </div>

        );
    }
}

export default Game;