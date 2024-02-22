import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function LandingFooter() {
  return (
    <footer class="landingfooter">
      <p class="specialtext footertext">Join the quest for knowledge.</p>
      <Link to="/authenticate/:signup">
        <Button children={["Create an account"]} />
      </Link>
      <p>Created by Hrishik Sai and Lavanya N.</p>
    </footer>
  );
}
