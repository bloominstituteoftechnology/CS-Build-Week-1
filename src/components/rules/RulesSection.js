import React, { Component } from 'react'

class RulesSection extends Component {
    state = {
      areRulesExpanded: false
    }
  
    toggleRules = () => {
      this.setState(prevState => {
        return {areRulesExpanded: !prevState.areRulesExpanded}
      });
    }
    
    render() {
      return (
        <section aria-labelledby="rules-heading">

          <h2 id="rules-heading">

              <button type="button" onClick={this.toggleRules}>

                controls section

              </button>

            </h2>


            <div className={`section-info ${
                this.state.areRulesExpanded ? "" : "hidden"
              }`}>

              <h3>About Game of Life</h3>
              <p>
              Conway's Game of Life is a game invented by mathematician John Conway in 1970
              </p>

              <h3>
                How to Play
              </h3>
              <ul aria-label="rules">
                <li>Each space in the grid represents a cell. A cell can either be dead or alive.</li>
                <li>A cell's fate depends on the state of its 8 closest neighbours. Those are the cells that wrap around it, including its corners.</li>
                <li>If a cell is alive, and 2 or 3 of it's neighbours are also alive, the cell remains alive.</li>
                <li>If a cell is alive and it has more than 3 alive neighbours, it dies of overcrowding.</li>
                <li>If a cell is alive and it has fewer than 2 alive neighbours, it dies of loneliness.</li>
                <li>If a cell is dead and it has exactly 3 neighbours it becomes alive again.</li>
              </ul>
              <p>Sometimes an initial state will create an unpredictable, chaotic sequence. Other times, it will create a repeating sequence (such as the glider). And other times, all cells will quickly die off or stabilise into a static formation, known as a still life, such as a 2x2 square.</p>
            </div>
        </section>
      )
    }
  }
  
  export default RulesSection;
  