import React from "react";
import styled from "styled-components";
//import Kanye from '../../assets/kanye.png'

/*  <GridBox
background={this.props.isLiving ? `url(${Background})` : "white"}
onClick={() => this.props.toggleCellLife(this.state.id)}
/>
*/

const GridBox = styled.span(props => ({
  minHeight: "24px",
  minWidth: "24px",
  border: ".5px solid #eee",
  background: props.background
}));
const GridBoxSmall = styled.span(props => ({
  minHeight: "14px",
  minWidth: "14px",
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
        {this.props.viewportWidth > 610 ? (
          <GridBox
            background={this.props.isLiving ? `black` : "white"}
            onClick={() => this.props.toggleCellLife(this.state.id)}
          />
        ) : (
          <GridBoxSmall
            background={this.props.isLiving ? `black` : "white"}
            onClick={() => this.props.toggleCellLife(this.state.id)}
          />
        )}
      </>
    );
  }
}

export default Cell;
