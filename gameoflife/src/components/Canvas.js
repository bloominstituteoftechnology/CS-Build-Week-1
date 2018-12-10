import React, { Component } from 'react';
import Pixel from './Pixel';


export default class Canvas extends Component {
  constructor(props){
    super(props); 
    this.state = {
    }
  }

  
  render() {
    return(
      <div>

        {this.props.pixels.map(pixel => 
            <Pixel >
                  <canvas 
                    ref="canvas" 
                    width={640} 
                    height={425} 
                    ctx={this.refs.canvas.getContext("2d")}/>
            </Pixel>
        )}
      </div>
    )
  }
}