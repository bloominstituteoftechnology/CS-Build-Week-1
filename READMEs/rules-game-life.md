# Cellular Automata and The Game of Life


## The Game of Life

A very famous cellular automaton is John Conway's [Game of
Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
app. This game is a class of discrete model known as a *[Cellular
Automaton](https://en.wikipedia.org/wiki/Cellular_automaton)*, abbreviated *CA*.

It's made up of a grid of cells (usually 2D, but can be any dimension)
that follow a simple set of rules from which complex behaviors can
emerge.

![running simulation](https://media.giphy.com/media/9x32yQPmZg9glAvbIb/giphy.gif)

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

Note: cells that are off the edge of the grid are typically assumed to
be dead. (In other cases, people sometimes code it up to wrap around to
the far side.)


### Explore The Game of Life

* [Edwin Martin's Implementation](https://bitstorm.org/gameoflife/): run the
  simulation to see what the Game looks like.
* [Patterns that can be used for testing](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns)
* [Glider pattern](https://en.wikipedia.org/wiki/Glider_(Conway%27s_Life)) to
  the grid at a random location.
* [Gosper Glider Gun pattern](https://en.wikipedia.org/wiki/Gun_(cellular_automaton)) to the
  grid at a random location.


### References

* [John Conway's Game of
Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
* [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
