import React, { Component } from 'react';
import styled from 'styled-components';

const Cell_Container = styled.div`
display: flex; 
flex: 1; 
padding: 10px; 
margin: 1px; 
border: 1px solid black; 
`

class Cell extends Component {
    render() {
      return (
        <Cell_Container>
        </Cell_Container>
      );
    }
  }
  export default Cell; 