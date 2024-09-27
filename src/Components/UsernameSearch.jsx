import React, { useState, useEffect } from "react";
import { getSupabase } from "../utils/supabaseClient";

const supabase = getSupabase();

export default function UsernameSearch() {
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

  return (
    <>
      <input type="text" onChange={handleSearchChange} className="input" />
      <ul className="input">
        {loading ? (
          <li>Loading...</li>
        ) : (
          data && data.map((user) => <li key={user}>{user.username}</li>)
        )}
      </ul>
    </>
  );
}
