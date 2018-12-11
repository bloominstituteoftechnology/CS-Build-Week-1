import React, { Component } from "react";
import Box from "./GridBox";

class GridLayout extends Component {
  constructor() {
    super();
    this.state = {
      gridRows: 15,
      gridColumns: 15,
      gridBoxArr: []
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

  render() {
    return (
      <div className="grid">
        {this.state.gridBoxArr.map(box => {
          return <Box id={box.id} />;
        })}
      </div>
    );
  }
}

export default GridLayout;
