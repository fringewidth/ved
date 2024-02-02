import React from "react";
import VideoScroll from "./VideoScroll";

export default function HeroContent() {
  return (
    <div className="herovideo">
      <VideoScroll src="src/assets/video/vedas-opening.mp4" />
      <div className="herotext">
        <p>
          Introducing <span className="specialtext">Ved.</span>
        </p>
        <p>A new way to do research.</p>
      </div>
    </div>
  );
}
