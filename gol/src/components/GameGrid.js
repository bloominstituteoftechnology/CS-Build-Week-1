import React, { Component } from "react";

export default class GameGrid extends Component {
  render() {
    return (
      <div style={{ gridTemplateColumns: `repeat(${this.props.x}, 1fr)`,
        gridTemplateRows: `repeat(${this.props.y}, 1fr)`}} className="screen">
        {this.props.pixels.map((e, i) => {
          return (
            <div key={i} id={i} className='pixel' style={  {backgroundColor: e.color}
            }>
            </div>
          );
        })}
      </div>
    );
  }
}
