import React, { Component } from 'react';
import './controls.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faEraser } from '@fortawesome/free-solid-svg-icons'

const pause = <FontAwesomeIcon icon={faPause} />
const play = <FontAwesomeIcon icon={faPlay} />
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
        <button className="controls-btn" onClick={()=>{this.toggleOnGoing()}}>{ //Check if message failed
        (isGoing === false)
          ? <FontAwesomeIcon icon={faPlay} />
          : <FontAwesomeIcon icon={faPause} /> 
      }</button>
        <button className="controls-btn" onClick={()=>{this.handleClear()}}><FontAwesomeIcon icon={faEraser} /></button>
      </div>
    )
  }

}



export default Controls;


