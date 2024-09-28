import React, { useState, useEffect } from "react";
import { getSupabase } from "../utils/supabaseClient";

const supabase = getSupabase();

export default function UserSearch(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearchInput, setDebouncedSearchInput] = useState("");

  useEffect(() => {
    const hanlder = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
    }, 350); // average person types at 40wpm which translates to 300 ms per character.

    return () => {
      clearTimeout(hanlder);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput) {
      findUsernames(debouncedSearchInput);
    } else setData([]);
  }, [debouncedSearchInput]);

  const findUsernames = async (query) => {
    setLoading(true);
    const { data, error } = await supabase.rpc(
      "find_usernames",
      {
        query: query,
      },
      {
        returnType: "array",
      }
    );
    if (error) {
      console.error(error);
    }
    setData(data);
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleUserClick = (e) => {
    props.setShowUserSearch(false);
    const selectedUsername =
      e.target.querySelector(".usersearch_username")?.innerText.slice(1) ||
      e.target.parentNode
        .querySelector(".usersearch_username")
        ?.innerText.slice(1) ||
      null;
    if (selectedUsername) {
      props.setSelected(selectedUsername);
    }
  };

  return (
    <div class="usersearch">
      <input
        type="text"
        onChange={handleSearchChange}
        className="input"
        placeholder="Search users"
      />
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : (
          data &&
          data.map((user) => (
            <li onClick={handleUserClick}>
              <div className="projauthorname">{user.full_name}</div>
              <span className="projauthoraffl usersearch_username">
                @{user.username}
              </span>
              <span className="projauthoraffl"> &bull; </span>
              <span className="projauthoraffl">{user.affiliation}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
