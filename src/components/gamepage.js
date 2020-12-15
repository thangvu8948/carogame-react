import React, { useEffect, useState } from "react";
import ChatComponent from "../assets/ActiveComponent";
import io from 'socket.io-client';
import AccountService from "../services/account.service";
import { socket } from "../App";
import { useParams } from "react-router-dom";
// import "../assets/login.css";
export default function Gamepage() {
    const { id } = useParams();
    const user = AccountService.getCurrentUserInfo();
    const [isInit, setIsInit] = useState(false);
    useEffect(() => {
        if (!isInit) {
            socket.emit('caro-game', JSON.stringify({ type: "join-room", data: { gameId: id, player: user } }));
            setIsInit(true);
        }
        socket.on('caro-game', (msg) => {
            msg = JSON.parse(msg)
            switch (msg.type) {
                case 'you-joined':
                    YouJoinedGameHandler(msg);
                    break;
                case 'player-joined':
                    PlayerJoinedGameHandler(msg);
                    break;
                case 'player-left':
                    PlayerLeftGameHandler(msg);
                    break;
                case 'room-no-valid':
                    RoomNoValidHandler(msg);
            }
        })
    },[])

    function YouJoinedGameHandler(msg) {
        alert('you joined');
    }

    function PlayerJoinedGameHandler(msg) {
        console.log(msg)
        alert(msg.data.player.Username + " joined");
    }

    function PlayerLeftGameHandler(msg) {
        alert("player left");
    }

    function RoomNoValidHandler(msg) {
        alert("this room is not valid");
    }

    return (
        <div className="container">
            <h1>Gameplay</h1>
        </div>
    );
}
