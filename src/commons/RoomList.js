import React from "react";
import RoomCard from "./RoomCard";

const RoomList = (props) => {
    const rooms = [1, 2, 3, 4, 5, 6, 7]

    return (<div><div className="room-container">
        {rooms.map((room, index) => (<RoomCard />))}
    </div></div>);
};

export default RoomList;