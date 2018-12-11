import React from "react";

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false, 
      running: this.props.runningGame
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
        key={this.props.id}

        className={`box ${this.state.active ? "on" : "off"}`}
      />
    );
  }
}

export default Box;
