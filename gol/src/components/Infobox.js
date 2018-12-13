import React, { Component } from "react";

export default class Infobox extends Component {
  render() {
    return (
      <div className="infobox">
        <div className="rules">
          Rules:
          <ol>
            <li>If a living cell is has fewer then two neighbors it dies </li>
            <li>If a living cell is has more then three neighbors it dies </li>
            <li>If a living cell is has two or three neighbors it lives on </li>
            <li>If a dead cell has three neighbors it lives </li>
          </ol>
        </div>
        <div className="about">
          About:
          <br />A turning complete simulation of automated cellular reproduction
          first created in the late 60s by John Conway. He experimented with
          several rule sets before deciding on the rules implented here. Since
          then many have discovered many patterns that yeild interesting
          results. The more common ones have been added as presets here.
        </div>
      </div>
    );
  }
}
