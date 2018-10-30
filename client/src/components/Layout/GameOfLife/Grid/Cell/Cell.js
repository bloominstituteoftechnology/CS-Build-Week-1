import React from "react";

export default class Cell extends React.Component {
  render() {
    return (
      <div
        style={{
          left: `${20 * this.props.x + 1}px`,
          top: `${20 * this.props.y + 1}px`,
          width: `${20 - 1}px`,
          height: `${20 - 1}px`,
          background: `#ccc`,
          position: `absolute`
        }}
      />
    );
  }
}
