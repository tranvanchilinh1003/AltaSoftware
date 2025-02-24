import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <header className="header">
      <div className="nav">
        <div className="container">
          <Link className="btn" to="/video1">Video1</Link>
          <Link className="btn" to="/video2">Video2</Link>
          <svg
            className="outline"
            overflow="visible"
            width="100%"
            height="60"
            viewBox="0 0 100% 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="rect"
              pathLength="100"
              x="0"
              y="0"
              width="100%"
              height="60"
              fill="transparent"
              strokeWidth="5"
            ></rect>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
