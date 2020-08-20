import React, { useRef, useState, useEffect } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import moment from "moment";
import getPixel from "../utils/getPixel";
import setPixel from "../utils/setPixel";
import { drawGrid } from "../utils/drawGrid";
const AnimationTest = (props) => {
  const canvasRef = useRef(null);
  const { width, height } = props;
  console.log(props);
  const [stopAnimation, setStopAnimation] = useState(false);
  console.log(width);
  const draw = (context, canvas) => {
    let imageData = context.getImageData(0, 0, width, height);
    context.putImageData(imageData, 0, 0);
    drawGrid(context, { gridWidth: width, gridHeight: height }, canvas);

    // const pixelRGBA = getPixel(imageData, x, y);
    // console.log(pixelRGBA);
  };

  const doAnimation = (elapsedTime) => {
    const canvas = canvasRef.current; // refers to the ref attribute in render()
    const context = canvas.getContext("2d"); // etc.
    console.log("elapsed time:", elapsedTime);
    console.log(canvasRef.current);
    draw(context, canvas);
  };
  const [cancelAnimation] = useAnimationFrame(moment.now(), doAnimation);
  //  setStopAnimation(true);
  // window.addEventListener("click", function (event) {
  //   let x = event.pageX,
  //     y = event.pageY;
  //   cancelAnimation();

  //   console.log("you clicked the coords: ", x, y);
  // });
  /**
   * Render the canvas
   */
  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
};

export default AnimationTest;
