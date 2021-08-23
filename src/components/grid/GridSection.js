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
      <section aria-labelledby="grid-section-heading">
        <h2 id="grid-section-heading" className="visually-hidden">cell grid section</h2>


        <Grid>

          {/* sr header */}

          {this.props.currentNodeHolder.map((_row, index) => {
            return (


              <Row>
                {this.props.currentNodeHolder[index].map(col => {


                  return (
                    col.isAlive ?


                      <Col>

                        <button
                          onClick={this.props.canClick? () => this.toggleCell(col) : null}
                        >
                          <span className="visually-hidden">alive</span>
                        </button>
                        
                        </Col>

                      :

                      <Col dead>

                        <button
                          onClick={this.props.canClick? () => this.toggleCell(col) : null}
                        >
                          <span className="visually-hidden">dead</span>
                        </button>
                        
                        </Col>
                        
                    );
                  })}


              </Row>


            );
          })}


        </Grid>


      </section>
    );
  }
}

export default GridSection;
