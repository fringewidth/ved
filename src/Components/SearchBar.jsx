import React from "react";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <label className="searchicon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.4392 15.7169L24 22.2777L22.2777 24L15.7169 17.4392C14.0672 18.7217 11.9941 19.4854 9.74268 19.4854C4.36195 19.4854 0 15.1234 0 9.74268C0 4.36195 4.36195 0 9.74268 0C15.1234 0 19.4854 4.36195 19.4854 9.74268C19.4854 11.9941 18.7217 14.0672 17.4392 15.7169ZM9.74268 17.0497C13.7782 17.0497 17.0497 13.7782 17.0497 9.74268C17.0497 5.70713 13.7782 2.43567 9.74268 2.43567C5.70713 2.43567 2.43567 5.70713 2.43567 9.74268C2.43567 13.7782 5.70713 17.0497 9.74268 17.0497Z"
            fill="white"
          />
        </svg>
      </label>
      <input
        className="searchinput"
        placeholder="search for papers, projects, etc."
      ></input>
    </div>
  );
}
