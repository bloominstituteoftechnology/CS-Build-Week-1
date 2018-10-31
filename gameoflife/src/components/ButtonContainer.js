import React from 'react';
import Button from './Button';
import './index.css';


const ButtonContainer = props => {
  console.log(props)
  return (
    <div className="center">
        <Button 
          styles="btn btn-outline-dark mx-2 my-2 px-5"
          onClick={props.playButton} 
          text="Play" 
        />
        <Button 
          styles="btn btn-outline-dark mx-2 my-2 px-5" 
          onClick={props.pauseButton} 
          text="Pause" 
        />
        <Button 
          styles="btn btn-outline-dark mx-2 my-2 px-5 clear" 
          onClick={props.clearButton} 
          text="Clear" 
        />
        <br />
        <Button 
          styles="btn btn-outline-dark mx-2 my-2 px-5"
          onClick={props.increaseSpeed} 
          text="Increase" 
        />
        <Button 
          styles="btn btn-outline-dark mx-2 my-2 px-5" 
          onClick={props.decreaseSpeed} 
          text="Decrease" 
        />
    </div>
  )
}

export default ButtonContainer;