import React from "react";

export default function VideoScroll(props) {
  return (
    <video src={props.src} muted controls>
      <p>Inspired by the tradition of the Vedas,</p>
    </video>
  );
}
