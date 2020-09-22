import React from 'react';
import '../scss/Controls.scss';

const Controls = props => {
    return (
        <div>
            <div className="button play">
                Play
            </div>
            <div className="button pause">
                Pause
            </div>
            <div className="button stop">
                Stop
            </div>
        </div>
    )
}

export default Controls;
