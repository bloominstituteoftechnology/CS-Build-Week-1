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
    width: 330px;
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
            generation: 0
        }
    }


    gameOfLife() {

        this.setState({generation: this.state.generation + 1});
    }

    playButton() {

    }

    render() {
        return ( 
            <Container>
                <Header>Generation: {this.state.generation}</Header>
                <GameBox/>
                <ButtonContainer>
                    <Button>Play</Button>
                    <Button>Pause</Button>
                    <Button>Stop</Button>
                    <Button>Clear</Button>
                </ButtonContainer>
            </Container>
        );
    }
}
 
export default Game;