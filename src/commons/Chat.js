import React, { useEffect, useState } from "react";
import Message from "./Message";
import "../assets/chat.css";
import { socket } from "../App";
import { useParams } from "react-router-dom";
const Chat = (props) => {
  const { id } = useParams()
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [canChat, setCanChat] = useState(false);
  let msgsample = { mine: true, msg: "Hello1", time: "12:00", Username: "aaa" };
  let msgsample1 = {
    mine: false,
    msg: "Hello2",
    time: "14:00",
    Username: "bbb",
  };

  useEffect(() => {
    socket.on("caro-game-chat", (msg) => {
      msg = JSON.parse(msg);
      switch (msg.type) {
        case "received-message":
          console.log(messages);
          ReceiveMessageHandler(msg);
          break;
      }
    })
    return (() => {
      socket.off("caro-game-chat")
    })
  }, [])

  function ReceiveMessageHandler(msg) {
    const message = msg.data.message;
    console.log("message" + message)
    const d = new Date();
    let obj = Object.assign({}, msgsample1, {
      msg: message,
      time: d.toLocaleTimeString() + " | Today",
    });
    AddMessage(obj, false);
  }
  // _messages.push(msgsample);
  // _messages.push(msgsample1);
  const handleSend = (event) => {
    event.preventDefault();
    if (!msg || msg.length === 0) {
      return;
    }
    const d = new Date();
    let obj = Object.assign({}, msgsample, {
      msg: msg,
      time: d.toLocaleTimeString() + " | Today",
    });

    console.log('sent');
    //setTimeout(() => {
      socket.emit("caro-game", JSON.stringify({ type: "send-message", data: { gameId: id, message: msg } }));
    //},100)
    
    AddMessage(obj, true);
  };

  function AddMessage(msgObj, isMine) {
    // console.log(messages);
    // let t = [...messages];
    // t.push(msgObj);
    setMessages(messages => [...messages, msgObj]);
    console.log(messages)
    if (isMine) {
      setMsg("");
    }
    //element.scrollTop = element.scrollHeight;
  }

  const handleMsgChange = (event) => {
    setMsg(event.target.value);
  };
  return (
    <div className="mesgs">
      <div id="chat-box" className="msg_history">
        {messages.map((item) => (
          <Message
            mine={item.mine}
            msg={item.msg}
            time={item.time}
            Username={item.Username}
          ></Message>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <div className="type_msg">
          <div className="input_msg_write">
            <input
              type="text"
              onChange={handleMsgChange}
              name="msg"
              value={msg}
              className="write_msg"
              placeholder="Type a message"
            />
            <button className="msg_send_btn" type="submit">
              <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Chat;
