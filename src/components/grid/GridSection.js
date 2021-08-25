import React, { Component } from "react";
import { Grid, Row, Col, CellButton } from "./GridSectionStyles";

class GridSection extends Component {
  toggleCell = (col) => {
    if (col.isAlive) {
      col.isAlive = false;
    } else {
      col.isAlive = true;
    }
    this.forceUpdate();
  };

  render() {
    return (
      <section aria-labelledby="grid-section-heading">
        <h2 id="grid-section-heading" className="visually-hidden">
          cell grid section
        </h2>

        <Grid>
          {this.props.currentNodeHolder.map((_row, index) => {
            return (
              <Row key={`row-${index}`}>
                {this.props.currentNodeHolder[index].map((col) => {
                  return col.isAlive ? (
                    <Col>
                      <CellButton
                        onClick={
                          this.props.canClick
                            ? () => this.toggleCell(col)
                            : null
                        }
                      >
                        <span className="visually-hidden">alive</span>
                      </CellButton>
                    </Col>
                  ) : (
                    <Col dead>
                      <CellButton
                        onClick={
                          this.props.canClick
                            ? () => this.toggleCell(col)
                            : null
                        }
                      >
                        <span className="visually-hidden">dead</span>
                      </CellButton>
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
