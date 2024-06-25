import logo from "../assets/svg/logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logo">
      <img className="logoimage" src={logo} alt="logo.svg" />
      <div className="logotext">Ved</div>
    </Link>
  );
}
