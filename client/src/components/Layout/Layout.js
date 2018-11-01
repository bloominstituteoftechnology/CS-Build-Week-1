import React from "react";
import { Container, Row } from "reactstrap";
import GameOfLife from "./GameOfLife/GameOfLife";

export default class Layout extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <h1>Conway's Game of Life</h1>
        </Row>
        <Row>
          <GameOfLife />
        </Row>
        <Row>
          <h2>About this Algorithm:</h2>
        </Row>
        <Row>
          <p>
            <strong>
              Show us that you researched this algorithm! Talk about the
              founder, Turing-completeness, etc.
            </strong>
          </p>
        </Row>
        <Row>
          <p>
            Lorem dolor in nostrud veniam aute aute. Aute Lorem elit ipsum
            officia mollit adipisicing non aute. Nostrud do anim ex in dolor.
            Nulla non voluptate ea sunt deserunt velit laborum commodo laborum
            commodo enim dolor est ad. Ad in ad irure incididunt.
          </p>
        </Row>
      </Container>
    );
  }
}
