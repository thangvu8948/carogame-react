import React, { useEffect, useState } from "react";
import ChatComponent from "../assets/ActiveComponent";
import io from 'socket.io-client';
// import "../assets/login.css";
const socket = io();
export default function Homepage() {
    const ENDPOINT = "http://127.0.0.1:1337"
    const [people, setPeople] = useState([]);
    useEffect(() => {
        const socket = io(ENDPOINT);
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
