import React from "react";
import { socket } from "../App";
import "../assets/homepage.css";
import accountService from "../services/account.service";
const PeopleRow = (props) => {
    const person = props.person;
    const user = accountService.getCurrentUserInfo();
    const inviteHandler = () => {
        console.log(person);
        socket.emit("invite-game", JSON.stringify({type: "invite-by-id", data: {id: person, sender: user}}));
    }
    return <li className="online-row">
        <div>{JSON.parse(person).Username}</div>
        <button type="button" class="btn btn-primary btn-new-room" onClick={inviteHandler}>Invite</button>
    </li>
};

export default PeopleRow;
