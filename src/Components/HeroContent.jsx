import React, { useRef } from "react";
import VideoScroll from "./VideoScroll";

export default function HeroContent() {
  const containerRef = useRef(null);
  return (
    <div className="herocontent" ref={containerRef}>
      <VideoScroll
        src="src/assets/video/vedas-opening.mp4"
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
