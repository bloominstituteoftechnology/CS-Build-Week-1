import React from 'react';
import './canvas.css';
import AutosizeInput from 'react-input-autosize';

class LifeCanvasOptions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            glider: false,
            spaceship: false,
            tumbler: false
        }
    }

    componentDidMount() {
        this.drawSpaceship();
        this.drawGlider();
        this.drawTumbler();
    }

    handleInput = event => {
        this.setState({ [event.target.name]: event.target.validity.valid ? Number(event.target.value) : this.props.generation });
    }

    calculate = () => {
        this.props.calculate(this.state.input);
        this.setState({ input: '' });
    }

    setSpeed = event => {
        this.props.setSpeed(Number(event.target.value));
    }

    drawButtons = (context, coords, color) => {
        context.fillStyle = color
        coords.forEach(cell => {
            context.fillRect(cell[0], cell[1], 10, 10);
        });
    }

    drawGlider = color => {
        let context = this.refs.glider.getContext("2d");
        let coords = [[10, 0], [20, 10], [20, 20], [10, 20], [0, 20]];
        this.drawButtons(context, coords, color);
    }

    drawSpaceship = color => {
        let context = this.refs.spaceship.getContext("2d");
        let coords = [[10, 0], [20, 0], [30, 0], [40, 0],
        [40, 10], [40, 20], [30, 30], [0, 30], [0, 10]];
        this.drawButtons(context, coords, color);
    }

    drawTumbler = color => {
        let context = this.refs.tumbler.getContext("2d");
        let coords = [[10, 0], [20, 0], [40, 0], [50, 0],
        [10, 10], [20, 10], [40, 10], [50, 10], [20, 20], [40, 20],
        [20, 30], [40, 30], [20, 40], [40, 40], [0, 30], [60, 30],
        [0, 40], [60, 40], [0, 50], [60, 50], [10, 50], [50, 50]];
        this.drawButtons(context, coords, color);
    }

    handlePaste = name => {
        if (name === 'glider' && !this.state.glider) {
            this.drawGlider('yellow');
            this.drawSpaceship('black');
            this.drawTumbler('black');
            this.setState({ glider: true, spaceship: false, tumbler: false });
            this.props.setPaste(name);
        } else if (name === 'spaceship' && !this.state.spaceship) {
            this.drawGlider('black');
            this.drawSpaceship('yellow');
            this.drawTumbler('black');
            this.setState({ glider: false, spaceship: true, tumbler: false });
            this.props.setPaste(name);
        } else if (name === 'tumbler' && !this.state.tumbler) {
            this.drawGlider('black');
            this.drawSpaceship('black');
            this.drawTumbler('yellow');
            this.setState({ glider: false, spaceship: false, tumbler: true });
            this.props.setPaste(name);
        } else {
            this.drawGlider('black');
            this.drawSpaceship('black');
            this.drawTumbler('black');
            this.setState({ glider: false, spaceship: false, tumbler: false });
            this.props.setPaste('');
        }
    }

    render() {
        return (
            <div className='canvas-options' onSubmit={event => event.preventDefault()} >
                <i onClick={this.props.clear} className="fas fa-trash-alt"></i>
                <i onClick={this.props.randomize} className="fas fa-question"></i>
                <i onClick={this.props.start} className={this.props.continue ? "fas fa-stop" : "fas fa-play"}></i>
                <i onClick={this.props.next} className="fas fa-arrow-right"></i>

                <form className='canvas-options-form'>
                    <AutosizeInput className='canvas-options-input'
                        type='text'
                        pattern="[0-9]*"
                        name='input'
                        onChange={this.handleInput}
                        value={this.state.input}
                        placeholder={String(this.props.generation)} />
                    <input
                        className='canvas-options-input-range'
                        type='range'
                        min="10"
                        max="1000"
                        step="10"
                        defaultValue="10"
                        onChange={this.setSpeed} />
                    <input
                        type='submit'
                        onClick={this.calculate}
                        style={{ width: "0px", height: "0px", opacity: "0" }} />
                </form>

                <canvas ref="glider" onClick={() => this.handlePaste('glider')} width={30} height={30}></canvas>
                <canvas ref="spaceship" onClick={() => this.handlePaste('spaceship')} width={50} height={40}></canvas>
                <canvas ref="tumbler" onClick={() => this.handlePaste('tumbler')} width={70} height={60}></canvas>

            </div>
        );
    }
}

export default LifeCanvasOptions;