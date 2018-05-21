const RulesOfLife = (currentBuffer) => {
  let nextBuffer = currentBuffer;

  const genNum = (limit) => {
    return Math.floor(Math.random() * limit);
  };

  // for (let row = 0; row < nextBuffer.height; row++) {
  //   for (let col = 0; col < nextBuffer.width; col++) {
  //     let index = (row * nextBuffer.width + col) * 4;

  //     if (genNum(100) === 1) {
  //       nextBuffer.data[index] = genNum(255);
  //       nextBuffer.data[index + 1] = genNum(255);
  //       nextBuffer.data[index + 2] = genNum(255);
  //       nextBuffer.data[index + 3] = 255;
  //     }
  //   }
  // }

  // Probabilistic Color Gen
  let pixel = 0;
  let l = nextBuffer.data.length - 4;
  while (pixel <= l) {
  if (genNum(1000) === 1) {
    nextBuffer.data[pixel] = 255;
    nextBuffer.data[pixel + 1] = 0;
    nextBuffer.data[pixel + 2] = 0;
    nextBuffer.data[pixel + 3] = 255;
    pixel += 4;
  }
  if (genNum(1000) === 2) {
    nextBuffer.data[pixel] = 255;
    nextBuffer.data[pixel + 1] = 0;
    nextBuffer.data[pixel + 2] = 255;
    nextBuffer.data[pixel + 3] = 255;
    pixel += 4;
  }
  if (genNum(100) === 3) {
    nextBuffer.data[pixel] = 0;
    nextBuffer.data[pixel + 1] = 0;
    nextBuffer.data[pixel + 2] = 0;
    nextBuffer.data[pixel + 3] = 255;
    pixel += 4;
  }
  pixel += 4;
  }

  return nextBuffer;
};

export default RulesOfLife;
