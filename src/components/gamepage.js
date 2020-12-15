import React, { useEffect, useState } from "react";
import ChatComponent from "../assets/ActiveComponent";
import io from 'socket.io-client';
import AccountService from "../services/account.service";
import {socket} from "../App";
// import "../assets/login.css";
export default function Gamepage() {


  return (
    <div className="container">
        <h1>Gameplay</h1>
    </div>
  );
}
