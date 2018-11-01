import React from 'react';
import '../App.css';

const Square = 32;

class Cell extends React.Component {

    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{
                left: `${Square * x + 1}px`,
                top: `${Square * y + 1}px`,
                width: `${Square - 1}px`,
                height: `${Square - 1}px`,
            }} />
        );
    }
}

export default Cell;
