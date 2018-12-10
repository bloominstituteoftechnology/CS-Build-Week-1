import React from 'react';

class LifeCanvas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            height: 750,
            width: 750,
            cells: 15
        }
    }
    initializeCanvas = () => {
        let canvas = this.refs.canvas.getContext('2d');
        canvas.fillStyle = 'white';

        const cells = this.state.height/this.state.cells;

        canvas.fillRect(0,0,this.state.height, this.state.width);

        for (let i = 0; i <= this.state.height; i += cells){
            canvas.moveTo(0,i);
            canvas.lineTo(this.state.width, i);
            for (let j = 0; j <= this.state.width; j += cells){
                canvas.moveTo(j,0);
                canvas.lineTo(j, this.state.height);
            }
        }
        canvas.stroke();
    }

    componentDidMount(){
        this.initializeCanvas();
    }
    render(){
        return(
            <canvas 
                ref="canvas"
                height={this.state.height}
                width={this.state.width}
            />
        )
    }
}

export default LifeCanvas;