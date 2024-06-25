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

  return (
    <sessionContext.Provider value={{ session, setSession }}>
      {children}
    </sessionContext.Provider>
  );
}
export { sessionContext };
