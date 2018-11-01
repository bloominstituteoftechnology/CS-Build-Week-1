import React from "react";
import { Container, Row } from "reactstrap";
import { Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import GameOfLife from "./GameOfLife/GameOfLife";
import About from "./About/About";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Container>
          <Row>
            <Route exact path="/" component={GameOfLife} />
            <Route path="/about" component={About} />
          </Row>
        </Container>
      </div>
    );
  }
}
