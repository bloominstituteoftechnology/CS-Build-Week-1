import React from "react";

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false, 
      running: this.props.runningGame, 
      coordinates: this.props.coordinates
    };
}

 componentDidMount(){
     this.setState({
         running: this.props.runningGame
     })
 }

 componentWillReceiveProps(newProps){
    this.setState({running: newProps.runningGame})
 }

  onClickHandler = event => {
      if(!this.state.running){
        this.setState({
            active: !this.state.active
          });
      }
  };

  render() {
    return (
      <div
        onClick={this.onClickHandler}
        active = {this.state.active}
        className={`box ${this.state.active ? "on" : "off"}`}
      ></div>
    );
  }
}

export default Box;
