import React, { useState, useEffect } from "react";
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import io from 'socket.io-client';
import "./App.css";
import Homepage from "./components/homepage";
import Gamepage from "./components/gamepage"
import Login from "./components/login";
import AccountService from "./services/account.service";
export const ENDPOINT = "http://127.0.0.1:1337";
export const socket = io(ENDPOINT);

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AccountService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      const userInfo = AccountService.getCurrentUserInfo();
      socket.emit("user-online", (JSON.stringify({ID: userInfo.ID, Username: userInfo.Username})))
    }
  }, []);

  return (
    //<Homepage/>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={currentUser ? Homepage : Login} />
          <Route path="/caro" component={Homepage} />
          <Route path="/game/:id" component={currentUser ? Gamepage : Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
