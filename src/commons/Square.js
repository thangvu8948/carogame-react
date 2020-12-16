import React from "react";

const Square = (props) => (
  <button className={`square square-${props.value}`} onClick={props.onClick}>
    {props.value}
  </button>
);

export default Square;
