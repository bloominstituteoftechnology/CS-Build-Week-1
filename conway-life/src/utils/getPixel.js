function getPixel(imageData, x, y) {
  const w = imageData.width; // Conveniently the width is here
  const h = imageData.height;

  if (x < 0 || x >= w || y < 0 || y >= h) {
    // Out of bounds
    return null;
  }

  // Compute index within the array
  const index = (w * y + x) * 4;

  // Return a copy of the R, G, B, and A elements
  return imageData.data.slice(index, index + 4);
}

export default getPixel;
