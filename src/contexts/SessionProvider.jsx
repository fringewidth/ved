import React, { useState, useEffect } from "react";
import { getSupabase } from "../utils/supabaseClient";

const supabase = getSupabase();
const sessionContext = React.createContext();

// Provides user session information to the app
export default function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
      }
    );
  }, []);

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
    getUsernameFromEmail(session?.user.email);
  }, [session]);

  return (
    <sessionContext.Provider value={{ session, setSession }}>
      {children}
    </sessionContext.Provider>
  );
}
export { sessionContext };
