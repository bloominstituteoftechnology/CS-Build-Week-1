import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col} from 'reactstrap';
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

class App extends Component {

  render() {
    return (
      <div className="App">
        <MainContainer id="main-container">
          <Row>

            {/* First Column in Main Container */}
            <Col sm="6">
              <div><h2>Conway's Game of Life</h2></div>
              <LifeCanvas />
            </Col>


            {/* Second Col in Main Container */}
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
