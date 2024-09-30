import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

const sessionContext = React.createContext();

// Provides user session information to the app
export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const getUsernameFromEmail = async (email) => {
      const { data, error } = await supabase
        .from("researchers")
        .select("username")
        .eq("email", session?.user.email);
      if (error) console.log(error);
      if (data && data.length > 0) {
        setSession({ ...session, username: data[0].username });
      }
    };
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
      }
    );

    if (session && session.user && !session.user.username)
      getUsernameFromEmail(session?.user.email);
  }, []);

  return (
    <sessionContext.Provider value={{ session, setSession }}>
      {children}
    </sessionContext.Provider>
  );
}
export { sessionContext };
