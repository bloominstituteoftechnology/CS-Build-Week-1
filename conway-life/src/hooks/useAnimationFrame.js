import { useEffect, useState } from "react";

// custom hook for using animation frame
export const useAnimationFrame = (timestamp, doAnimationCallBack, msDelay) => {
  // set the prev time stamp
  // const [prevTimeStamp, setTimeStamp] = useState(timestamp - 30);
  const [continueAnimation, setContinueAnimation] = useState(false);

  useEffect(() => {
    if (continueAnimation === true) {
      setTimeout(() => {
        requestAnimationFrame(doAnimationCallBack);
      }, msDelay);
    }
  });

  const cancelAnimation = (bool) => {
    setContinueAnimation(!bool);
    console.log("we're in here setting stopper to: ", bool);
  };
  return cancelAnimation;
};
