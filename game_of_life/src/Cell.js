import React, { Component } from "react";
import styled from "styled-components";
import "./Cell.css";

const Cell_Container = styled.div`
  display: flex;
  flex: 1;
  padding: 5px;
  margin: 1px;
  border: 1px solid black;
`;

class Cell extends Component {
  render() {
    return <Cell_Container onClick={() => this.props.initialCell(this.props.status)} className={this.props.live ? "cellLive" : "cellDead"} />;
  }
}
export default Cell;
