import React from "react";
import searchIcon from "../assets/svg/search.svg";
const placeholder = "search for papers, projects, etc.";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    navigate(`/search/:${search}`);
  };

  return (
    <div className="searchbar">
      <label className="searchicon">
        <img src={searchIcon} />
      </label>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          className="searchinput"
          onChange={handleSearch}
          placeholder={placeholder}
        ></input>
      </form>
    </div>
  );
}
