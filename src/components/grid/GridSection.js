import React, { Component } from 'react';

import { Grid, Row, Col } from './GridSectionStyles';


class GridSection extends Component {

  toggleCell = (col) => {
    if (col.isAlive) {
      col.isAlive = false;
    } else {
      col.isAlive = true;
    }
    this.forceUpdate()
  }

  render() {
    return (
      <Grid>
        {this.props.currentNodeHolder.map((row, index) => {
          return (
            <Row>
              {this.props.currentNodeHolder[index].map(col => {
                return (
                  col.isAlive ? <Col onClick={this.props.canClick? () => this.toggleCell(col) : null}></Col> : <Col dead onClick={this.props.canClick? () => this.toggleCell(col) : null}></Col>
                  );
                })}
            </Row>
          );
        })}
      </Grid>
    );
  }
}

export default GridSection;
