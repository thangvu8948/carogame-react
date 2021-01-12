import React from "react";

const Square = (props) => (
  <button className={`square square-${props.value}`} style={{backgroundColor:`${props.isWinCell ? "yellow" : ""}`}} onClick={props.onClick}>
    {props.value}
  </button>
);

export default Square;
