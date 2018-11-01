# Implementation of The Game of Life using a Canvas

* Using React, implement a `LifeCanvas` component with a `canvas` element.

* Implement a `Life` class that plays the Game of Life on a grid of a given
  size. This shouldn't be a screen buffer, since we want to keep the data in the
  game (the Model) separate from it's display (the View). It can just be a
  regular array. (Later the data in the game will be copied to the screen buffer
  in the canvas.)

  This class should have methods to randomize the grid, to clear the grid (each
  element can be alive or dead), and to run a single generation step.

  Remember to use double buffering within this class to keep the next generation
  separate from the current generation while you're doing the computation.

  An instance of this class can be created when needed in the `LifeCanvas`
  component.

  ```javascript  
  // Create a new Life player of size 300x300 elements

  this.life = new Life(300, 300);
  ```
  
* Using
  [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame),
  set up a routine to:
  
  * Step the `Life` simulation a single generation.

  * Get the data for the current generation from the `Life` class.

  * Convert that data into the `canvas` data buffer and display the result.

  * Call `requestAnimationFrame()` again to continue the simulation.
