import React, { useEffect, useState } from "react";
import ChatComponent from "../assets/ActiveComponent";
import io from 'socket.io-client';
import AccountService from "../services/account.service";
import { socket } from "../App";
import RoomCard from "../commons/RoomCard";
import RoomList from "../commons/RoomList";
import Modal from 'react-bootstrap/Modal';
import "../index.css";
import QuickGameModal from "./QuickGameModal"
// import "../assets/login.css";
import "../assets/homepage.css";
import InviteWaitingModal from "./InviteWaitingModal";
import { finding_off, finding_on } from "../actions";
import {connect} from "react-redux";
import { propTypes } from "react-bootstrap/esm/Image";

export const BoardSize = [
  // { row: 15, col: 20 },
  { row: 20, col: 30 },
  // { row: 30, col: 40 }
]


function mapDispatchToProps(dispatch) {
  return {
      finding_on: value => dispatch(finding_on(value))
  };
}


const Homepage = (props) => {
  const user = AccountService.getCurrentUserInfo();
  const [people, setPeople] = useState([]);
  const [showNewRoomModal, setShowNewRoomModal] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');
  const [invitePassword, setInvitePassword] = useState('');
  const [showEnterIDModal, setShowEnterIDModal] = useState(false);
  const [loadRoomId, setLoadRoomId] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomInviteId, setRoomInviteId] = useState("");
  const [size, setSize] = useState(0);
  const [room_type_idx, setRoom_Type_Idx] = useState(0);
  const options = ["Standard (20 x 30)"];
  const room_type = ["Public", "Private"];
  const [games, setGames] = useState([]);
  const [isRoomIdValid, setIsRoomIdValid] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [existed, setExisted] = useState(false);
  const [isFindingQuickMatch, setIsFindingQuickMatch] = useState(false);
  //const [isInviting, setIsInviting] = useState(false);
  useEffect(() => {
    socket.on("user-online", data => {
      console.log(JSON.parse(data))
      setPeople(JSON.parse(data))
    });

    socket.on("caro-game", msg => {
      ReceiveHandler(JSON.parse(msg));
    })
  }, []);

  useEffect(() => {
    socket.emit("caro-game", JSON.stringify({ type: "request-all-room" }));

  }, [])
  function RequestRoomResponseHandler(msg) {
    console.log(msg.data.isSuccess)
    if (msg.data.isSuccess) {
      window.location.href = `/game/${msg.data.game.id}`
    } else {
      setIsRoomIdValid(false);
    }
  }

  const ReceiveHandler = (msg) => {
    console.log(msg)
    switch (msg.type) {
      case 'request-new-room-result':
        RequestRoomResponseHandler(msg);
        break;
      case 'response-all-room':
        console.log("receive rooms");
        ReceiveAllRoomHandler(msg);
        break;
      case 'response-join-room-by-id':
        JoinRoomByIDHandler(msg);
        break;
    }
    return true;
  }


  const NewRoomRequestHandler = () => {
    setShowNewRoomModal(true);
  }

  const ReceiveAllRoomHandler = (msg) => {
    setGames(msg.data.games);
  }

  const JoinRoomByIDHandler = (msg) => {
    const res = msg.data.isSuccess;
    setLoadRoomId(false);
    if (res) {
      window.location.href = `/game/${msg.data.id}`;
    } else {
      const errCode = msg.data.errCode;
      switch (errCode) {
        case 1:
          setIsRoomIdValid(false);
          break;
        case 2:
          setIsPasswordCorrect(false);
          break;
        case 3:

      }
    }
  }
  const QuickGameHandler = () => {
    socket.emit('quick-game', JSON.stringify({ type: "find-game", data: { user: user } }));
    props.finding_on();
  }
  const handleCloseNewRoomModal = () => {
    setShowNewRoomModal(false);
  }
  const handleCloseRoomIDModal = () => {
    setShowEnterIDModal(false);
  }
  const handleChangeSize = (e) => {
    console.log(e.target.selectedIndex);
    setSize(e.target.selectedIndex);
  }
  const handleChangeRoomType = (e) => {
    setRoom_Type_Idx(e.target.selectedIndex);
  }

  const EnterRoomIDHandler = (e) => {
    setShowEnterIDModal(true);
  }

  const handleChangeRoomPassword = (e) => {
    setRoomPassword(e.target.value);
  }
  const handleChangeRoomId = (e) => {
    setRoomInviteId(e.target.value);
  }

  const handleChangeRoomName = (e) => {
    setRoomName(e.target.value);
  }
  const handleChangeInvitePassword = (e) => {
    setInvitePassword(e.target.value);
  }
  const onSubmitRoomIdModal = (e) => {
    e.preventDefault();
    setLoadRoomId(true);
    console.log(invitePassword);
    socket.emit("caro-game", JSON.stringify({ type: "go-to-room-by-id", data: { id: roomInviteId, password: invitePassword, player: user } }));
  }
  const onSubmitNewRoomModal = (e) => {
    e.preventDefault();
    console.log(roomName);
    console.log(size);
    console.log(BoardSize[size]);
    socket.emit("caro-game", JSON.stringify({ type: "request-new-room", data: { player: user, row: BoardSize[size].row, col: BoardSize[size].col, room_name: roomName, public: room_type_idx == 0, password: roomPassword } }));

  }

  const closeFindingQuickMatch = () => {
    setIsFindingQuickMatch(false);
  }

  return (
    <div className="container">

      <Modal show={showNewRoomModal} onHide={handleCloseNewRoomModal} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Name of room</label>
              <input type="text" class="form-control" placeholder="Enter name of room" value={roomName} onChange={handleChangeRoomName} />
              <div class="invalid" hidden={roomName !== ""}>Name of room can't be empty</div>
              <div class="invalid" hidden={isRoomIdValid}>Error in creating new room, try later.</div>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Size</label>
              </div>
              <select class="custom-select" id="inputGroupSelect01" onChange={handleChangeSize} >
                {options.map((option, index) => {
                  return (
                    <option
                      key={index}
                      value={option}
                      selected={index == size}
                    >
                      {option}
                    </option>
                  );
                })
                }
              </select>
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="inputGroupSelect01">Room type</label>
              </div>
              <select class="custom-select" id="inputGroupSelect01" onChange={handleChangeRoomType} >
                {room_type.map((type, index) => {
                  return (
                    <option
                      key={index}
                      value={type}
                      selected={index == room_type_idx}
                    >
                      {type}
                    </option>
                  );
                })
                }
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Password</label>
              <input type="password" class="form-control" placeholder="Enter password of room" disabled={room_type_idx != 1} value={roomPassword} onChange={handleChangeRoomPassword} />
              {/* <div class="invalid" hidden={roomPassword !== ""}></div> */}
              {/* <div class="invalid" hidden={isRoomIdValid}>Error in creating new room, try later.</div> */}
            </div>
            <button class="btn btn-primary" onClick={onSubmitNewRoomModal} disabled={roomName === ""}>Create new room</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
          {/* <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button> */}
        </Modal.Footer>
      </Modal>

      <Modal show={showEnterIDModal} onHide={handleCloseRoomIDModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Room ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Enter name of room" value={roomInviteId} onChange={handleChangeRoomId} />
              <div class="invalid" hidden={roomInviteId !== ""}>ID of room can't be empty</div>
              <div class="invalid" hidden={isRoomIdValid}>Room Id is invalid</div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Password</label>
              <input type="password" class="form-control" placeholder="Enter password of room" value={invitePassword} onChange={handleChangeInvitePassword} />
              {/* <div class="invalid" hidden={roomPassword !== ""}></div> */}
              <div class="invalid" hidden={isPasswordCorrect}>Password is not correct</div>
              <div class="invalid" hidden={!existed}>You are in this room already</div>
            </div>
            <button class="btn btn-primary" onClick={onSubmitRoomIdModal} disabled={roomInviteId === ""}>Go to room <span hidden={!loadRoomId}><div class="spinner-border text-light spinner-grow-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div></span></button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
          {/* <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button> */}
        </Modal.Footer>
      </Modal>
      <InviteWaitingModal />
      <QuickGameModal  />
      <button type="button" class="btn btn-primary btn-new-room" onClick={NewRoomRequestHandler}>New Room</button>
      <button type="button" class="btn btn-primary btn-new-room" onClick={EnterRoomIDHandler}>Enter Room ID</button>
      <button type="button" class="btn btn-primary btn-new-room" onClick={QuickGameHandler}>Quick Game</button>

      {/* {CreateNewRoomModal()} */}

      <div className="row">

        <div className="col-lg-9 col-md-12 col-sm-12 mx-auto d-flex justify-content-center col-12">
          <RoomList rooms={games} />
        </div>
        <div className="col-lg-3 col-md-12 col-sm-12">
          <ChatComponent people={people} />
        </div>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(Homepage);