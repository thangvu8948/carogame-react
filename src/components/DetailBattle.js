import React, { Component, useState, useEffect } from "react";
import MoveService from "../services/move.service";
import ChatService from "../services/chat.service";
import Board from "../commons/Board";
import Chat from "../commons/Chat";
import $ from "jquery";
import "../assets/custom.css";
import { useParams } from "react-router-dom";
import ChatHistory from "../commons/ChatHistory";
import { Spinner } from "react-bootstrap";
function DetailBattle(props) {
  const divStyle = {
    width: "50%",
  };
  const { id } = useParams();
  const variable = ["X", "O"];
  const [moves, setMoves] = useState(null);
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState(null);
  const [start, setStart] = useState(false);
  const [current, setCurrent] = useState(0);
  const [square, setSquare] = useState(Array(20 * 30).fill(null));
  useEffect(async () => {
    const usrs = await MoveService.getMoves(id);
    const res = await usrs.json();
    if (res) {
      setMoves(JSON.parse(res.Moves));
    }
  }, []);
  useEffect(() => {
    if (moves)
      renderSquareWith([...moves].slice(0, current));
  }, [current]);
  useEffect(async () => {
    const cht = await ChatService.getChats(id);
    const res = await cht.json();
    console.log(res);
    if (res) {
      try {
        setMsg(JSON.parse(res.Messages));
      } catch {
        setMsg([]);
      }
    }
  }, [visible]);
  const renderSquareWith = (_moves) => {
    if (!moves) return;
    let clone = new Array(20 * 30).fill(null);
    _moves.forEach(function (item, index) {
      clone[item] = variable[index % 2];
    });
    setSquare(clone);
  };
  const handleStart = () => {
    console.log("press")
    setStart(true);
  };
  const handleDoubleNext = () => {
    setCurrent(current + 3 >= moves.length ? moves.length : current + 3);
  };
  const handleSingleNext = () => {
    setCurrent(current + 1 >= moves.length ? moves.length : current + 1);
  };
  const handleSinglePrevious = () => {
    setCurrent(current - 1 <= 0 ? 0 : current - 1);
  };
  const handleDoublePrevious = () => {
    setCurrent(current - 3 <= 0 ? 0 : current - 3);
  };
  const handleProgress = (e) => {
    let $div = $(e.target);
    let offset = $div.offset();
    let x = e.clientX - offset.left;
    const step = Math.ceil((x / 500) * moves.length);
    setCurrent(step);
  };
  const handleShowMessage = () => {
    setVisible(true);
  };
  const takePercet = () => {
    const percent = current / moves.length;
    return {
      width: `${percent * 100}%`,
    };
  };

  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <div className="game">
            <div className={`game-board `}>
              <Board row={20} col={30} square={square} />
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="game-board">
            <h3>Message</h3>
            {!visible ? (
              <button
                type="button"
                class="btn btn-success"
                onClick={handleShowMessage}
              >
                Show
              </button>
            ) : msg == null ? (
              <Spinner animation="border" />
            ) : (
                  <ChatHistory message={msg} disableSent={true} />
                )}
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="text-center">
            {start == false ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleStart}
                disabled={moves == null ? true : false}
              >
                {moves ? <>Start</> : <>Loading <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /></>}
              </button>
            ) : (
                <>
                  <div className="progress" onClick={handleProgress}>
                    <div
                      className="progress-bar progress-bar-striped bg-info"
                      role="progressbar"
                      style={takePercet()}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <br />
                  <button
                    type="button"
                    className="cbtn"
                    onClick={handleDoublePrevious}
                  >
                    <i class="fas fa-angle-double-left"></i>
                  </button>
                  <button
                    type="button"
                    className="cbtn"
                    onClick={handleSinglePrevious}
                  >
                    <i className="fas fa-angle-left"></i>
                  </button>
                  <button
                    type="button"
                    className="cbtn"
                    onClick={handleSingleNext}
                  >
                    <i className="fas fa-angle-right"></i>
                  </button>
                  <button
                    type="button"
                    className="cbtn"
                    onClick={handleDoubleNext}
                  >
                    <i className="fas fa-angle-double-right"></i>
                  </button>
                </>
              )}
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </>
  );
}

export default DetailBattle;
