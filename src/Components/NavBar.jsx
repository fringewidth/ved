import { useContext } from "react";
import { getSupabase } from "../utils/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { sessionContext } from "../contexts/SessionProvider";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import BlueButton from "./BlueButton";

const supabase = getSupabase();

export default function NavBar() {
  const { session } = useContext(sessionContext);

  const navigate = useNavigate();
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="navbar">
      <Logo />
      <SearchBar />

      {!session && (
        <div class="buttongroup">
          <Link to="/authenticate/:signup">
            <BlueButton class="button" children={["Sign Up"]} />
          </Link>

          <Link to="/authenticate/:login">
            <BlueButton class="button" children={["Login"]} />
          </Link>
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
