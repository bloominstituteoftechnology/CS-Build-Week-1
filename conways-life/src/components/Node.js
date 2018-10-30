import React from 'react';

class Node extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activenode: false,
      nextnode: false
    }
  }
  handleclick = (e) => {
    this.setState({activenode: !this.state.activenode})
  }

  render() {
    return (
      <div className={this.state.activenode?"node active":"node"} 
        onClick={this.handleclick}>
      </div>
    )
  }
}

export default Node;