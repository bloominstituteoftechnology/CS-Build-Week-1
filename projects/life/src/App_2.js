import React, { Component } from 'react';
import { render } from 'react-dom';

import Life from './life';

import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';

class LifeStage extends React.Component {
  constructor(props) {
    super(props);

    this.life = new Life(props.width, props.height);
    this.life.randomize();

    this.group = new Konva.Group();

    this.state = {
      color: 'green',
      group: [
        <Rect x={10} y={10} width={2} height={2} fill="green" />,
        <Rect x={20} y={10} width={2} height={2} fill="green" />,
        <Rect x={30} y={10} width={2} height={2} fill="green" />,
      ],
    };
  }
  componentDidMount() {
    const rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: 10,
      height: 10,
      fill: 'green',
    });
    this.group.add(rect);
    requestAnimationFrame(() => {
      this.animFrame();
    });
  }

  animFrame() {
    // console.log(this.props.height);
    this.group = new Konva.Group();
    this.setState({ group: [] });

    const cells = this.life.getCells();
    const height = this.props.height;
    const width = this.props.width;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const state = cells[y][x];
        const color = this.state.color;
        const index = (y * width + x) * 4;
        const rect = new Konva.Rect({
          x: `${x}`,
          y: `${y}`,
          width: 1,
          height: 1,
          fill: `${this.state.color}`,
        });
        this.group.add(rect);
        // this.state.group.push(
        //   <Rect x={x} y={y} width={1} height={1} fill={this.state.color} />
        // );
      }
    }
    // Update life and get cells
    this.life.step();

    console.log(this.group.children);
    // console.log(this.state.group);
    // Request another animation frame
    // requestAnimationFrame(() => {
    //   this.animFrame();
    // });
    // Next generation of life
  }

  render() {
    return (
      <Group ref="Stage">
        {this.group.children.map(c => {
          return c;
        })}
      </Group>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Stage width={window.innerWidth - 100} height={window.innerHeight - 100}>
        <Layer>
          {/* <Text text="Try click on rect" /> */}
          <LifeStage width={25} height={25} />
        </Layer>
      </Stage>
    );
  }
}

export default App;
