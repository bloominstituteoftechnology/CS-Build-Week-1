import React from "react";
import { Container, Row, Col } from "reactstrap";
import GameOfLife from "./GameOfLife/GameOfLife";

export default class Layout extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <h1>Conway's Game of Life</h1>
        </Row>
        <Row>
          <Col m="6">
            <h2>Generation: #</h2>
            <GameOfLife />
            <button>Play</button>
            <button>Pause</button>
            <button>Stop</button>
          </Col>
          <Col m="3">
            <Row>
              X <button>Preset 1</button>
            </Row>
            <Row>
              X <button>Preset 2</button>
            </Row>
            <Row>
              X <button>Preset 3</button>
            </Row>
            <Row>
              X <button>Preset 4</button>
            </Row>
          </Col>
          <Col m="3">
            <h2>Rules:</h2>
            <ul>
              <li>
                Fugiat voluptate do deserunt minim et ut non ex esse voluptate.
              </li>
              <li>Elit culpa esse id irure anim veniam sint.</li>
              <li>Qui mollit sit laboris duis.</li>
              <li>
                Voluptate nulla Lorem do eiusmod consequat nisi voluptate
                ullamco voluptate duis dolore esse.
              </li>
              <li>
                In et ex id dolore do quis sunt aute duis cupidatat enim mollit
                dolore aliquip.
              </li>
              <li>
                Tempor ad fugiat cupidatat aute nulla in est deserunt culpa.
              </li>
              <li>
                Tempor esse qui eu laboris ad non fugiat consequat ipsum mollit
                in.
              </li>
              <li>
                Amet mollit dolore sint commodo aute voluptate incididunt ex
                elit ut.
              </li>
              <li>Veniam amet eu non proident minim dolore.</li>
            </ul>
          </Col>
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
