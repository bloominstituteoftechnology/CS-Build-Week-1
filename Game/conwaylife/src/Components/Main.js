import React, { Component } from 'react';
import styled from 'styled-components';
import img from '../Images/finalpixelpls.png';
import img2 from '../Images/newpause.png';
import img1 from '../Images/newestart.png'
import Game from './Game'
import './Game.css'
import '../Hover/hover-min.css';
const Fatherdiv = styled.div`
width: 100%;
height: 100%;
display: flex;
background-image:url(${img});

`
const Header = styled.div`
flex-direction: column;`

const GridOutline = styled.div`
width: 800px;
height: 600px;
border: none;

`
const Rules = styled.button`
width: 200px;
height: 60px;
border: 2px solid #ffc107;
color: maroon;
margin-left: 25px;
font-size: 18px;
text-decoration: none;
background-color: #e91e63;
cursor: pointer;
text-align: left;
color: white;
font-style: italic;
`
const Welcome = styled.div`
font-family: 'Chakra Petch', sans-serif;
font-size: 48px;
color: #7436b9;
margin-left: 10px;

`
const Start = styled.p`
margin-top: 0px;
margin-bottom: 0px;
font-family: 'Chakra Petch', sans-serif;`

const Play = styled.button`
cursor: pointer;
border: none;
text-decoration: none;
background-color: none;
margin-left: 10px;
margin-top: 15px;
margin-right: 20px;
height: 60px;
width: 200px;
background-image:url(${img1})
`

const Pause = styled.button`
cursor: pointer;
text-decoration: none;
background-color: none;
border: none;
margin-left: 10px;
margin-top: 15px;
width: 200px;
height: 60px;
background-image:url(${img2})
`
const Clear = styled.button`
cursor: pointer;
text-decoration: none;
background-color: #B416AE;
border: 1px solid #340069;
width: 200px;
height 60px;
font-family: 'Chakra Petch', sans-serif;
color: #FBC36A;
margin-left: 15px;
font-size: 26px;
font-style: italic;
border-radius: 5px;

`
class Main extends Component {

    reloader = () => {
        window.location.reload()
    }
    render() {
        return (
            <Fatherdiv>
                

            <GridOutline>
                <Game/>
                </GridOutline>
            
            <Header>
            <Welcome>
                    Welcome to Conway's <br/>Game of Life
                    </Welcome>
                   <a class="button hvr-skew-backward">
                <Clear onClick={() => this.reloader()}> Clear Board</Clear>
                </a>
            
                </Header>

            </Fatherdiv>

        )
    }
}

export default Main;