import React from "react";
import Square from "./Square";

export default function Board(props) {
  const createBoard = (row, col) => {
    const board = [];
    let cellCounter = 0;
    console.log(props.winRow);
    for (let i = 0; i < row; i += 1) {
      const columns = [];
      for (let j = 0; j < col; j += 1) {
        columns.push(renderSquare(cellCounter++));
      }
      board.push(
        <div key={i} className='board-row'>
          {columns}
        </div>
      );
    }

    return board;
  };
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={props.square[i]}
        onClick={() => props.onClick(i)}
        isWinCell={props.winRow && props.winRow.includes(i)}
      />
    );
  };
  return (
    <div className="container">
      <div>{createBoard(props.row, props.col, props.indx)}</div>
    </div>
  );
}
