import React from "react";

const Message = (props) => {
  return props.mine ? (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{props.msg}</p>
        <span className="time_date">
          {props.time}
          {/* 11:01 AM | June 9 */}
        </span>
      </div>
    </div>
  ) : (
    <div className="incoming_msg">
      <div className="incoming_msg_img">
        {/* <img
          src="https://ptetutorials.com/images/user-profile.png"
          alt={props.Username}
        /> */}
      </div>
      <div className="received_msg">
        <div className="received_withd_msg">
          <p>{props.msg}</p>
          <span className="time_date">
            {props.time}
            {/* 11:01 AM | Yesterday */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
