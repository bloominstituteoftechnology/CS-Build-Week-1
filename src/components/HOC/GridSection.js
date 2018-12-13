import React, { Component } from 'react';


// grid section - dark bg and dead cells, neon dark cell borders for all cells
// neon bright alive cells
// 4:3 aspect ratio cells desktop, and more tower-like for mobile

// bottom section - controls, dark colors


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
      <section>
        {this.props.currentNodeHolder.map((row, index) => {
          return (
            <article>
              {this.props.currentNodeHolder[index].map(col => {
                return (
                  col.isAlive ? <span onClick={this.props.canClick? () => this.toggleCell(col) : null}> 1 </span> : <span onClick={this.props.canClick? () => this.toggleCell(col) : null}> 0 </span>
                  );
                })}
            </article>
          );
        })}
      </section>
    );
  }
}

export default GridSection;
