# Cellular Automata and The Game of Life


## Double Buffering

There's a technique that's commonly used in graphics programming called
*double buffering*. This is when we display one buffer to the user, but
do work on one that's hidden from sight. In this way, the user doesn't
see the buffer being generated, they only see the one that was
previously completed.

When we're done doing work on the hidden buffer, we *page flip* and show
the hidden buffer to the user. Then the previously-displayed buffer
becomes the new hidden buffer, and work begins again.

There are multiple benefits to this approach.

One is that the user doesn't see the work being progressively completed. From
their perspective, the work is suddenly done as soon as the page flips.

Another is that the program can use the previous buffer (i.e. the one that is
currently being displayed) as a source for material to perform calculations to
produce the next buffer. This is particularly beneficial where you need to
produce a completely new output based on the complete previous output. If you
were to only use a single buffer, you'd have to overwrite the pixels as you
went, and this might affect the outcome of the subsequent pixels in an
undesirable way.

And this is very useful when implementing a cellular automaton.

There will be two arrays of data for the automaton. One of them holds the data
that the user currently sees on the canvas. The other one is where the _next_
frame to be shown is being actively constructed.

After the new frame is constructed, the next from becomes the current frame, and
the current frame becomes the next frame. And the process repeats.

Also note that this approach is vaguely reminiscent of the Model and View in the
MVC pattern where the Model is manipulated then displayed by the View.
