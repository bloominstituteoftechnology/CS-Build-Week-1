import React, { Component } from "react";
import styled from "styled-components";

class Rules extends Component {
  render() {
    const Alive = styled.strong`
      -webkit-text-stroke: 1px black;
      color: ${this.props.alive};
    `;
    const Dead = styled.strong`
      -webkit-text-stroke: 1px black;
      color: ${this.props.dead};
    `;
    return (
      <div>
        <h2>Rules:</h2>
        <ul>
          <li>
            If a cell is <Alive>alive</Alive> and it has exactly 2 or 3 live
            neighbors, it <Alive>stays alive.</Alive>
          </li>
          <li>
            If a cell is <Alive>alive</Alive> and it has less than 2 or 4+ live
            neighbors, it <Dead>dies</Dead>
          </li>
          <li>
            If a cell is <Dead>dead</Dead> and it has exactly 3 live neighbors,
            it <Alive>comes to life.</Alive>
          </li>
        </ul>
      </div>
    );
  }
}

export default Rules;
