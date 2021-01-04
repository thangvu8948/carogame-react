import React, { useEffect, useState } from "react";
import ChatComponent from "../assets/ActiveComponent";
import io from 'socket.io-client';
import AccountService from "../services/account.service";
import { socket } from "../App";
import RoomCard from "../commons/RoomCard";
import RoomList from "../commons/RoomList";
import Modal from 'react-bootstrap/Modal';

// import "../assets/login.css";
import "../assets/homepage.css";
export const BoardSize = [
  {row: 15, col: 20},
  {row: 20, col: 30},
  {row: 30, col: 40}
]
export default function Homepage() {
  const user = AccountService.getCurrentUserInfo();
  const [people, setPeople] = useState([]);
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [size, setSize] = useState(1);
  const options = ["Small (15 x 20)", "Standard (20 x 30)", "Large (30 x 40)"];
  const [games, setGames] = useState([]);
  useEffect(() => {
    socket.on("user-online", data => {
      console.log(JSON.parse(data))
      setPeople(JSON.parse(data))
    });

    socket.on("caro-game", msg => {
      ReceiveHandler(JSON.parse(msg));
    })
    socket.emit("caro-game", JSON.stringify({type: "request-all-room"}));
  }, [people]);

  function RequestRoomResponseHandler(msg) {
    console.log(msg.data.isSuccess)
    if (msg.data.isSuccess) {
      window.location.href = `/game/${msg.data.game.id}`
    } else {
      alert("Create room failed");
    }
  }

  const ReceiveHandler = (msg) => {
    console.log(msg)
    switch (msg.type) {
      case 'request-new-room-result':
        RequestRoomResponseHandler(msg);
        break;
      case 'response-all-room':
        ReceiveAllRoomHandler(msg);
        break;
    }
    return true;
  }


  const NewRoomRequestHandler = () => {
    setShow(true);
  }

  const ReceiveAllRoomHandler = (msg) => {
    setGames(msg.data.games);
  }

  const handleCloseNewRoomModal = () => {
    setShow(false);
  }
  const handleChangeSize = (e) => {
    console.log(e.target.selectedIndex);
    setSize(e.target.selectedIndex);
  }
  const handleChangeRoomName = (e) => {
    setRoomName(e.target.value);
  }

  const onSubmitNewRoomModal = (e) => {
    e.preventDefault();
    console.log(roomName);
    console.log(size);
    console.log(BoardSize[size]);
    socket.emit("caro-game", JSON.stringify({type: "request-new-room", data: {player: user, row: BoardSize[size].row, col: BoardSize[size].col, room_name: roomName }}));

  }
  return (
    <div className="container">

      <Modal show={show} onHide={handleCloseNewRoomModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Name of room</label>
              <input type="text" class="form-control" placeholder="Enter name of room" value={roomName} onChange={handleChangeRoomName} />
              <div class="invalid" hidden={roomName !== ""}>Name of room can't be empty</div>
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
                      selected={index==size}
                    >
                      {option}
                    </option>
                  );
                })
                }
              </select>
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
      <button type="button" class="btn btn-primary btn-new-room" onClick={NewRoomRequestHandler}>New Room</button>
      {/* {CreateNewRoomModal()} */}

      <RoomList rooms={games}/>

      <ChatComponent people={people} />
    </div>
  );
}
