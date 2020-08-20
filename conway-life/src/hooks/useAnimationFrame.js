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
      setStarted(true);
      requestAnimationFrame(onFrame);
    }
  }, [started]);

  // Request the first animation frame to kick things off
  const onFrame = (timestamp) => {
    // if we want to do more ask for the next frame
    if (continueAnimation) {
      requestAnimationFrame(onFrame);
    }
    const elapsed = prevTimeStamp - timestamp;
    setTimeStamp(timestamp);
    console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);
    setTimeout(function () {}, 17);

    //call callback and pass it the elapsed time
    doAnimationCallBack(elapsed);
  };

  // this wills stop the hook from calling the next animation frame
  const cancelAnimation = () => {
    setContinueAnimation(false);
    console.log("we're in here somehow");
  };
  return cancelAnimation;
};
