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


const Rule = styled.li`
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
    top: 50%;
    width: 2%;
    height: 2%;
`

const Button = styled.button`
    position: inherit;
    right: 6%;
    top: 16%;
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

class Rules extends Component {
    constructor(){
        super()

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
                    <Button onClick={this.toggleHidden}>Rules</Button>
                </Background>
                {isHidden ? (
                    null 
                ) : (
                    <HiddenTab>
                        <Info>
                            <ol>
                                <Rule>Any live cell with fewer than two live neighbors dies, as if by underpopulation.
                                    </Rule>
                                <Rule>Any live cell with two or three live neighbors lives on to the next generation.
                                    </Rule>
                                <Rule>Any live cell with more than three live neighbors dies, as if by overpopulation.
                                    </Rule>
                                <Rule>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                                    </Rule>
                            </ol>
                        </Info>
                    </HiddenTab>
 
                )}
            </ShowInfo>

        )
    }
}

export default Rules;