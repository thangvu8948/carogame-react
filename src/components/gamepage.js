import React, { useEffect, useState } from "react";
import Board from "../commons/Board";
import ChatComponent from "../assets/ActiveComponent";
import io from "socket.io-client";
import AccountService from "../services/account.service";
import { socket } from "../App";
import Chat from "../commons/Chat";
import "../assets/custom.css";
import { useParams } from "react-router-dom";
// import "../assets/login.css";
export default function Gamepage() {
  const { id } = useParams();
  const user = AccountService.getCurrentUserInfo();
  const [isInit, setIsInit] = useState(false);
  const temp = ["X", "O"];
  const [q, setQ] = useState(0);
  const [square, setSquare] = useState(Array(10 * 20).fill(null));
  const [isMyBall, setIsMyBall] = useState(false);
  const handleClick = (i) => {
    MakeAMove(i);
    //let cell = { x: Math.floor(i / 20), y: i % 20 };

  };

  useEffect(() => {
    if (!isInit) {
      socket.emit(
        "caro-game",
        JSON.stringify({
          type: "join-room",
          data: { gameId: id, player: user },
        })
      );
      setIsInit(true);
    }
    socket.on("caro-game", (msg) => {
      msg = JSON.parse(msg);
      switch (msg.type) {
        case "you-joined":
          YouJoinedGameHandler(msg);
          break;
        case "player-joined":
          PlayerJoinedGameHandler(msg);
          break;
        case "player-left":
          PlayerLeftGameHandler(msg);
          break;
        case "room-no-valid":
          RoomNoValidHandler(msg);
        case "moved":
          MovedHandler(msg);
      }
    });
  }, []);

  function YouJoinedGameHandler(msg) {
    alert("you joined");
  }

  function PlayerJoinedGameHandler(msg) {
    console.log(msg);
    alert(msg.data.player.Username + " joined");
  }

  function PlayerLeftGameHandler(msg) {
    alert("player left");
  }

  function RoomNoValidHandler(msg) {
    alert("this room is not valid");
  }

  function MovedHandler(msg) {
    console.log("moved")
    const move = msg.data.board;
    MakeAMove2(move);
  }

  function MakeAMove2(i) {
    setQ(1 - q);
    setSquare(i);
    console.log(square);
  }

  function MakeAMove(i) {
    let newsquare = square.map((x) => x);

    if (!newsquare[i]) {
      newsquare[i] = temp[q];
    }
    setQ(1 - q);
    setSquare(newsquare);
    setTimeout(() => {
      socket.emit('caro-game', JSON.stringify({ type: "moving", data: { gameId: id, move: i, board: newsquare, player: user } }));
      console.log(square);
    }, 500)

  }

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
