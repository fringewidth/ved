import BlueButton from "./BlueButton";
import { Link } from "react-router-dom";

export default function LandingFooter() {
  return (
    <footer class="landingfooter">
      <p class="specialtext footertext">Join the quest for knowledge.</p>
      <Link to="/authenticate/:signup">
        <BlueButton children={["Create an account"]} />
      </Link>
      <p>Created by Hrishik Sai.</p>
    </footer>
  );
}
