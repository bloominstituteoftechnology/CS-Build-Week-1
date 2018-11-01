import React, { Component } from 'react';
import styled from 'styled-components';
import HiddenTab from './HiddenTab';
import img from '../img/metal.jpeg';


const Info = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
    background-image: linear-gradient(to right, rgba(52, 187, 229, 0.7), rgba(139, 189, 184, 0.8));
    z-index: 3;
    line-height: 1.6;
    left: 15%;
    padding: 10%;
`

const Description = styled.p`
    font-size: 0.8rem;
    font-family: 'Kanit', sans-serif;
`

const ShowInfo = styled.div`

`

const Background = styled.div`
    background-image: url(${img});
    background-size: cover;
    border: 10px solid black;
    border-radius: 5%;
    padding: 3% 7%;
    position: absolute;
    right: 1%;
    top: 13%;
    width: 2%;
    height: 2%;
`

const Button = styled.button`
    position: inherit;
    right: 6%;
    top: 17%;
    padding: 4%;
    margin: 3%;
    width: 80%;
    font-size: 1rem;
    border-radius: 5%;
    display: table;
    background: grey;
    border: 8px solid black;
    border-radius: 5%;

    box-shadow: 5px 5px black;
    font-family: 'Kanit', sans-serif;

    &:hover {
        background-image: radial-gradient( rgba(254,19,4,0.98), rgba(254,98,13,0.5));
    }

    &:active {
        background-color: #3e8e41;
        box-shadow: 0 5px #666;
        transform: translateY(4px);
      }
`

class GameInfo extends Component {
    constructor(props){
        super(props)

        this.state = {
            isHidden : true,
        }
    }

    toggleHidden = () => {
        this.setState({ isHidden: !this.state.isHidden });
    }

    render(){
        const { isHidden } = this.state;
        return (
            <ShowInfo>
                <Background>
                    <Button onClick={this.toggleHidden}>Game Info</Button>
                </Background>
                
                {isHidden ? (
                    null 
                ) : (
                    <HiddenTab>
                        <Info>
                            <Description>
                                <a href="httDescriptions://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conways Game of Life</a><br />
                                In 1970 John Conway developed a computer program called The Game of Life. 
                                The idea behind it was that the process of biological life is, despite its apparent complexity, 
                                reduceable to a finite set of rules. The game is made up of a grid of squares, or “cells,” 
                                in one of two states: “alive” or “dead.” A player sets the initial conditions, 
                                choosing which squares should be alive. Each turn of the game is like a generation – some squares live, 
                                some are born, and some die. Just a few simple rules determine cells’ behavior: 
                                Cells with too few or too many neighbors die. Empty squares with the right number of neighbors come to life.
                            </Description>
                        </Info>
                    </HiddenTab>
 
                )}
            </ShowInfo>

        )
    }

}

export default GameInfo;