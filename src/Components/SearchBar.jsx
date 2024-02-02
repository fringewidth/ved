import React from "react";
const placeholder = "search for papers, projects, etc.";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <label className="searchicon">
        <img src="src/assets/svg/search.svg" />
      </label>
      <input className="searchinput" placeholder={placeholder}></input>
    </div>
  );
}
