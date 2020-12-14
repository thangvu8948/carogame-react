import React, { useEffect, useState } from "react";
import ChatComponent from "../assets/ActiveComponent";
import io from 'socket.io-client';
import accountService from "../services/account.service";
// import "../assets/login.css";
const socket = io();
export default function Homepage() {
    const ENDPOINT = "http://127.0.0.1:1337";
    const user = accountService.getCurrentUserInfo();
    const [people, setPeople] = useState([]);
    useEffect(() => {
        const socket = io(ENDPOINT);
        console.log(user)
        socket.emit("so_connect", (user.ID, user.Username))
        socket.on("FromAPI", data => {
          setPeople(JSON.parse(data))
        });
      }, []);
    return (
        <div className="container">
           <ChatComponent people={people}/>
        </div>
    );
}
