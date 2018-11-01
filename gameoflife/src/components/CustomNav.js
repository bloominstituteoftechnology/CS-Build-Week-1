import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "./CustomNavbar.css";

class CustomNav extends Component {
  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Game of Life</Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1}>
              <Link to="/about">About</Link>
            </NavItem>
            <NavItem eventKey={2}>
              <Link to="/rules">Rules</Link>
            </NavItem>
          </Nav>
        </Navbar>
        ;
      </div>
    );
  }
}

export default CustomNav;
