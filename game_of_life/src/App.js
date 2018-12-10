import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'; 

const App_Holder = styled.div`
border: 1px solid black; 
display: flex; 
flex-direction: column; 
flex:1;
`
const Header_container = styled.header`
border: 1px solid red; 
display: flex; 
flex-direction: column; 
flex: 1; 
`
const Btn = styled.button`
width: 100px; 
padding: 10px; 
margin: 5px; 
`
const Inner_Header = styled.header`
border: 1px solid green; 
display: flex; 
width: auto;
heigth: auto;  
`
const Input = styled.input`
width: 100px; 
height: 20px;
margin: 5px; 
`
const Btn_container = styled.div`
border: 1px solid blue; 
display: flex; 
width: auto; 
height: auto; 
`
const Header_text = styled.div`
border: 1px solid yellow; 
width: auto; 
`

class App extends Component {
  render() {
    return (
      <App_Holder>
        <Header_container>
          <Btn>Submit</Btn>
            <Inner_Header>
              <Input 
              type = "number"
              placeholder = "Rows"
              />
              <Input 
              type = "number"
              placeholder = "Columns"
              />
            </Inner_Header>
            <Btn_container>
              <Btn>Start</Btn>
              <Btn>Stop</Btn>
            </Btn_container>
            <Header_text>
              <h3>Generations:</h3>
              </Header_text>
        </Header_container>
      </App_Holder>
    );
  }
}

export default App;
