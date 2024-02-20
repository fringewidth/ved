//props: buttons: array of button names

import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";

export default function NavBar(props) {
  return (
    <div className="navbar">
      <Logo />
      <SearchBar />
      <div class="buttongroup">
        <SignUpButton />
        <LoginButton />
      </div>
    </div>
  );
}
