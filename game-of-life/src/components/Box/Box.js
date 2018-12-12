import React from "react";

class Box extends React.Component {
  selectBox = () => {
    this.props.selectBox(this.props.rows, this.props.col);
  };

  render() {
    return (
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

export default Box;
