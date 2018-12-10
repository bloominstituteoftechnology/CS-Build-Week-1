import React, { Component } from 'react';

class LifeCanvas extends Component {
    


    function draw() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
          var ctx = canvas.getContext('2d');
      
          ctx.fillRect(25, 25, 100, 100);
          ctx.clearRect(45, 45, 60, 60);
          ctx.strokeRect(50, 50, 50, 50);
        }
      }

    render() {
        return (
            <canvas ref="canvas" width={this.props.width} height={this.props.height} />
        );
      }
}

export default LifeCanvas;