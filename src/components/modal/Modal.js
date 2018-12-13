import React from 'react';

import { Container, Opacity, ModalBody } from './ModalStyles';


class Modal extends React.Component {  
  render() {
    return (
      <Container>
        <Opacity onClick={() => this.props.handleModal()} />
        <ModalBody>
          <button className="last" onClick={() => this.props.handleModal()}> X </button>
          <h1>Welcome to the Game of life</h1>
          <main>
            <section>
              <h2>What the game is about</h2>
              <p>Conway's Game of Life is a game invented by mathematician John Conway in 1970</p>
            </section>
            <section>
              <h2>Rules for the game</h2>
              <p>Each space in the grid represents a cell. A cell can either be dead or alive.</p>
              <p>A cell's fate depends on the state of its 8 closest neighbours. Those are the cells that wrap around it, including its corners. Here are the rules:</p>
              <ul>
                <li>If a cell is alive, and 2 or 3 of it's neighbours are also alive, the cell remains alive.</li>
                <li>If a cell is alive and it has more than 3 alive neighbours, it dies of overcrowding.</li>
                <li>If a cell is alive and it has fewer than 2 alive neighbours, it dies of loneliness.</li>
                <li>If a cell is dead and it has exactly 3 neighbours it becomes alive again.</li>
              </ul>
              <p>Sometimes an initial state will create an unpredictable, chaotic sequence. Other times, it will create a repeating sequence (such as the glider). And other times, all cells will quickly die off or stabilise into a static formation, known as a still life, such as a 2x2 square.</p>
            </section>
          </main>
        </ModalBody>
      </Container>
    );
  }
};

export default Modal;

