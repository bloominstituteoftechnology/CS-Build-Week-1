import React, { Component } from "react";
import CustomNav from "../CustomNav";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div>
        <CustomNav />
        <h1>About</h1>
        <div class="container">
          <p>
            The goal of our project is to design a visualization of the Game of
            Life as described by John Horton Conway.1 The Game of Life was meant
            to show what happens to organisms when they are placed in close
            proximity to each other. Upon giving the Game initial conditions,
            each successive ‘generation’ (iteration) shows the evolution of the
            organisms. The Game is represented on a grid of squares with colored
            squares denoting a living organism.{" "}
          </p>
          <br />
          <p>
            Motivated by questions in mathematical logic and in part by work on
            simulation games by Ulam, among others, John Conway began doing
            experiments in 1968 with a variety of different 2D cellular
            automaton rules.[3] Conway's initial goal was to define an
            interesting and unpredictable cell automaton. Thus, he wanted some
            configurations to last for a long time before dying, other
            configurations to go on forever without allowing cycles, etc. It was
            a significant challenge and an open problem for years before experts
            on cell automatons managed to prove that, indeed, Conway's Game of
            Life admitted of a configuration which was alive in the sense of
            satisfying Von Neumann's two general requirements. While the
            definitions before Conway's Life were proof-oriented, Conway's
            construction aimed at simplicity without a priori providing proof
            the automaton was alive.
          </p>
        </div>
      </div>
    );
  }
}

export default About;
