import React, { useEffect, useState } from "react";
import Board from "../commons/Board";
import ChatComponent from "../assets/ActiveComponent";
import io from "socket.io-client";
import AccountService from "../services/account.service";
import { socket } from "../App";
import Chat from "../commons/Chat";
import "../assets/custom.css";
import { useParams } from "react-router-dom";
import Square from "../commons/Square";
import { constants } from "crypto";
// import "../assets/login.css";
const row = 20;
const col = 30;
function listToMatrix(list, elementsPerSubArray) {
  var matrix = [],
    i,
    k;

  for (i = 0, k = -1; i < list.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}
const checkWin = (square, just) => {
  const _square = listToMatrix(square, col);
  let cell = { x: Math.floor(just / col), y: just % col };
  if (
    isHorizontalCheck(_square, cell.x, cell.y) ||
    isVerticalCheck(_square, cell.x, cell.y) ||
    isPrimaryDiagCheck(_square, cell.x, cell.y) ||
    isSubDiagCheck(_square, cell.x, cell.y)
  ) {
    return [true, square[just]];
  }
  return [false, square[just]];
};
function isHorizontalCheck(square, i, j) {
  //int di = 0;
  let dj = -1; // Di qua trai
  //int startI = i;
  let startJ = j;
  //left
  let countLeft = 1;
  while (startJ + dj >= 0) {
    startJ += dj; // Di qua trai
    if (square[i][j] == square[i][startJ]) {
      // Tang bien dem
      countLeft++;
    } else {
      break;
    }
  }
  //right
  startJ = j;
  dj = 1;
  let countRight = 0;
  while (startJ + dj <= col) {
    startJ += dj; // Di qua phai
    if (square[i][j] == square[i][startJ]) {
      // Tang bien dem
      countRight++;
    } else {
      break;
    }
  }

  return countLeft + countRight == 5;
}

function isVerticalCheck(square, i, j) {
  let di = -1;
  let startI = i;
  //top
  let countTop = 1;
  while (startI + di >= 0) {
    startI += di; // Di len
    if (square[i][j] == square[startI][j]) {
      // Tang bien dem
      countTop++;
    } else {
      break;
    }
  }
  //right
  startI = i;
  di = 1;
  let countDown = 0;
  while (startI + di <= row) {
    startI += di; // Di xuong
    if (square[i][j] == square[startI][j]) {
      // Tang bien dem
      countDown++;
    } else {
      break;
    }
  }

  return countTop + countDown == 5;
}

function isPrimaryDiagCheck(square, i, j) {
  let di = -1;
  let dj = -1;
  let startI = i;
  let startJ = j;
  // .....
  let countTop = 1;
  while (startI + di >= 0 && startJ + dj >= 0) {
    startI += di; // Di len
    startJ += dj; // Đi qua trái
    if (square[startI][startJ] == square[i][j]) {
      // Tang bien dem
      countTop++;
    } else {
      break;
    }
  }
  //.....
  startI = i;
  di = 1;
  startJ = j;
  dj = 1;
  let countDown = 0;
  while (startI + di <= row && startJ + dj <= col) {
    startI += di; // Di xuong
    startJ += dj; // Đi qua phải
    if (square[startI][startJ] == square[i][j]) {
      // Tang bien dem
      countDown++;
    } else {
      break;
    }
  }

  return countTop + countDown == 5;
}

function isSubDiagCheck(square, i, j) {
  let di = -1;
  let dj = 1;
  let startI = i;
  let startJ = j;
  // .....
  let countTop = 1;
  while (startI + di >= 0 && startJ + dj <= col) {
    startI += di;
    startJ += dj;
    if (square[startI][startJ] == square[i][j]) {
      // Tang bien dem
      countTop++;
    } else {
      break;
    }
  }
  //.....
  startI = i;
  di = 1;
  startJ = j;
  dj = -1;
  let countDown = 0;
  while (startI + di <= row && startJ + dj >= 0) {
    startI += di;
    startJ += dj;
    if (square[startI][startJ] == square[i][j]) {
      // Tang bien dem
      countDown++;
    } else {
      break;
    }
  }

  return countTop + countDown == 5;
}
export default function Gamepage() {
  const { id } = useParams();
  const user = AccountService.getCurrentUserInfo();
  const [isInit, setIsInit] = useState(false);
  const temp = ["X", "O"];
  const [q, setQ] = useState(0);
  const [square, setSquare] = useState(Array(row * col).fill(null));
  const [isMyBall, setIsMyBall] = useState(false);
  const [end, setEnd] = useState(false);
  const handleClick = (i) => {
    MakeAMove(i);
    //let cell = { x: Math.floor(i / col), y: i % col };
    const [res, turn] = checkWin(square, i);
    if (res) {
      alert(`${turn} win`);
      setEnd(true);
    }
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
    console.log("moved");
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
      socket.emit(
        "caro-game",
        JSON.stringify({
          type: "moving",
          data: { gameId: id, move: i, board: newsquare, player: user },
        })
      );
      console.log(square);
    }, 500);
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <div className="game">
          <div className={`game-board `}>
            <div className={`${end ? "no-click" : ""}`}>
              <Board
                row={row}
                col={col}
                square={square}
                onClick={(i) => handleClick(i)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="game-board">
          <h3>Message</h3>
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
}
