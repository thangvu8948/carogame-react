import React, { useEffect, useState } from "react";
import ChatComponent from "../assets/ActiveComponent";
import io from 'socket.io-client';
import AccountService from "../services/account.service";
import { socket } from "../App";
// import "../assets/login.css";
export default function Homepage() {
  const user = AccountService.getCurrentUserInfo();
  const [people, setPeople] = useState([]);
  useEffect(() => {
    socket.on("user-online", data => {
      console.log(JSON.parse(data))
      setPeople(JSON.parse(data))
    });

    socket.on("caro-game", msg => {
      ReceiveHandler(JSON.parse(msg));
    })
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
    }
    return true;
  }

  const NewRoomRequestHandler = () => {
    socket.emit("caro-game", JSON.stringify({ type: "request-new-room", player: user }));
  }

  return (
    <div className="container">
      <button type="button" class="btn btn-primary" onClick={NewRoomRequestHandler}>New Room</button>
      <ChatComponent people={people} />
    </div>
  );
}
