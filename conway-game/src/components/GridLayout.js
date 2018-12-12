import React, { Component } from "react";
import Box from "./GridBox";
import ActionButtons from "./ActionButtons";

class GridLayout extends Component {
  constructor() {
    super();
    this.state = {
      gridRows: 15,
      gridColumns: 15,
      gridBoxArr: [], 
      isRunning: false
    };
    // 15 by 15 grid each a box that is set to false for alive for a starting grid
  }

  componentDidMount() {
    this.populateGridBoxes();
  }

  playAlgorithm = () => {
      // Rules: if the live cell has 0 or 1 neighbors then it dies
      //        if the live cell has 2 or 3 neighbors then it will stay alive
      // if a live cell has 4 or more neighbors, it will die
      // if the dead cell has three or more neighbors it will become active

  }

  populateGridBoxes = () => {
    const boxArr = [];
    const coordinates = []
    for(let y = 1; y <= this.state.gridRows; y++){
        for(let x = 1; x <= this.state.gridColumns; x++){
            coordinates.push({x,y})
        }
    }
    const boxes = this.state.gridRows * this.state.gridColumns;
    for (let i = 0; i < boxes; i++) {
      boxArr.push({ id: i, coords: coordinates[i] });
    }
    this.setState({
      gridBoxArr: boxArr
    });

  };

  startRunning = () => {
      this.setState({
          isRunning: true
      })
  }

  pauseRunning = () => {
      this.setState({
          isRunning: false
      })
  }

  render() {
    return (
      <div className="grid">
        {this.state.gridBoxArr.map(box => {
          return <Box runningGame = {this.state.isRunning} key={box.id} coordinates={box.coords} />;
        })}
        <ActionButtons start = {this.startRunning} pause = {this.pauseRunning} />
      </div>
    );
  }
}

export default GridLayout;
