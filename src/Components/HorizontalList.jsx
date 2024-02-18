import React from "react";
import HorizontalListItem from "./HorizontalListItem.jsx";

export default function HorizontalList(props) {
  const HorizontalListItems = props.items.map((item) => (
    <HorizontalListItem item={item} />
  ));

  return <ul class="horlist">{HorizontalListItems}</ul>;
}
