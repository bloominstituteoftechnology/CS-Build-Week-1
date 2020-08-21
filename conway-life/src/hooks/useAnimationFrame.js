import React, { useEffect, useState } from "react";

// custom hook for using animation frame
export const useAnimationFrame = (timestamp, doAnimationCallBack) => {
  // set the prev time stamp
  const [prevTimeStamp, setTimeStamp] = useState(timestamp - 30);
  const [continueAnimation, setContinueAnimation] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // only start the animation frame if we haven't in the past
    if (!started) {
      setStarted(true);
      requestAnimationFrame(onFrame);
    }
  }, [started]);

  // Request the first animation frame to kick things off
  const onFrame = (timestamp) => {
    // if we want to do more ask for the next frame

    setTimeout(function () {
      if (continueAnimation) {
        requestAnimationFrame(onFrame);
      }
      console.log("somehow continueanimation is ", continueAnimation);
      const elapsed = prevTimeStamp - timestamp;
      setTimeStamp(timestamp);
      console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);
      //call callback and pass it the elapsed time
      doAnimationCallBack(elapsed);
    }, 1000);
  };

  // this will stop the hook from calling the next animation frame
  const cancelAnimation = () => {
    setContinueAnimation(false);
  };
  const resumeAnimation = () => {
    setContinueAnimation(true);
  };
  useEffect(() => {
    // monitor remounts for debugging
    console.log("REMOUNT TRIGGERED");
  });
  return [cancelAnimation, resumeAnimation];
};
