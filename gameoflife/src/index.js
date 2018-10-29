import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Grid extends React.Component {
  render() {
    return <div>Grid</div>;
  }
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      generations: 0
    };
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <Grid />
        <h2>Generations: {this.state.generations}</h2>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
