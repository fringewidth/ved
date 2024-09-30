import { useContext } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate, Link } from "react-router-dom";
import { sessionContext } from "../contexts/SessionProvider";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import BlueButton from "./BlueButton";

export default function NavBar() {
  const { session } = useContext(sessionContext);

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

  return (
    <div className="navbar">
      <Logo />
      <SearchBar />

      {!session && (
        <div className="buttongroup">
          <Link to="/authenticate/:signup">
            <BlueButton className="button" children={["Sign Up"]} />
          </Link>

          <Link to="/authenticate/:login">
            <BlueButton className="button" children={["Login"]} />
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
