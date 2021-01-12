import React from "react";
import { socket } from "../App";
import "../assets/homepage.css";
import accountService from "../services/account.service";
import {connect} from "react-redux";
import { inviting_on } from "../actions";

function mapDispatchToProps(dispatch) {
  return {
    inviting_on: value => dispatch(inviting_on(value))
  };
}

const PeopleRow = (props) => {
  const person = props.person;
  const user = accountService.getCurrentUserInfo();
  const inviteHandler = () => {
    props.inviting_on();
    socket.emit(
      "invite-game",
      JSON.stringify({
        type: "invite-by-id",
        data: { id: person, sender: user },
      })
    );
  };
  return (
    <li className="online-row">
      <div>{JSON.parse(person).Username}</div>
      <button
        type="button"
        className="btn btn-primary btn-new-room"
        onClick={inviteHandler}
      >
        Invite
      </button>
    </li>
  );
};

export default connect(null,mapDispatchToProps)(PeopleRow);
