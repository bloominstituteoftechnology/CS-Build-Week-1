import React from 'react';
import './App.css';

class Cell extends React.Component {
    render() {
      return (
        <div className="Cell" style={{
          left: `${20 * this.props.x + 1}px`,
          top: `${20 * this.props.y + 1}px`,
          width: '19px',
          height: '19px',
        }} />
      );
    }
  }

export default Cell;