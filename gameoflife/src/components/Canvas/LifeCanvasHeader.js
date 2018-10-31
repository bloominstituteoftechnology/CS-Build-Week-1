import React from 'react';

const LifeCanvasHeader = () => {
    return (
        <header className='canvas-header'>
            <div className='canvas-header-links'>
                <a className='canvas-header-rules' href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Rules</a>
                <a className='canvas-header-about' href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">About</a>
            </div>
        </header >
    );
}

export default LifeCanvasHeader;