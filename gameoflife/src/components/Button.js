import React from 'react';
import './index.css';

const Button = (props) => {
  console.log(props)
  return (
    <button 
      className={props.styles} 
      onClick={props.onClick} 
      // "disabled"
    >
      {props.text}
    </button>
  )
}

export default Button;