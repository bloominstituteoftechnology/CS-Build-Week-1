import React, { Component } from "react";
import Box from "./GridBox";
import ActionButtons from "./ActionButtons";
import {connect} from 'react-redux'; 

class GridLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.populateGridBoxes();
  }

  playAlgorithm = () => {
      // Rules: if the live cell has 0 or 1 neighbors then it dies
      //        if the live cell has 2 or 3 neighbors then it will stay alive
      // if a live cell has 4 or more neighbors, it will die
      // if the dead cell has three or more neighbors it will become active
      // check coordinates all around the square, if the y-1, y-1 x + 1, x + 1, y + 1 x + 1, y + 1, y + 1 x - 1, x-1, y-1 x-1
      this.state.gridBoxArr.forEach(box => {
          if(box.coords.x === 1){
            
        }
      })
      this.startRunning(); 
  }

  populateGridBoxes = () => {
    const boxArr = [];
    const coordinates = []
    for(let y = 1; y <= this.props.gridRows; y++){
        for(let x = 1; x <= this.props.gridColumns; x++){
            coordinates.push({x,y})
        }
    }
    const boxes = this.props.gridRows * this.props.gridColumns;
    for (let i = 0; i < boxes; i++) {
      boxArr.push({ id: i, coords: coordinates[i], active: false });
    }
    // this.setState({
    //   gridBoxArr: boxArr
    // });

  };

//   startRunning = () => {
//       this.setState({
//           isRunning: true
//       })
//   }

//   pauseRunning = () => {
//       this.setState({
//           isRunning: false
//       })
//   }

 
  render() {
    return (
      <div className="grid">
        {this.props.gridBoxArr.map(box => {
          return <Box runningGame = {this.props.isRunning} key={box.id} coordinates={box.coords} />;
        })}
        {/* <ActionButtons start = {this.playAlgorithm} pause = {this.pauseRunning} /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        gridRows: state.gridRows, 
        gridColumns: state.gridColumns, 
        gridBoxArr: state.gridBoxArr, 
        isRunning: state.isRunning
    }
}

export default connect(mapStateToProps, {})(GridLayout);
