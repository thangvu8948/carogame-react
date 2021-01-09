import React from "react";
import "../assets/homepage.css"
import PeopleRow from "../commons/PeopleRow";
import accountService from "../services/account.service";
var ChatComponent = (props) => {
  const user = accountService.getCurrentUserInfo();
  const people = props.people.filter((value, idx) => JSON.parse(value).ID !== user.ID) ?? [];
  return (
    <div>
      <h5>Online</h5>
      <ChatList people={people} />
    </div>
  );
};

var ChatList = (props) => {
  const inviteHandler = () => {

  }
  return (
    <ul>
      {props.people.map((person) => (
       <PeopleRow person={person}/>
      ))}
    </ul>
  );
};

export default ChatComponent;
