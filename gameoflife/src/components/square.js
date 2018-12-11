import React, { Component } from "react";

class Square extends Component {
  state = {
    square: false
  };
  render() {
    return <div className="square" />;
  }
}

export default Square;
