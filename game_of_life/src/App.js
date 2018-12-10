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
width: 200px; 
height: 100xp;
`
class App extends Component {
  render() {
    return (
      <App_Holder>
        <Header_container>
          <Btn>
            Submit
            </Btn>
            <Inner_Header>
            </Inner_Header>
        </Header_container>
      </App_Holder>
    );
  }
}

export default App;
