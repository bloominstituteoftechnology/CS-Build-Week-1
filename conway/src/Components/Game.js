import React, { Component } from 'react';

import GameBox from './GameBox';
import styled from 'styled-components';

const Container = styled.div`
    width: 362px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const Header = styled.h2`
    height: 30px;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

`;

const Button = styled.button`
    height: 25px;
    font-size: 20px;
    border-radius: 15px;
    border: 1px solid black
`;

class Game extends Component {
    constructor() {
        super();
        this.state = {
            generation: 0,
            clear: false,
            running: false
        }
    }


    gameOfLife() {
        console.log("the GameOfLife has started...")
        this.setState({generation: this.state.generation + 1});
    }

    runSimulation = () => {
        this.setState({running: !this.state.running});
        if (this.state.running === false) {
            document.getElementById("playStopButton").innerHTML = "Play";
        } else {
            console.log("The game is running...");
            document.getElementById("playStopButton").innerHTML = "Stop";
            this.gameOfLife();
        }
    }

    clearButton = () => {
        this.setState({clear: !this.state.clear});
    }


    render() {
        return ( 
            <Container>
                <Header>Generation: {this.state.generation}</Header>
                <GameBox clear={this.state.clear} clearButton={this.clearButton}/>
                <ButtonContainer>
                    <Button id="playStopButton" onClick={this.runSimulation}>Play</Button>
                    <Button onClick={this.clearButton}>Clear</Button>
                </ButtonContainer>
            </Container>
        );
    }
}
 
export default Game;