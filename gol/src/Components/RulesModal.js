import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../App.css';


class RulesModal extends Component {
    constructor (props) {
      super(props);
      this.state = {
        modal: false
      };
    }
    
    toggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    }
    
    render () {
      return (
        <div>
          <Button className = 'info' color="info" onClick={this.toggle}>Game Of Life Rules</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                <h1>Rules for Conway's Game of Life</h1>
                <p>At the heart of this game are four rules that determine if a cell is live or dead. All depend on how many of that cell's neighbors are alive.</p>
                <p>Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.</p>
                <p>Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.</p>
                <p>Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.</p>
                <p>Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.</p>
                <p>Another important fact about the rules for the game of life is that all rules apply to all cells at the same time.</p>
                </ModalBody>
            </Modal>
        </div>
      );
    }
  }

  export default RulesModal;