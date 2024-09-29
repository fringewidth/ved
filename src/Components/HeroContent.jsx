import { useRef } from "react";
import VideoScroll from "./VideoScroll";
import vedasAnimation from "../assets/video/vedas-opening.mp4";

export default function HeroContent() {
  const heroRef = useRef(null);
  return (
    <div className="herocontent" ref={heroRef}>
      <VideoScroll
        src={vedasAnimation}
        parentRef={heroRef}
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
