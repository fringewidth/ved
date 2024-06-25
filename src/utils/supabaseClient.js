import { createClient } from "@supabase/supabase-js";

// Returns the Supabase client instance
const getSupabase = () => {
  const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
};

export { getSupabase };
