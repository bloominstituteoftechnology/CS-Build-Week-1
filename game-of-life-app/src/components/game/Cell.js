import React from "react";
import styled from "styled-components";

const GridBox = styled.span(props => ({
  minHeight: "20px",
  minWidth: "20px",
  border: ".5px solid #eee",
  background: props.background
}));

class Cell extends React.Component {
  state = {
    isLiving: this.props.isLiving,
    id: this.props.id
  };
  render() {
    return (
      <>
        <GridBox
          background={this.props.isLiving ? "black" : "white"}
          onClick={() => this.props.toggleCellLife(this.state.id)}
        />
      </>
    );
  }
}

export default Cell;
