# Implementation of The Game of Life using Basic Components

One approach to implementing the Game of Life could be to build a collection of React Components.

## Component Hierarchy

The main component of the visualization we want to display is  a grid. We should create the grid as
a React Component with any necessary state variables that allow it to be displayed as we wish. Below
are some thoughts about items to add to your grid component.

![configuring cells](https://media.giphy.com/media/55kAbxxQo5BPzywPjg/giphy.gif)

### Cells
This grid is composed of a number of cells. Since we want the user to be able to select which
cells will be alive in generation 0, it would be logical to create the cells as Buttons or 
other "clickable" elements. Separate from the cells displayed on the screen, there should also
be a data structure (like an array), that is used to store the current state of each cell. Ideally,
the user will not be able to click the cells and change their state while the animation is running.

### Controls
To control the simulation we also need to add buttons that will allow the user to start / stop 
the animation and clear the board. And depending on the level of control you want to give your 
users, you could add some input fields to allow users to specify the speed of the animation,
size of the grid, etc.

Check out the [React Docs](https://reactjs.org/docs/lists-and-keys.html#rendering-multiple-components) for more information and examples of how to render variable numbers
of components.


### Text
Additionally, we may have a few sections of text that describe the rules, 
current generation being displayed, or other information.
