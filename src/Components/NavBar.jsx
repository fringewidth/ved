import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import SearchBar from "./SearchBar";

export default function NavBar(props) {
  return (
    <div className="navbar">
      <Logo></Logo>
      <SearchBar></SearchBar>
      <Button children={["Sign Up"]}></Button>
    </div>
  );
}
