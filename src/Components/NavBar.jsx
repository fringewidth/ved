//props: buttons: array of button names

import React, { useEffect } from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import SignUpButton from "./SignUpButton";
import LoginButton from "./LoginButton";
import { createClient } from "@supabase/supabase-js/dist/module";
const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import { useState } from "react";
import SignOutButton from "./SignOutButton";

export default function NavBar(props) {
  const [session, setSession] = useState(null);
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
      {session && <SignOutButton />}
    </div>
  );
}
