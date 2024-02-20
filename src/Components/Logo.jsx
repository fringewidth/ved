import React from "react";
import logo from "../assets/svg/logo.svg";

export default function Logo(props) {
  return (
    <div className="logo">
      <img className="logoimage" src={logo} alt="logo.svg" />
      <div className="logotext">Ved</div>
    </div>
  );
}
