import React from "react";

class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="action-buttons">
        <button onClick = {this.props.start} className="start-button">Start</button>
        <button onClick = {this.props.pause} className="pause-button">Pause</button>
      </div>
    );
  }
}

export default ActionButtons; 
