import React from "react";
import Button from "./Button";

export default function LandingFooter() {
  return (
    <footer class="landingfooter">
      <p class="specialtext footertext">Join the quest for knowledge.</p>
      <Button children={["Create an account"]} />
      <p>Created by Hrishik Sai.</p>
    </footer>
  );
}
