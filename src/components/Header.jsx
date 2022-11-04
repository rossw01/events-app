import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <a>
        <img
          className="header-logo"
          src={require("./event-it-logo.png")}
          alt={"event it logo"}
        />
      </a>
      <div>
        <button className="login-btn">Login</button>
        <button className="register-btn ">Register</button>
      </div>
    </div>
  );
};

export default Header;
