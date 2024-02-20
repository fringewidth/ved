//props: buttons: array of button names

import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import SearchBar from "./SearchBar";

export default function NavBar(props) {
  console.log(props.buttons);
  const buttongroup = props.buttons ? (
    <div className="buttongroup">
      {props.buttons.map((button) => {
        return <Button children={button}></Button>;
      })}
    </div>
  ) : null;
  return (
    <div className="navbar">
      <Logo></Logo>
      <SearchBar></SearchBar>
      {buttongroup}
    </div>
  );
}
