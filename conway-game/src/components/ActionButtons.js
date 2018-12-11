import React from "react";

class ActionButtons extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="action-buttons">
        <button className="start-button">Start</button>
        <button className="pause-button">Pause</button>
      </div>
    );
  }
}

export default ActionButtons; 
