import React from 'react';
import Life from './Life';

class LifeCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            continueAnimation: true,
            life: new Life(300, 300)
        }
    }

    componentDidMount() {
        requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });
    }

    componentWillUnmount() {
        this.setState({ continueAnimation: false });
    }

    onAnimFrame(timestamp) {
        if (this.state.continueAnimation) {
            requestAnimationFrame(timestamp => { this.onAnimFrame(timestamp); });
        }
    }

    render() {
        return <canvas ref="canvas" width={window.innerWidth} height={500} />
    }
}

export default LifeCanvas;