import React from "react";
import { Link } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
  return (
    <div className="intro-page">
      <p>Welcome To The Game of Life</p>
      <img src="https://i.stack.imgur.com/mz0iM.gif" width="350px" height="350px" />
      <div className="buttons">
        <Link className="btn btn-success" to="/board">
          Play
        </Link>
        <a className="btn btn-secondary" href="https://ghoulish-broomstick-24706.herokuapp.com/">
          Learn More
        </a>
      </div>
    </div>
  );
};

export default Intro;
