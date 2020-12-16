import React, { useState } from "react";
import Message from "./Message";
import "../assets/chat.css";
const Chat = (props) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  let msgsample = { mine: true, msg: "Hello1", time: "12:00", Username: "aaa" };
  let msgsample1 = {
    mine: false,
    msg: "Hello2",
    time: "14:00",
    Username: "bbb",
  };
  // _messages.push(msgsample);
  // _messages.push(msgsample1);
  const handleSend = (event) => {
    event.preventDefault();
    const d = new Date();
    let obj = Object.assign({}, msgsample, {
      msg: msg,
      time: d.toLocaleTimeString() + " | Today",
    });
    let t = [...messages];
    t.push(obj);
    console.log(t);
    setMessages(t);
    setMsg("");
  };
  const handleMsgChange = (event) => {
    setMsg(event.target.value);
  };
  return (
    <div className="mesgs">
      <div className="msg_history">
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
