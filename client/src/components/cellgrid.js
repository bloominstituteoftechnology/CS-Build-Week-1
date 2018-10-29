import React, { Component } from 'react';

class CellGrid extends Component {
    constructor(props) {
        super(props);
        this.continueAnimation = true;
    }

    componentDidMount() {
        requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
    }

    componentWillUnmount() {
        this.continueAnimation = false;
    }
    
    onAnimFrame(timestamp) {
        // If desired, request another anim frame for later
        if (this.continueAnimation) {
            requestAnimationFrame((timestamp) => { this.onAnimFrame(timestamp); });
        }

        // TODO animate stuff
    }


    render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    }

    
}

export default CellGrid;