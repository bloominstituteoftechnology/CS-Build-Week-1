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

  populateGridBoxes = () => {
    const boxArr = [];
    const boxes = this.state.gridRows * this.state.gridColumns;
    for (let i = 0; i < boxes; i++) {
      boxArr.push({ id: i });
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
          return <Box runningGame = {this.state.isRunning} id={box.id} />;
        })}
        <ActionButtons start = {this.startRunning} pause = {this.pauseRunning} />
      </div>
    );
  }
}

export default GridLayout;
