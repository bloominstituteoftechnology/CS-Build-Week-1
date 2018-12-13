import React from "react";
import {connect} from 'react-redux'; 

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
}


onClickHandler = event => {
      if(!this.props.isRunning){
        this.setState({
            active: !this.state.active
          });
      }
  };

  render() {
    return (
      <div
        onClick={this.onClickHandler}
        className={`box ${this.state.active ? "on" : "off"}`}
      ></div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        isRunning: state.isRunning
    }
}

export default connect(mapStateToProps, {})(Box);
