import React from "react";

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  onClickHandler = event => {
    this.setState({
      active: !this.state.active
    });
  };

  render() {
    return (
      <div
        onClick={this.onClickHandler}
        key={this.props.id}
        className={`box ${this.state.active ? "on" : "off"}`}
      />
    );
  }
}

export default Box;
