import React, { useRef } from "react";
import VideoScroll from "./VideoScroll";
import vedasAnimation from "../assets/video/vedas-opening.mp4";

export default function HeroContent() {
  const containerRef = useRef(null);
  return (
    <div class="herocontent" ref={containerRef}>
      <VideoScroll
        src={vedasAnimation}
        parentRef={containerRef}
        triggerHeightPercentage="80"
      />
      <div className="herotext">
        <p>
          Introducing <span className="specialtext">Ved.</span>
        </p>
        <p>A new way to do research.</p>
      </div>
    </div>
  );
}
