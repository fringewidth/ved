import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";

const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function NavBar(props) {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
      window.location.reload();
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setSession(data?.session);
  };

  return (
    <div className="navbar">
      <Logo />
      <SearchBar />
      {!session && (
        <div class="buttongroup">
          <SignUpButton />
          <LoginButton />
        </div>
      )}
      {session && (
        <button className="signout button" onClick={signOut}>
          Sign Out
        </button>
      )}
    </div>
  );
}
