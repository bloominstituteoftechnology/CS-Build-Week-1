function setPixel(imageData, x, y, args) {
  const w = imageData.width; // Conveniently the width is here
  const h = imageData.height;

  if (x < 0 || x >= w || y < 0 || y >= h) {
    // Out of bounds
    return null;
  }
  let screenBuffer = imageData.data;

  // Compute index within the array
  const index = (w * y + x) * 4;
  console.log(args[0], " jriejrierjeirjeirjerij");
  screenBuffer[index + 0] = args[0]; // Red: 0xff == 255, full intensity
  screenBuffer[index + 1] = args[1]; // Green: zero intensity
  screenBuffer[index + 2] = args[2]; // Blue: zero intensity
  screenBuffer[index + 3] = args[3]; // Alpha: 0xff == 255, fully opaque
  // Return a copy of the R, G, B, and A elements
  return imageData;
}

export default setPixel;
