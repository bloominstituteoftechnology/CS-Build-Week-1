import React, { Component } from 'react';
// import './.css';

class Buttons extends Component {
    
    
   
    render() {
      return (
        <div className="center">
        <div>
            <button onClick={this.props.handlePlayBtn}>
            Play
            </button>
            <button onClick={this.props.handlePauseBtn}>
            Pause
            </button>
            <button onClick={this.props.random}>
            Random
            </button>
            <button onClick={this.props.handleClearBtn}>
            Clear
            </button>
        </div>

        </div>
         
        
      );
      }
  };

  export default Buttons;