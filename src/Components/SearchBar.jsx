import React from "react";
import searchIcon from "../assets/svg/search.svg";
const placeholder = "search for papers, projects, etc.";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <label className="searchicon">
        <img src={searchIcon} />
      </label>
      <input className="searchinput" placeholder={placeholder}></input>
    </div>
  );
}
