import React, { Component } from "react";
import styled from "styled-components";
import { colors } from "../utils/variables";
const CanvasContainer = styled.div`
  width: 100%;
  background: ${colors.grey};
  &::after {
    content: "";
    display: block;
    padding-bottom: 60%;
  }
`;
class Canvas extends Component {
  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.continueAnimation = true;
  }

  /**
   * After the component has mounted
   */
  componentDidMount() {
    // Request initial animation frame
    requestAnimationFrame(timestamp => {
      this.onAnimFrame(timestamp);
    });
  }

  /**
   * When the component is about to unmount
   */
  componentWillUnmount() {
    // Stop animating
    this.continueAnimation = false;
  }

  /**
   * Called every frame of animation
   */
  onAnimFrame(timestamp) {
    // If desired, request another anim frame for later
    if (this.continueAnimation) {
      requestAnimationFrame(timestamp => {
        this.onAnimFrame(timestamp);
      });
    }

    // TODO animate stuff
  }

  /**
   * Render the canvas
   */
  render() {
    return (
      <CanvasContainer>
        <canvas width="100%" height="100%" ref="canvas" />
      </CanvasContainer>
    );
  }
}

export default Canvas;
