import React from "react";
import RoomCard from "./RoomCard";

const RoomList = (props) => {
    const rooms = props.rooms;

    return (<div><div className="room-container">
        {rooms.map((room, index) => (<RoomCard room={room} />))}
    </div></div>);
};

export default RoomList;