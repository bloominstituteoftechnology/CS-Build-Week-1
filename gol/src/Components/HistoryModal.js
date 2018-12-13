import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../App.css';



class HistoryModal extends Component {
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
          <Button className = 'info' color="info" onClick={this.toggle}>Game Of Life History</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}></ModalHeader>
                <ModalBody>
                <h1>Origins of Conway's Game of Life</h1>
                <p>In late 1940, John von Neumann defined life as a creation (as a being or organism) which can reproduce itself and simulate a Turing machine. Von Neumann was thinking about an engineering solution which would use electromagnetic components floating randomly in liquid or gas. This turned out not to be realistic with the technology available at the time. Thus, ingeniously, Stanisław Ulam invented cellular automata, which were intended to simulate von Neumann's theoretical electromagnetic constructions. Ulam discussed using computers to simulate his cellular automata in a two-dimensional lattice in several papers. In parallel, Von Neumann attempted to construct Ulam's cellular automaton. Although successful, he was busy with other projects and left some details unfinished. His construction was complicated because it tried to simulate his own engineering design. Over time, simpler life constructions were provided by other researchers, and published in papers and books</p>
                <p>Motivated by questions in mathematical logic and in part by work on simulation games by Ulam, among others, John Conway began doing experiments in 1968 with a variety of different 2D cellular automaton rules. Conway's initial goal was to define an interesting and unpredictable cell automaton. Thus, he wanted some configurations to last for a long time before dying, other configurations to go on forever without allowing cycles, etc. It was a significant challenge and an open problem for years before experts on cell automatons managed to prove that, indeed, Conway's Game of Life admitted of a configuration which was alive in the sense of satisfying Von Neumann's two general requirements. While the definitions before Conway's Life were proof-oriented, Conway's construction aimed at simplicity without a priori providing proof the automaton was alive.</p>
                <p>Conway chose his rules carefully, after considerable experimentation, to meet these criteria:

                    1. There should be no explosive growth.
                    2. There should exist small initial patterns with chaotic, unpredictable outcomes.
                    3. There should be potential for von Neumann universal constructors.
                    4. The rules should be as simple as possible, whilst adhering to the above constraints.

                </p>
                <a href = 'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Read more....</a>
                </ModalBody>
            </Modal>
        </div>
      );
    }
  }

  export default HistoryModal;