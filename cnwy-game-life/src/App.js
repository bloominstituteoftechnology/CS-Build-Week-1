import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import LifeCanvas from './components/LifeCanvas';

const MainContainer = styled(Container)`
  background-color: #282c34;
  /* min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin); */
  height:100vh;
  color: white;
`

const RulesDiv = styled.div`
  margin-top:200px;
`

const GenDiv = styled.div`
  margin-top:50px;
`
class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer>
          <Row>
            <Col sm="6">
              <div><h2>Conway's Game of Life</h2></div>
              <GenDiv>Generation: 0</GenDiv>
              <LifeCanvas className="border" height={500} width={500}/>
              <div>Update every <input type="text"/> ms</div>
              <div>Size of grid <input type="text"/> </div>
              <div>Play Button</div>
            </Col>
            <Col sm="6">
            <RulesDiv>
              <h4>Rules</h4>
              <ul>If a cell is <strong>alive</strong> and it has exactly 2 or 3 neighbors, it <strong>stays alive.</strong></ul>
              <ul>If a cell is <strong>alive</strong> and it has exactly 2 or 4+ neighbors, it <strong>dies.</strong></ul>
              <ul>If a cell is <strong>dead</strong> and it has exactly 3 live neighbors, it <strong>comes to life.</strong></ul>
            </RulesDiv>
            </Col>
          </Row>
        </MainContainer>
      </div>
    );
  }
}

export default App;
