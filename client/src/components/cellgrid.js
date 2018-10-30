import React, { Component } from 'react';

class CellGrid extends Component {
    constructor(props) {
        super(props);
        this.continueAnimation = true;
        this.state = {
            size: [150, 100]
        }
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

    renderBoard() {
        let newGrid = [];
        let cellRow = [];

        for(let i = 0; i < this.state.size[0]; i++) {
            for (let j = 0; j < this.state.size[1]; j++) {
                cellRow.push(<Cell key={[i, j]} />);
            }
            newGrid.push(<div className="row" key={i}>{cellRow}</div>)
            cellRow = [];
        }

        return newGrid;
    }


    render() {
        return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
    }

    
}

export default CellGrid;