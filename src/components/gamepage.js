import React, { useEffect, useState } from "react";
import Board from "../commons/Board";
import ChatComponent from "../assets/ActiveComponent";
import io from "socket.io-client";
import AccountService from "../services/account.service";
import { socket } from "../App";
import Chat from "../commons/Chat";
import "../assets/custom.css";
import { Modal, Button, Toast, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom";
import Square from "../commons/Square";
import { constants } from "crypto";
// import "../assets/login.css";
/* const row = 20;
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
  int di = 0;
  let dj = -1; // Di qua trai
  int startI = i;
  let startJ = j;
  left
  let countLeft = 1;
  while (startJ + dj >= 0) {
    startJ += dj; // Di qua trai
    if (square[i][j] == square[i][startJ]) {
      Tang bien dem
      countLeft++;
    } else {
      break;
    }
  }
  right
  startJ = j;
  dj = 1;
  let countRight = 0;
  while (startJ + dj <= col) {
    startJ += dj; // Di qua phai
    if (square[i][j] == square[i][startJ]) {
      Tang bien dem
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
  top
  let countTop = 1;
  while (startI + di >= 0) {
    startI += di; // Di len
    if (square[i][j] == square[startI][j]) {
      Tang bien dem
      countTop++;
    } else {
      break;
    }
  }
  right
  startI = i;
  di = 1;
  let countDown = 0;
  while (startI + di <= row) {
    startI += di; // Di xuong
    if (square[i][j] == square[startI][j]) {
      Tang bien dem
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
  .....
  let countTop = 1;
  while (startI + di >= 0 && startJ + dj >= 0) {
    startI += di; // Di len
    startJ += dj; // Đi qua trái
    if (square[startI][startJ] == square[i][j]) {
      Tang bien dem
      countTop++;
    } else {
      break;
    }
  }
  .....
  startI = i;
  di = 1;
  startJ = j;
  dj = 1;
  let countDown = 0;
  while (startI + di <= row && startJ + dj <= col) {
    startI += di; // Di xuong
    startJ += dj; // Đi qua phải
    if (square[startI][startJ] == square[i][j]) {
      Tang bien dem
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
  .....
  let countTop = 1;
  while (startI + di >= 0 && startJ + dj <= col) {
    startI += di;
    startJ += dj;
    if (square[startI][startJ] == square[i][j]) {
      Tang bien dem
      countTop++;
    } else {
      break;
    }
  }
  .....
  startI = i;
  di = 1;
  startJ = j;
  dj = -1;
  let countDown = 0;
  while (startI + di <= row && startJ + dj >= 0) {
    startI += di;
    startJ += dj;
    if (square[startI][startJ] == square[i][j]) {
      Tang bien dem
      countDown++;
    } else {
      break;
    }
  }

  return countTop + countDown == 5;
} */
export default function Gamepage(props) {
  const COUNT_TIME = 15;
  const [row, setRow] = useState(20);
  const [col, setCol] = useState(30);
  const [winRow, setWinRow] = useState([]);
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
  const [showDrawModal, setShowDrawModal] = useState(false);
  const [showDrawDeniedToast, setShowDrawDeniedToast] = useState(false);
  const [showWaitForSave, setShowWaitForSave] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [drawRequesting, setDrawRequesting] = useState(false);
  const [seconds, setSeconds] = useState(COUNT_TIME);
  const [timerStop, setTimerStop] = useState(true);
  const [withdrawing, setWithdrawing] = useState(false);
  let timer = null;
  const handleClick = (i) => {
    MakeAMove(i);
  };

  useEffect(() => {
    if (timerStop || seconds < 0 || showDrawModal) return;
    const itv = setInterval(() => {
      setSeconds(seconds -1);
      console.log(seconds);

      if (seconds <= 0) {
        console.log("timeout");
        setTimerStop(true);
        socket.emit("caro-game", JSON.stringify({type: "move-timeout", data: {gameId: id}}));
      }
    }, 1000);
    return () => clearInterval(itv); 
  }, [timerStop, seconds])

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
  }, [seconds])

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
        case "draw-request":
          DrawRequest(msg);
          break;
        case "draw-accepted":
          OnAcceptDraw(msg);
          break;
        case "draw-denied":
          OnDeniedDraw(msg);
          break;
        case "saved-game":
          OnSavedGameHandler(msg);
        case "draw-game":
          DrawGameHandler(msg);
          break;
      }
    });
    return (() => {
      socket.off("caro-game")
    })
  }, [end, isReady, isPlaying, showDrawDeniedToast, seconds]);

  const countDown = () => {
    const s = seconds - 1;
    console.log(s);
    setSeconds(s);
    //console.log(seconds);
    if (seconds == 0) {
      stopTimer();
    }
  }

  const startTimer = () => {
    timer = setInterval(countDown.bind(this), 1000);
  }

  const stopTimer = () => {
    clearInterval(timer);
    console.log("timer stopped");
  }
  const OnSavedGameHandler = (msg) => {
    setShowWaitForSave(false);
  }
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
    //alert(msg.data.player.name + " left game.");
    setPlayers(msg.data.players);
  }

  function RoomNoValidHandler(msg) {
    setIsValidRoom(false);
  }

  function PlayerExisted(msg) {
    //alert("Player existed")
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
    let newsquare = [...square];
    newsquare[move] = sign;
    console.log("change status");
    setSquare(square => [...newsquare]);
    if (isReady) {
      setEnd(false);
      setSeconds(COUNT_TIME);
      setTimerStop(false);
    }
    console.log(isReady);
    console.log(end);

  }

  function MakeAMove(i) {
    let newsquare = [...square];

    if (!newsquare[i]) {
      newsquare[i] = temp[q];
      setSquare(newsquare);
      setEnd(true);
      setTimerStop(true);
      setSeconds(COUNT_TIME);
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
    setWithdrawing(false);
    setDrawRequesting(false);
    const newBoard = new Array(row * col).fill(null);
    setSquare(square.fill(null));
    setWinRow(null);
    props.fInGame(true);
  }

  const GameStartForPlayers = (msg) => {
    let ownedBall = msg.data.ball;

    if (ownedBall.id == user.ID) {
      setQ(1);
      setEnd(false);
      setSeconds(COUNT_TIME);
      setTimerStop(false);
      //startTimer();
    } else {
      setQ(2);
      setEnd(true)
    }
  }

  const GameEndHandler = (msg) => {
    console.log("endgame");
    console.log(msg);
    console.log(msg.data.winRow);
    setWinRow(msg.data.winRow);
    setShowDrawModal(false);
    setWithdrawing(false);
    setDrawRequesting(false);
    setShowWaitForSave(true);
    setPlayers(msg.data.players);
    setEnd(true);
    setIsReady(false);
    setIsPlaying(false);
    props.fInGame(false);
  }

  const DrawGameHandler = (msg) => {
    setShowDrawModal(false);
    setResult(msg.data);
    setShowResult(true);
  }

  const RequestDrawHandler = () => {
    setDrawRequesting(true);
    socket.emit("caro-game", JSON.stringify({ type: "request-draw", data: { gameId: id, player: user } }));
  }

  const WinGameHandler = (msg) => {
    //alert("You win");
    setResult(msg.data);
    console.log(msg.data)

    setShowResult(true);
  }

  const LoseGameHandler = (msg) => {
    //alert("You lose");
    setResult(msg.data);
    console.log(msg.data)
    setShowResult(true);
  }

  const AcceptDraw = () => {
    setShowDrawModal(false);
    socket.emit("caro-game", JSON.stringify({ type: "accept-draw", data: { gameId: id, player: user } }));
  }

  const DeniedDraw = () => {
    socket.emit("caro-game", JSON.stringify({ type: "denied-draw", data: { gameId: id, player: user } }));
    setSeconds(seconds + 3);
    setShowDrawModal(false);
  }

  const OnAcceptDraw = () => {
    setDrawRequesting(false);
    //socket.emit("caro-game", JSON.stringify({ type: "accept-draw", data: { gameId: id, player: user } }));
    setShowDrawModal(false);
  }

  const OnDeniedDraw = () => {
    setDrawRequesting(false);
    setShowDrawDeniedToast(true);
  }

  const DrawRequest = (msg) => {
    setShowDrawModal(true);
  };

  const WithdrawHandler = () => {
    setWithdrawing(true);
    socket.emit('caro-game', JSON.stringify({type: "withdraw", data: {gameId: id}}));
  }
  const drawSaveModal = () => {
    return <Modal
      show={showWaitForSave}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter mx-auto" style={{display:"block", margin:"0 auto"}} >
        Saving
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body style={{ textAlign: "center", margin: "2rem auto" }}>
        <Spinner animation="border" />
        <div style={{ fontWeight: "500" }}>Gathering result</div>
      </Modal.Body>
    </Modal>
  }

  const drawResultModal = () => {
    return <Modal
      show={showResult && result && result.message}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      {/* <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter mx-auto" style={{display:"block", margin:"0 auto"}} >
        Saving
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body style={{ textAlign: "center", margin: "2rem auto" }}>
        <div style={{ fontWeight: "500", fontSize:"20px" }}>{result && result.message}</div>
        <button type="button" style={{ marginTop: "15px" }} onClick={() => { setShowResult(false) }} class={"btn btn-primary"}>Close</button>

      </Modal.Body>
    </Modal>
  }

  const drawModal = () => {
    return <Modal show={showDrawModal} >
      <Modal.Body style={{ fontWeight: "500", textAlign: "center" }}>Opponent wants a draw match, do you agree???</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={DeniedDraw}>
          Nope
      </Button>
        <Button variant="primary" onClick={AcceptDraw} >
          OK
      </Button>
      </Modal.Footer>
    </Modal>
  }

  return (
    <>
      {isValidRoom ?
        <>
          <Toast style={{ backgroundColor: "gray", position: "fixed", zIndex: "3", top: "10%", right: "10%" }} onClose={() => setShowDrawDeniedToast(false)} show={showDrawDeniedToast} delay={2000} autohide>
            <Toast.Body>Opponent denied your request</Toast.Body>
          </Toast>
          {drawSaveModal()}
          {drawModal()}
          {drawResultModal()}
          <div className="row" style={{ maxWidth: "100%" }}>
            <div className="col-lg-8 col-md-12">
              <h2 style={{textAlign:"center", marginTop:"20px"}}>
                <>{timerStop ? "Waiting opponent" : seconds}</>
            </h2>
              <div className="game">

                <div className={`game-board `}>
                  <div className={`${end ? "no-click" : ""}`}>
                    <Board
                      row={row}
                      col={col}
                      winRow={winRow}
                      square={square}
                      onClick={(i) => handleClick(i)}
                    />
                  </div>
                </div>

              </div>
              <div style={{ maxWidth: "80%", width: "500px", margin: "0 auto", marginTop: "20px" }}>
                <button type="button" style={{ marginRight: "5px" }} onClick={ReadyHandler} class={!isReady ? "btn btn-primary" : "btn btn-secondary"} disabled={isPlaying || isReady}>Ready</button>
                <button type="button" style={{ marginRight: "5px" }} onClick={RequestDrawHandler} class={"btn btn-primary"} disabled={!isPlaying || drawRequesting || !isReady}>Request Draw     <Spinner
                  hidden={!drawRequesting}
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /></button>
                <button type="button" style={{ marginRight: "5px" }} onClick={WithdrawHandler} class={"btn btn-primary"} disabled={!isPlaying || withdrawing || !isReady}>Withdraw     <Spinner
                  hidden={!withdrawing}
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /></button>
                <div>
                  Player list
                <ol>
                    {players.map((player) => {
                      return (
                        <li>
                          {player.ready ? (
                            <b>{player.name}</b>
                          ) : (
                              <>{player.name}</>
                            )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-8 mx-auto m-2" style={{ display: "block" }} >
              <div className="game-board">
                <h3 className="p-3">Message</h3>
                <Chat disableSent={false}></Chat>
              </div>
            </div>
          </div> </> :
        <div>Room ID is invalid</div>}
    </>
  );
}
