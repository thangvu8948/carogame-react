import React from "react";
import "../assets/homepage.css";
const RoomCard = (props) => {
    const room = props.room;
    const enterRoomHandler = () => {
        window.location.href = `/game/${room.id}`
    }
    return <div className="room-card">
        <div className="room-name">
            {room.name}
        </div>
        <div className="room-info">
            <div className="room-body">
                <div>Board size: {room.row}x{room.col}</div>
                <div>Player no in room: {room.players.length}</div>
            </div>
            <div className="room-card-footer">
                <button type="button" className="btn btn-primary icon-holder" onClick={enterRoomHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z" />
                    </svg>
                </button>
                <div>
                </div>
            </div>
        </div>
    </div>
};

export default RoomCard;
