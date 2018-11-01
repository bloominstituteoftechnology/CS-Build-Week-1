import React, { Component } from 'react';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from 'reactstrap';
import styled from 'styled-components';
import LifeCanvas from './components/LifeCanvas';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faInfoCircle)

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

const TitleDiv = styled.div`
  margin-left: 7%;
`

const InfoDiv = styled.div`
  margin-left: 5%;
  margin-top: 1%;
  cursor:pointer;
  :hover {
    color:pink;
  }
`

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  
  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div className="App">
        <MainContainer id="main-container">
          <Row>

            {/* First Column in Main Container */}
            <Col sm="6">
              <Row>
                <TitleDiv><h2>Conway's Game of Life</h2></TitleDiv>
                <InfoDiv><FontAwesomeIcon icon="info-circle" onClick={this.toggleModal} /></InfoDiv>
              </Row>
              
              <LifeCanvas />
            </Col>


            {/* Second Col in Main Container */}
            <Col sm="6">
            <RulesDiv>
              <h4>Rules</h4>
              <ul>If a cell is <strong>alive</strong> and it has exactly 2 or 3 neighbors, it <strong>stays alive.</strong></ul>
              <ul>If a cell is <strong>dead</strong> and it has exactly 3 live neighbors, it <strong>comes to life.</strong></ul>
            </RulesDiv>
            </Col>

          </Row>

        </MainContainer>


      <div>
        <Button color="danger" onClick={this.toggleModal}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal}>The Game</ModalHeader>
          <ModalBody>
          <p>Is an evolution where it's next state is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced players, by creating patterns with particular properties.</p>
          <p>It is possible to build a pattern that acts like a finite state machine connected to two counters. This has the same computational power as a universal Turing machine, so the Game of Life is theoretically as powerful as any computer with unlimited memory and no time constraints; it is Turing complete.</p>
          </ModalBody>
          <ModalBody>
          <p><h4>The Tech</h4></p>
          <p>This app was built in 3 days (~30 hrs), using React, Canvas and Netlify. The canvas is used to paint the game while a double-buffer data structure is used to calculate the next state of the game</p>
          <p>The requestAnimationFrame helped with the animation and libraries like Reactstrap, StyledComps and FontAwesome helped with the UI</p>
          </ModalBody>
          <ModalBody>
          <p><h4>The Future</h4></p>
          <p>After watching the videos on this, there's so much more that can be done. I think the biggest piece is getting it to be faster. Currently the algorithm doesn't use memory very efficiently. Maybe some manual garbage collection would make this faster.</p>
          </ModalBody>
          <ModalBody>
          <p><h4>Contact</h4></p>
          <p>Feel free to reach out if you have any questions or ideas! vimalshah77@gmail.com</p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      </div>
    );
  }
}

export default App;
