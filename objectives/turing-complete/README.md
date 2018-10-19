# Cellular Automata and The Game of Life


## Turing Completeness

We say a computing system is [_Turing
Complete_](https://en.wikipedia.org/wiki/Turing_completeness) if it is capable
of performing arbitrary, general purpose computation.

Using a construct in The Game of Life called a [glider
gun](https://en.wikipedia.org/wiki/Gun_(cellular_automaton)), it's possible to
build a rudimentary [NAND gate](https://en.wikipedia.org/wiki/NAND_gate) in the
Game of Life. While a NAND gate by itself isn't enough to be Turing Complete,
the "infinite" grid of The Game of Life allows you to use them (or any other
[functionally complete](https://en.wikipedia.org/wiki/Functional_completeness)
operator) to build any other type of logical "circuitry" and
[memory](https://en.wikipedia.org/wiki/Flip-flop_(electronics)), as well.

Anything computable can be computed in The Game of Life given a large enough
grid and enough time. Most people, however, find JavaScript to be a far easier
development medium.
