import React, { useEffect, useState } from "react";
import Message from "./Message";
import "../assets/chat.css";
import {Spinner} from "react-bootstrap";
import { socket } from "../App";
import { useParams } from "react-router-dom";
import AccountService from "../services/account.service";
const ChatHistory = (props) => {
  const { id } = useParams()
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [canChat, setCanChat] = useState(false);
  const user = AccountService.getCurrentUserInfo();
  let msgsample = { mine: true, msg: "Hello1", time: "12:00", SenderUsername: "aaa", SenderId: user.ID };
  let msgsample1 = {
    mine: false,
    msg: "Hello2",
    time: "14:00",
    Username: "bbb",
  };

  return (
    <div className="mesgs">
      <div id="chat-box" className="msg_history">
        {props.message.map((item) => (
          <Message
            mine={item.senderId === user.ID}
            msg={item.message}
            senderId = {item.senderId}
            //time={item.time}
            Username={item.senderUsername}
          ></Message>
        ))}
      </div>
      {/* <form    onSubmit={handleSend}>
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
      </form> */}
    </div>
  );
};
export default ChatHistory;
