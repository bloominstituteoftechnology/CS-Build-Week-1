# Cellular Automata and Screen Buffers


## Audience and Purpose

Audience: ReactJS developers, CS students.

* Learn about Cellular Automata
* Learn how to do in-browser animation with ReactJS
* Learn how screen buffers encode RGB information
* Learn about double buffering


## The Game of Life



We will implement John Conway's [Game of
Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) in a React
app. This game is a class of discrete model known as a *[Cellular
Automaton](https://en.wikipedia.org/wiki/Cellular_automaton)*, abbreviated *CA*.

It's made up of a grid of cells (usually 2D, but can be any dimension)
that follow a simple set of rules from which complex behaviors can
emerge.

In the grid, below, white pixels are alive, and black pixels are dead.

![Conway's Life, many generations in](img/life.png)

In the Game of Life, these rules examine each cell of the grid. For each
cell, it counts that cell's eight neighbors (up, down, left, right, and
diagonals), and then act on that result.

* If the cell is alive **and** has 2 or 3 neighbors, then it remains
  alive. Else it dies.
* If the cell is dead **and** has exactly 3 neighbors, then it comes to
  life. Else if remains dead.

From those two rules, many types of "creatures" can be created that
[move around the
"landscape"](https://www.youtube.com/watch?v=28vxPvTDh4E).

Practically speaking, CAs have been used in biological and chemical
simulation and other areas of research, such as CA-based computer
processors, and other numeric techniques.

Note: cells that are off the edge of the grid are typically assumed to
be dead. (In other cases, people sometimes code it up to wrap around to
the far side.)


## Double Buffering

There's a technique that's commonly used in graphics programming called
*double buffering*. This is when we display one buffer to the user, but
do work on one that's hidden from sight. In this way, the user doesn't
see the buffer being generated, they only see the one that was
previously completed.

When we're done doing work on the hidden buffer, we *page flip* and show
the hidden buffer to the user. Then the previously-displayed buffer
becomes the new hidden buffer, and work begins again.

In this case, we can use a similar technique when we're computing our
cells in the Game of Life. We look at the current cells when computing
how many neighbors a cell has, and then we draw the results to our
second buffer. (In Life, we can't change the data on the grid as we loop
though or else it will munge the data as we go. We draw the data to a
new grid to keep the original intact, then the new grid becomes the
current grid, and we start the work again.


## The Screen Buffer

The *Screen Buffer* is a fancy way of saying "big array that holds pixel
information". Screen buffers hold their data in a variety of different
formats, but JavaScript's `<canvas>` element exposes them in a single,
one-dimensional array, where each set of 4 sequential elements
represents a Red, Green, Blue, and Alpha quad.

* *Alpha* is the transparency of a pixel.

Each of the Red, Green, Blue, and Alpha values are one byte, with 0 (or
0x00 hex) representing "no intensity", and 255 (0xff) representing "full
intensity".


## Getting the Pixel Data From A Canvas

If you have a reference to the canvas in JS, you can get the context and then some image data that is the screen buffer:

    let canvas = document.getElementById('my-canvas');
	let ctx = canvas.getContext('2d');

	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Here is the screen buffer array we can manipulate:

	let screenBuffer = imageData.data;

Once you have the screen buffer, you can examine or set values within it
as you see fit. Once that's done, you can display the changed screen
buffer in the canvas:

    ctx.putImageData(imageData, 0, 0);


## Manipulating Pixel Values In the Screen Buffer

It's a little weird because the screen buffer in this case is a 1D
array, but clearly the screen is a 2D thing. So how do we get the
information to and from the buffer?

In this buffer, the data is stored a rows at a time. The first row is
first in the array, and then the second row is right after that, and so
on. That means the start of the third row is in position `3 × width`
where `width` is the width of the buffer in pixels.

Furthermore, since the rows are simply stored in their regular order,
the `x` coordinate can just be added on to that result. As such, to get
the index in the screen buffer array for coordinates `x`,`y`, you just
need:

    // Generic way of going to a 1D array index from 2D coordinates:

    let index = y * width + x;

With `canvas`, there's one small catch: we mentioned earlier that each
pixel is actually 4 array elements, not one, so we have to actually
multiply our result by 4:

    // HTML/JS <canvas> way of getting RGB values from screen buffer

	let index = (y * width + x) * 4; // 4 elements per pixel

	let red   = buffer[index + 0];
	let green = buffer[index + 1];
	let blue  = buffer[index + 2];
	let alpha = buffer[index + 3];

You can also set them in the same way, and the call `putImageData()` to display the result:

    // Set the pixel at 10,20 to pure red and display on the canvas:

    let buffer = imageData.data;

    let x = 10, y = 20;
	let index = (y * width + x) * 4;

	buffer[index + 0] = 0xff; // Red: 0xff == 255, full intensity
	buffer[index + 1] = 0x00; // Green: zero intensity
	buffer[index + 2] = 0x00; // Blue: zero intensity
	buffer[index + 3] = 0xff; // Alpha: 0xff == 255, fully opaque

	ctx.putImageData(imageData, 0, 0);


## References

* [John Conway's Game of
Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
* [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
* [Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
* [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)


## Assignment

Mini-Sprint:

* Implement a React app that animates a pixel moving across a canvas.
  The pixel should be set by manipulating the array returned from
  `getImageData()`, and passing that data to `putImageData()`.

  Other code that might be useful: https://github.com/beejjorgensen/react-canvas-anim

Sprint:


* Implement a class that plays the Game of Life in an array. This
  shouldn't be a screen buffer, since we want to keep the data in the
  game (the Model) separate from it's display (the View).

  This class should have methods to randomize the grid, to clear the
  grid (each element can be alive or dead), and to run a single
  generation step.

  Remember to use double buffering to keep the next generation separate
  from the current generation while you're doing the computation.

* Use the mini-sprint React app and instantiate a class of Life, and use
  the data from it to fill a canvas screen buffer. The tell the life
  class to go to the next generation. And repeat. This app can use
  [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
  to drive the process.

Extra credit:

* Add a button to allow the user to stop or start the animation.

* Add a button to randomize the grid.

* Add a button to clear the grid.

* Add a button that adds a
  [glider](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)) to
  the grid at a random location.

* Add a button that adds a [Gosper Glider
  Gun](https://en.wikipedia.org/wiki/Gun_(cellular_automaton)) to the
  grid at a random location.
