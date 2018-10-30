import React from 'react';
import Node from './Node';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: []
    }
  }

  componentDidMount() {
    let nodes = [];
    for (let i=0; i<798; i++) {
      nodes.push(<Node id={i} nodes={nodes} />)
    }
    this.setState({ nodes });
  }

  render() {
    return (
      <div className='grid'> {this.state.nodes} </div>
    );
  }
}

export default Grid;