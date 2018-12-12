import React, { Component } from 'react';
import './controls.scss';

let isGoing = false;

class Controls extends Component {
  constructor(props){
    super(props);
    this.state = {
      isGoing: this.props.data.isRollin,
    }
    console.log(this.props);
  }

  toggleOnGoing = () => {
    isGoing = (isGoing === false) ? true : false;
    this.props.goBlast();
  }

  handleClear = () => {
    this.props.stop();
  }

  render(){
    return (
      <div className="controls-container">
        <button onClick={()=>{this.toggleOnGoing()}}>{ //Check if message failed
        (isGoing === false)
          ? <div> go! </div> 
          : <div> halt! </div> 
      }</button>
        <button onClick={()=>{this.handleClear()}}>scrap!</button>
      </div>
    )
  }

}



export default Controls;


