import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    height: "500px",
    width: "100vw"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class Gamemenu extends Component {
  state = {
    expanded: null
  };

  handleChange = panel => (e, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  render() {
    const { expanded } = this.state;
    const {
      classes: { root, heading, secondaryHeading }
    } = this.props;
    return (
      <div className={root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Rules</Typography>
            <Typography className={secondaryHeading}>
              How the Game is Played
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              The Game of Life is a Zero player game where every cell is
              considered alive or dead. Each generation cells are born, stay
              alive, or die based on simple rules.
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Typography variant="subtitle2">
              1. Any live cell with fewer than two live neighbors dies, as if by
              underpopulation
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Typography variant="subtitle2">
              2. Any live cell with two or three live neighbors lives on to the
              next generation
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Typography variant="subtitle2">
              3. Any live cell with more than three live neighbors dies, as if
              by overpopulation
            </Typography>
          </ExpansionPanelDetails>
          <ExpansionPanelDetails>
            <Typography variant="subtitle2">
              4. Any dead cell with exactly three live neighbors becomes a live
              cell, as if by reproduction
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleChange("panel2")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Controls</Typography>
            <Typography className={secondaryHeading}>
              This implementation
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              This implementation is fairly basic. The play button starts and
              stops the animation. Only the speed may be changed while playing.
              When the animation is not running click a cell to toggle between
              alive and dead. The board is not infinite, or looping. Anything
              outside the bounds of the game board is considered dead.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={this.handleChange("panel3")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Oscillators</Typography>
            <Typography className={secondaryHeading}>
              The Looping Shape Type
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Oscillators are patterns that rotate through a repeating set of
              states. The number of states in the rotation is the periodicity.
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelDetails>
            <img
              src={require("./static/blinker.gif")}
              alt="blinker oscillator"
            />
            <img src={require("./static/toad.gif")} alt="toad oscillator" />
            <img src={require("./static/beacon.gif")} alt="beacon oscillator" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel4"}
          onChange={this.handleChange("panel4")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Spaceships</Typography>
            <Typography className={secondaryHeading}>
              The Looping and Moving Shape Type
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Spaceships are Oscillators that move across the board as it loops
              through it's states.
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelDetails>
            <img
              src={require("./static/light-spaceship.gif")}
              alt="lightweight spaceship"
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel5"}
          onChange={this.handleChange("panel5")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Guns</Typography>
            <Typography className={secondaryHeading}>
              The PewPew Shape Type
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              A gun is a pattern that emits moving patterns from itself. The
              first one ever discovered was the Gosper Glider Gun by Bill
              Gosper. (See top portion of example image below)
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelDetails>
            <img src={require("./static/gun:eater.gif")} alt="Gun with Eater" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel6"}
          onChange={this.handleChange("panel6")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Still Life</Typography>
            <Typography className={secondaryHeading}>
              The Boring Shape Type
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              A Still Life is a pattern that has reached equilibrium. It doesn't
              change between generations until acted on by an outside force.
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelDetails>
            <img src={require("./static/block.png")} alt="block pattern" />
            <img src={require("./static/beehive.png")} alt="beehive pattern" />
            <img src={require("./static/loaf.png")} alt="loaf pattern" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel7"}
          onChange={this.handleChange("panel7")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Eater</Typography>
            <Typography className={secondaryHeading}>
              The NomNom Shape Type
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              An Eater is a still life that can interact with other shapes
              without suffering permamnent damage. They can often be used to
              destroy the patterns shot out by guns. (See the bottom of example
              image, where the eater destroys the glider produced by a gun)
            </Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelDetails>
            <img src={require("./static/gun:eater.gif")} alt="Gun with Eater" />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel8"}
          onChange={this.handleChange("panel8")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={heading}>Methuselah</Typography>
            <Typography className={secondaryHeading}>
              The Badass Shape Type
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Methuselah patterns start small and then take a significant number
              of generations to stabilize, becoming much larger than they
              started.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Gamemenu);
