import React, { useState, useEffect } from "react";

export default function Popup(props) {
  return (
    <div className="overlay">
      <div className="form popup">
        <h1>{props.header}</h1>
        <p>{props.content}</p>
        <div className="buttongroup">
          {props.buttons?.map((button) => {
            return (
              <button class={button.class} onClick={button.onClick}>
                {button.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
