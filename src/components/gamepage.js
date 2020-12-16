import React, { useEffect, useState } from "react";
import Board from "../commons/Board";
import ChatComponent from "../assets/ActiveComponent";
import io from "socket.io-client";
import AccountService from "../services/account.service";
import { socket } from "../App";
import Chat from "../commons/Chat";
import "../assets/custom.css";
export default function Gamepage() {
  const temp = ["X", "O"];
  const [q, setQ] = useState(0);
  const [square, setSquare] = useState(Array(10 * 20).fill(null));
  const handleClick = (i) => {
    const newsquare = [...square];
    if (newsquare[i] == null) {
      newsquare[i] = temp[q];
    }
    setQ(1 - q);
    setSquare(newsquare);
    console.log(newsquare);
    let cell = { x: Math.floor(i / 20), y: i % 20 };
  };
  return (
    <div className="row">
      <div className="col-md-8">
        <div className="game">
          <div className="game-board">
            <Board
              row={10}
              col={20}
              square={square}
              onClick={(i) => handleClick(i)}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <Chat></Chat>
      </div>
    </div>
  );
}
