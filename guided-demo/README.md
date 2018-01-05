# Guided Demo: A Cyclic Cellular Automaton

_This version is skeletonized to build out during the demo. See the
solution branch for the full code._

We'll implement a [cyclic cellular
automaton](https://en.wikipedia.org/wiki/Cyclic_cellular_automaton) to
see complex behavior emerge from simple rules.

## Rules

A grid is initialized with values from 0-7, randomly.

On each pass, if a cell's neighbor is equal to that cell's value plus 1,
the cell takes on its neighbor's value. (The values wrap, so 7 + 1 is
0.)

That's it.

## Rendering

Each value should be mapped to a different color for display.

## Complex Emergent Behavior

You'll see strange, animated crystal patterns and swirls.
