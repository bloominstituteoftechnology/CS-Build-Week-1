import React from 'react';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    }
  }

  componentDidMount() {
    this.drawBoxes();
  }

  drawBoxes = () => {
    let boxes = [];
    for(let i = 0;i < 15;i++){
      let row = [];
      for(let i = 0;i < 15;i++){
        row.push(i%3);
      }
      boxes.push(row);
    }

    this.setState({
      grid: boxes
    });
  }

  render() {
    return (
      <div className='grid'>
        {this.state.grid.map((row) => {
          console.log(row);
          return (<div className='row'>{row.map((box) => {
            if(box === 1){
              return (<div className='box alive'></div>);
            } else {
              return (<div className='box'></div>);
            }
          })}</div>)
        })}
      </div>
  )}
}

export default Grid;
