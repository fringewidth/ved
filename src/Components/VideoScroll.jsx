import React, { useRef, useEffect, useState } from "react";

export default function VideoScroll(props) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState();

  const handleScroll = () => {
    if (props.parentRef.current && videoRef.current) {
      const parentOffsetTop = props.parentRef.current.offsetTop;
      const parentHeight = props.parentRef.current.clientHeight;
      const triggerFull =
        (parentHeight * props.triggerHeightPercentage) / 100 -
        window.innerHeight / 2;
      const scrolledHeight = window.scrollY;
      const timeToSeek = (duration * scrolledHeight) / triggerFull;
      if (videoRef.current.currentTime != triggerFull) {
        videoRef.current.currentTime = timeToSeek;
        videoRef.current.pause();
      }
    }
  };

  useEffect(() => {
    const handleMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };

    videoRef.current.addEventListener("loadedmetadata", handleMetadata);
    window.addEventListener("scroll", handleScroll);
  }, [duration]);

  return (
    <video ref={videoRef}>
      <source src={props.src} type="video/mp4" />
      <p>Inspired by the tradition of the Vedas,</p>
    </video>
  );
}
