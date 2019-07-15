# Cellular Automata and The Game of Life


## Cellular Automata

A _cellular automaton_ (plural: cellular automata, abbreviated _CA_) is a
program that operates on data typically stored in a 2D grid. (1D, 3D and _n_-D
cellular automata run on lines, cubes, etc.)

A simple set of rules describes how the value in a cell on the grid changes over
time, often as the result of the states of that cell's neighbors.

> Sometimes neighbors includes the 4 orthogonally adjacent cells; sometimes it
> includes all 8 surrounding cells including diagonals.

Each round of the simulation examines the current state of the grid, and then
produces an entirely new grid consisting of the old state. (Remember the
discussion about double buffers earlier--we don't want to modify the same grid
we're examining, lest we munge future results.)

This new grid becomes the "current" state of the simulation, and the process
repeats. Each new grid is referred to as a _generation_.

The beautiful thing about cellular automata is that sometimes very complex
behavior can emerge from very simple rules.

Practically speaking, CAs have been used in biological and chemical simulations
and other areas of research, such as CA-based computer processors, and other
numeric techniques.
