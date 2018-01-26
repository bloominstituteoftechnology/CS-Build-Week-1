/**
 * Puts a pixel to some image data
 *
 * @param rgba Array of RGBA values [r, g, b, a]
 */
function putPixel(imageData, x, y, a) {
  // TO DO
}

function getPixel(imageData, x, y) {
  let width = imageData.width;
  let height = imageData.height;

  // Range check
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return null;
  }

  let index = (y * width + x) * 4;

  let rgba = imageData.data.slice(index, index + 4);

  return rgba;
}

// Example Usage of getPixel
const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const pixelRGBA = getPixel(imageData, 10, 10);

console.log(pixelRGBA);
/*
function onLoad() {
  let canvas = document.querySelector('#my-canvas');
  let ctx = canvas.getContext('2d');

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 10; i++) {
    let x = i;
    let y = i;

    let index = (y * imageData.width + x) * 4;

    imageData.data[index + 0] = 0x00; // red
    imageData.data[index + 1] = 0x00; // green
    imageData.data[index + 2] = 0x00; // blue
    imageData.data[index + 3] = 0xff; // alpha, 0xff = 255 = opaque
  }
  ctx.putImageData(imageData, 0, 0);
}
*/

window.addEventListener('load', onLoad);
