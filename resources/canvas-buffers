# Screen Buffers, Canvas, and RGB


## The Screen Buffer

The *Screen Buffer* is a fancy way of saying "big array that holds pixel
information". Screen buffers hold their data in a variety of different
formats, but JavaScript's `<canvas>` element exposes them in a single,
one-dimensional array, where each set of 4 sequential elements
represents a Red, Green, Blue, and Alpha quad.

Each of the Red, Green, Blue, and Alpha values are one byte, with 0 (or
0x00 hex) representing "no intensity", and 255 (0xff) representing "full
intensity".

* *Alpha* is the transparency of a pixel. `0` is completely transparent. `255`
  is completely opaque. Images are usually completely `255` for every pixel's
  alpha channel.


## Getting the Pixel Data From A Canvas

If you have a reference to the canvas in JS, you can get the context and then
some image data that is the screen buffer:

```html
<canvas id="my-canvas"></canvas>
```

```javascript
let canvas = document.getElementById('my-canvas');
let ctx = canvas.getContext('2d');

let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Here is the screen buffer array we can manipulate:

let screenBuffer = imageData.data;
```

> The _context_ is the current drawing state of the canvas. It includes all the
> state variables (width of current drawing line, fill color, etc.) as well as
> the functions necessary to manipulate the canvas.

Once you have the screen buffer, you can examine or set values within it
as you see fit. Once that's done, you can display the changed screen
buffer in the canvas:

```javascript
ctx.putImageData(imageData, 0, 0);
```


## Manipulating Pixel Values In the Screen Buffer

It's a little weird because the screen buffer in this case is a 1D array, but
clearly the screen is a 2D thing. So how do we get the information to and from
the buffer?

In this buffer, the data is stored a rows at a time. The first row is first in
the array, and then the second row is right after that, and so on. That means
the start of the 3rd row is in position `3 × width` where `width` is the width
of the buffer in pixels.

Furthermore, since the rows are simply stored in their regular order, the `x`
coordinate can just be added on to that result. As such, to get the index in the
screen buffer array for coordinates `x`, `y`, you just need:

```javascript
// Generic non-canvas way of going to a 1D array index from 2D coordinates:

index = y * width + x;
```

With `canvas`, there's one small catch: we mentioned earlier that each
pixel is actually 4 array elements, not one, so we have to actually
multiply our result by 4:

```javascript
// HTML/JS <canvas> way of getting RGB values from screen buffer

let index = (y * width + x) * 4; // 4 elements per pixel

let red   = buffer[index + 0];
let green = buffer[index + 1];
let blue  = buffer[index + 2];
let alpha = buffer[index + 3];
```

You can also set them in the same way, and the call `putImageData()` to display the result:

```javascript
// Set the pixel at 10,20 to pure red and display on the canvas:

let buffer = imageData.data; // Obtained from getImageData()

let x = 10, y = 20;
let index = (y * width + x) * 4;

buffer[index + 0] = 0xff; // Red: 0xff == 255, full intensity
buffer[index + 1] = 0x00; // Green: zero intensity
buffer[index + 2] = 0x00; // Blue: zero intensity
buffer[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque

ctx.putImageData(imageData, 0, 0);
```

## References

* [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)


## Exercises

### Implement Function to Get Pixel Value

```javascript
/**
 * Get a pixel value from imageData
 *
 * @param imageData HTML canvas imagedata from getImageData()
 * @param x X coordinate to get pixels from
 * @param y Y coordinate to get pixels from
 * @return Array [R,G,B,A] for the pixel in question, or null if out of bounds
 */
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

// Example Usage

const canvas = document.querySelector('#my-canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

const pixelRGBA = getPixel(imageData, 10, 10);

console.log(pixelRGBA);
```

### Implement Function to Put (Set) Pixel Value

Implement the same as above, allowing the setting of an RGBA pixel.
