# Cellular Automata, Screen Buffers, and Conway's "Game of Life"

Over the course of this week, students will work on creating their own application in which users will be able to run different "Game of Life" scenarios. This module leads the reader through the fundamentals of Conways's "Game of Life" and will guide them through the process of creating an app utilizing tools and frameworks that have been taught over the course of their specific track.


## Objectives
* Student should be able to create a unique, high-quality project that can be added to a professional portfolio
* Student should be able to describe the rules of Conway’s “Game of Life”
* Student should be able to explain what cellular automata are and describe how they are useful in real life
* Student should be able to correctly analyze the ‘Turing Completeness’ of Conway’s “Game of Life”
* Student should be able to implement a visualization of Conway’s “Game of Life” using technologies related to their specific track
* Student should be able to utilize animation in the aforementioned visualization
* Student should be able to utilize “double buffering” to implement animations


## Git Commits

- You are required to showcase progress with at least 1 commit a day.
  This will let your project manager know where you are and if you need
  help. This also allows the client to get progress reports from the
  company in a real world setting.


## Trello Set Up:

- [ ] Create a Trello account if you don't have one already
- [ ] Create a new board called "GameOfLife - {Your Name}"
- [ ] Create lists titled `backlog`,`To Do`, `In Progress`, and `Done`
- [ ] Fill in the `To Do` list with the MVP features listed below
- [ ] Fill in the `backlog` list with all the extra features listed below
- [ ] Share your board with the project manager that has been assigned to you. If you have not been assigned yet, reach out to your lead PM for guidance
- [ ] Add your Trello URL to your project's README.md file. Commit the change, push it to your repository & submit a pull request


## MVP Features:

#### Preliminary Work
- [ ] Research Conway’s “Game of Life”. Figure out how it works, why it’s useful, and how the notion of Turing Completeness is related to this topic.

#### Visualizing the “Game of Life”
The main entry point of your application should house the visualization of this cellular automata. Include any necessary components, such as:
- [ ] Grid to display cells
- [ ] Text to display current generation being simulated
- [ ] Buttons for actions such as starting & stopping the animation, clearing the grid
Implement necessary behaviors, such as:
- [ ] Implement rules to correctly handle birth of new cells and death of old cells.
- [ ] Use ‘double buffering’ to animate cells in appropriate direction across the screen as they are born and die.
- [ ] Allow the user to stop and restart the simulation
- [ ] Allow the user to clear the animation if stopped
#### Rules 
- [ ] On the main entry point of the application, link to a second page or screen that describes the two main rules (birth & death) of Conway’s “Game of Life”
#### About this Algorithm
- [ ]  On the main entry point of the application, link to a third page or screen that describes the Turing Completeness of Conway’s “Game of Life”


## Stretch Goals
- [ ] Make changes in color part of your animation
- [ ] Allow users to type in a specific generation, calculate the configuration of cells at that point in time, and jump to that state


## ???

1. [Learn about HTML canvas and screen buffers](objectives/canvas-buffers)
2. [Learn about animating a canvas in a React component](objectives/react-canvas-anim)
3. [Learn about cellular automata and the Game of Life](objectives/ca-life)


## Projects

* [Implement the Game of Life as a React canvas app](projects/life)
