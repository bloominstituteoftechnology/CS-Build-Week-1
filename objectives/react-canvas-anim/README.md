# Screen Buffers, Canvas, and RGB

## Objectives

* Learn about double buffering and why they are useful
* Learn to integrate double-buffer animation into a React canvas app
* Implement a React canvas app with animated canvas
* Animate a pixel across the screen

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

Also note that this approach is vaguely reminiscent of the Model and View in the
MVC pattern where the Model is manipulated then displayed by the View.

## React and Animated Canvases

How do you animate a React component?

We know the component has a lifecycle and a `render()` method and it gets
created when it is rendered or the state changes.

But what if we want to update the component several times per second?

### `requestAnimationFrame()`

There's a way in Javascript to get "frame-by-frame" callbacks. That is, once per
"frame", however long that is, you'll get a callback. It'll probably be ~30
times per second. This makes it very suitable for doing animations, as the name
suggests.

For every one time you call `requestAnimationFrame()`, your given callback will
be called. It's really common for the callback to call `requestAnimationFrame()`
to get another frame as soon as possible.

```javascript
let prevTimestamp = null;

function onAnimFrame(timestamp) {

    // Request another animation frame for the future
    requestAnimationFrame(onAnimFrame);

    // If we haven't yet stored the previous time, fake it
    if (prevTimestamp === null) {
        prevTimestamp = timestamp - 30; // milliseconds
    }

    // Compute how long it took between frames
    const elapsed = timestamp - prevTimestamp

    // Remember this for next frame
    prevTimestamp = timestamp;

    console.log(`Current time: ${timestamp} ms, frame time: ${elapsed} ms`);

    // TODO: Do animation stuff to the canvas
}

// Request the first animation frame to kick things off
requestAnimationFrame(onAnimFrame);
```

We'll be using this to change the contents in the canvas within the React
component.


### Canvas in the React Component

Having a canvas in a react component is pretty easy:

```javascript
class MyComponent extends Component {

    // ...

    /**
     * Render the canvas
     */
    render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    }

    // ...
}
```

What's that weird `ref="canvas"` bit?

Turns out we can use that later in JS code to get a reference to the canvas that
was rendered. This will be very useful when we actually want to draw on it.


### Canvas in React with `requestAnimFrame()`

How do we merge these two things together to get animation?

We need to call `requestAnimationFrame()` one time to kick off the process, and
then we need to call it from our callback if we're still showing the component.

Fortunately, in the [React component
lifecycle](https://reactjs.org/docs/react-component.html), there are a couple
handlers we can make use of to control the process.

We'll request an initial animation frame in the `componentDidMount()` handler,
and we'll stop animating in the `componentWillUnmount()` handler.

All `componentDidMount()` needs to do is call `requestAnimationFrame()`. But
since the decision to keep animating or not is made in the callback,
`componentWillUnmount()` just needs to set a flag to stop animating.


## Exercises

### Implement a React App with Animated Canvas

```javascript
class MyComponent extends Component {

    /**
     * Constructor
     */
    constructor(props) {
        super(props);

        this.continueAnimation = true;
    }

    /**
     * After the component has mounted
     */
    componentDidMount() {
        // Request initial animation frame
        requestAnimationFrame(() => { this.onAnimFrame(); });
    }

    /**
     * When the component is about to unmount
     */
    componentWillUnmount() {
        // Stop animating
        this.continueAnimation = false;
    }

    /**
     * Called every frame of animation
     */
    onAnimFrame(timestamp) {
        // If desired, request another anim frame for later
        if (this.continueAnimation) {
            requestAnimationFrame(() => { this.onAnimFrame(); });
        }

        // TODO animate stuff
    }

    /**
     * Render the canvas
     */
    render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    }
}
```

### Animate a Pixel Across the Screen

Using the above code, move a pixel repeatedly across the canvas.

Using math, make it take exactly 1 second for the pixel to move across the canvas.