//props: buttons: array of button names

import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import SearchBar from "./SearchBar";
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";
import { Link } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div className="navbar">
      <Logo />
      <SearchBar />
      <div class="buttongroup">
        <Link to="/authenticate/:signup">
          <SignUpButton />
        </Link>
        <Link to="/authenticate/:login">
          <LoginButton />
        </Link>
      </div>
    </div>
  );
}
