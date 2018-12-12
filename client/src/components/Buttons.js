import React, { Component } from "react";
import {
  ButtonToolbar,
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem
} from "react-bootstrap";

class Buttons extends Component {
  handleSelect = evt => {
    this.props.gridSize(evt);
  };

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
          <Button bsStyle="info" onClick={this.props.playButton}>
            Play
          </Button>
          <Button bsStyle="info" onClick={this.props.stopButton}>
            Pause
          </Button>
          <Button bsStyle="info" onClick={this.props.clear}>
            Clear
          </Button>
          <Button bsStyle="info" onClick={this.props.slow}>
            Slow
          </Button>
          <Button bsStyle="info" onClick={this.props.fast}>
            Fast
          </Button>
          <Button bsStyle="info" onClick={this.props.seed}>
            Seed
          </Button>
          <ButtonGroup>
            <DropdownButton
              title="Grid Size"
              id="size-menu"
              onSelect={this.handleSelect}
              bsStyle="info"
            >
              <MenuItem eventKey="1">15x15</MenuItem>
              <MenuItem eventKey="2">30x20</MenuItem>
              <MenuItem eventKey="3">50x30</MenuItem>
            </DropdownButton>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
