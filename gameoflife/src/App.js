import React, { Component } from "react";
import "./App.css";
import Game from "./Game";

const Rules = () => {
  return(
    <div>
<blockquote>1. Any living cell that has fewer than two living neighbors will die, as if caused by under population. </blockquote>
      <blockquote>2. Any living cell with two or three living neighbors gets to live on to another generation. </blockquote>
      <blockquote>3. Any living cell will die when it has more than 3 living neighbors. Beware the dangers of overpopulation!</blockquote>
      <blockquote>4. If a cell is dead, but has <i>exactly</i> 3 living neighbors, it will come alive. Circle of life!</blockquote>
    </div>
  )
}

const About = () => {
  return (
    <div>
      <p>
        Conway's Game of Life or <i>Life</i> is a zero-player game developed by
        John Conway in 1970. It is an often cited example of
        of cellular automation that demonstrates how a small set of
        simple rules can result in an infinite number of complex patterns. The original pattern on the board is considered a <b>seed</b>. All rules are
        applied simoultaneously at the outset of the game which constitutes the first generation. Births and deaths happen
        instantaneously which can create a lot of interesting results!
      </p>
    </div>
  )
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      rules: true
    }
  }
  tabHandler = (tab) => {
    if(tab === "rules"){
      this.setState({rules: true})
    } else if (tab === "about"){
      this.setState({ rules: false })
    }
  }
  render() {
    return (
      <div className="App">
        <Game />
        <div className="tabs">
          <div onClick={() => this.tabHandler("rules")} className="tab">Rules</div>
          <div onClick={() => this.tabHandler("about")} className="tab">About</div>
        </div>
        {this.state.rules ? <Rules />: <About/>}
      </div>
    );
  }
}

export default App;
