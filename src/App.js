import React, { useState, useEffect } from "react";
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from 'socket.io-client';
import "./App.css";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal } from 'react-bootstrap';
import Homepage from "./components/homepage";
import Gamepage from "./components/gamepage";
import InviteModal from "./commons/InviteModal";
import Login from "./components/login";
import AccountService from "./services/account.service";
export const ENDPOINT = "http://127.0.0.1:1337";
export const socket = io(ENDPOINT);

function App(props) {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showInvitation, setShowInvitation] = useState(false);
  const [inGame, setInGame] = useState(false);
  const [invitationInfo, setInvitationInfo] = useState(null);
  useEffect(() => {
    const user = AccountService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      const userInfo = AccountService.getCurrentUserInfo();
      socket.emit("user-online", (JSON.stringify({ ID: userInfo.ID, Username: userInfo.Username })))
    }
  }, []);

  useEffect(() => {
    socket.on("invite-game", (msg) => {
      ReceiveHandler(JSON.parse(msg));
    });
    return (() => {
      socket.off("invite-game")
    })
  }, [inGame, showInvitation])

  const setIsInGame = (isInGame) => {
    console.log("in game set " + isInGame);
    setInGame(isInGame);
  }

  const ReceiveHandler = (msg) => {
    switch (msg.type) {
      case "invite-to-game":
        ReceiveInvitation(msg);
        break;
      case "invite-accepted":
        InviteAcceptedHandler(msg);
        break;
    }
  }

  const InviteAcceptedHandler = (msg) => {
    const us = msg.data.user;
    window.location.href = `/game/${msg.data.roomId}`;
  }

  const ReceiveInvitation = (msg) => {
    console.log("receive invite");
    console.log(inGame);
    if (!inGame) {
      if (!showInvitation) {
        console.log("show:" + showInvitation)
        setInvitationInfo(msg);
        setShowInvitation(true);
      }
    } else {
      console.log("player is in game.")
    }
  }

  const handleCloseInvitation = () => {
    setShowInvitation(false);
  }
  return (
    //<Homepage/>
    <>

      <Router>
        <div className="App">
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
      </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <InviteModal show={showInvitation} handleClose={handleCloseInvitation} invitationInfo={invitationInfo}/>

        <Switch>
          <Route exact path="/" component={currentUser ? Homepage : Login} />
          <Route path="/caro" component={Homepage} />
          <Route path="/game/:id" render={currentUser ? () => <Gamepage fInGame={setIsInGame} /> : () => Login} />
        </Switch>


      </Router>
    </>
  );
}

export default App;
