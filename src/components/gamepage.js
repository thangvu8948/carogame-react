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
export default function Gamepage(props) {
  const [row, setRow] = useState(20);
  const [col, setCol] = useState(30);
  const { id } = useParams();
  const user = AccountService.getCurrentUserInfo();
  const [isInit, setIsInit] = useState(false);
  const temp = ["", "X", "O"];
  const [q, setQ] = useState(0);
  const [square, setSquare] = useState(Array(row * col).fill(null));
  const [isMyBall, setIsMyBall] = useState(false);
  const [isValidRoom, setIsValidRoom] = useState(true);
  const [end, setEnd] = useState(true);
  const [players, setPlayers] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = (i) => {
    MakeAMove(i);
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
  }, [])

  useEffect(() => {
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
          break;
        case "moved":
          //console.log("moved abc ");
          MovedHandler(msg);
          break;
        case "moved-guest":
          MovedGuestHandler(msg);
          break;
        case "player-existed":
          PlayerExisted(msg);
          break;
        case "player-ready":
          PlayerReadyHandler(msg);
          break;
        case "game-start":
          GameStartHandler(msg);
          break;
        case "game-start-for-players":
          GameStartForPlayers(msg);
          break;
        case "game-end":
          GameEndHandler(msg);
          break;
        case "win-game":
          WinGameHandler(msg);
          break;
        case "lose-game":
          LoseGameHandler(msg);
          break;
      }
    });
    return (() => {
      socket.off("caro-game")
    })
  }, [end, isReady, isPlaying]);

  function YouJoinedGameHandler(msg) {
    setPlayers(msg.data.players);
    const game = msg.data.game;
    setRow(game.row);
    setCol(game.col);
  }

  function PlayerJoinedGameHandler(msg) {
    console.log(msg);
    setPlayers(msg.data.players);
  }

  function PlayerLeftGameHandler(msg) {
    //alert("player left");
    alert (msg.data.player.name + " left game.");
    setPlayers(msg.data.players);
  }

  function RoomNoValidHandler(msg) {
    setIsValidRoom(false);
  }

  function PlayerExisted(msg) {
    alert("Player existed")
    window.location.href = "/";
  }

  function PlayerReadyHandler(msg) {
    setPlayers(msg.data.players);
  }

  function MovedHandler(msg) {
    console.log("moved");
    //const board = msg.data.board;
    const sign = msg.data.sign;
    const move = msg.data.move;
    MakeAMove2(move, sign);
  }

  function MovedGuestHandler(msg) {
    const board = msg.data.board;
    setSquare(square => [...board]);
  }
  function MakeAMove2(move, sign) {
    //setSquare(board);
    //let newsquare = square.map((x) => x);
    let newsquare = [...square];
    newsquare[move] = sign;
    //console.log(newsquare)
    console.log("change status");
    setSquare(square => [...newsquare]);
    if (isReady) {
      setEnd(false);
    }
    console.log(isReady);
    console.log(end);
    // setTimeout(() => {
    //   const [res, turn] = checkWin(board, move);
    //   if (res) {
    //     alert(`${turn} win`)
    //     setEnd(true);
    //   }
    // }, 10)
  }

  function MakeAMove(i) {
    let newsquare = [...square];

    if (!newsquare[i]) {
      newsquare[i] = temp[q];
      setSquare(newsquare);
      setEnd(true);

      socket.emit(
        "caro-game",
        JSON.stringify({
          type: "moving",
          data: { gameId: id, move: i, board: newsquare, player: user, sign: temp[q] },
        })
      );
    }

    //console.log(square);
    //const [res, turn] = checkWin(newsquare, i);
    // if (res) {
    //   alert(`${turn} win`);
    //   setEnd(true);
    // }
  }

  function ReadyHandler(msg) {
    if (!isReady && !isPlaying) {
      setIsReady(true);
      socket.emit('caro-game', JSON.stringify({ type: "ready", data: { gameId: id, player: user } }));
    }
    console.log(isReady);
  }

  const GameStartHandler = (msg) => {
    console.log("start game")
    setIsPlaying(true);
    const newBoard = new Array(row * col).fill(null);
    setSquare(square.fill(null));
    props.fInGame(true);
  }

  const GameStartForPlayers = (msg) => {
    let ownedBall = msg.data.ball;
    
    if (ownedBall.id == user.ID) {
      setQ(1);
      setEnd(false);
    } else {
      setQ(2);
      setEnd(true)
    }
  }

  const GameEndHandler = (msg) => {
    console.log("endgame")
    setEnd(true);
    setIsReady(false);
    setIsPlaying(false);
    props.fInGame(false);
  }

  const WinGameHandler = (msg) => {
    alert("You win");
  }

  const LoseGameHandler = (msg) => {
    alert ("You lose");
  }
  return (
    <>
      {isValidRoom ?
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
            <button type="button" onClick={ReadyHandler} class={!isReady ? "btn btn-primary" : "btn btn-secondary"} disabled={isPlaying || isReady}>Ready</button>
            <div>
              Player list
                <ol>
                {players.map((player) => {
                  return (
                    <li>
                      {player.ready ? (
                        <b>{player.name}</b>
                      ) : (
                          <p>{player.name}</p>
                        )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          <div className="col-md-4">
            <div className="game-board">
              <h3>Message</h3>
              <Chat></Chat>
            </div>
          </div>
        </div> :
        <div>Room ID is invalid</div>}
    </>
  );
}
