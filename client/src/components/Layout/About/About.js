import React, { Component } from "react";
import { Row } from "reactstrap";

class About extends Component {
  render() {
    return (
      <div>
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
            A very famous cellular automaton is John Conway's Game of Life. app.
            This game is a class of discrete model known as a Cellular
            Automaton, abbreviated CA.
          </p>
          <p>
            It's made up of a grid of cells (usually 2D, but can be any
            dimension) that follow a simple set of rules from which complex
            behaviors can emerge.
          </p>
        </Row>
      </div>
    );
  }
}

export default About;
