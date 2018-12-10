import React, {Component} from "react";

export default class Pixel extends Component {
  constructor(props){
      super(props);
  }

  
  render() {
    return(
      <div>
          {this.props.ctx.lineWidth = 1}
          {this.props.ctx.strokeRect(10,10,10,10)}
      </div>
    )
  }
}