import React, { useEffect, useState } from "react";

// custom hook for using animation frame
export const useAnimationFrame = (timestamp, doAnimationCallBack) => {
  // set the prev time stamp
  const [prevTimeStamp, setTimeStamp] = useState(timestamp - 30);
  const [continueAnimation, setContinueAnimation] = useState(false);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    // only start the animation frame if we haven't in the past
    if (!started) {
      // setStarted(true);
      requestAnimationFrame(doAnimationCallBack);
    }
  }, [started]);
  useEffect(() => {
    if (continueAnimation === true) {
      setTimeout(() => {
        requestAnimationFrame(doAnimationCallBack);
      }, 0);
    }
  });

  const cancelAnimation = (bool) => {
    setContinueAnimation(!bool);
    console.log("we're in here setting stopper to: ", bool);
  };
  return cancelAnimation;
};
