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
      socket.emit("user-online", (JSON.stringify({ ID: userInfo.ID, Username: userInfo.Username })))
    }
  }, []);

  return (
    //<Homepage/>


    <Router>
      <div className="App">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
        </div>
      
      <Switch>
        <Route exact path="/" component={currentUser ? Homepage : Login} />
        <Route path="/caro" component={Homepage} />
        <Route path="/game/:id" component={currentUser ? Gamepage : Login} />
      </Switch>


    </Router>
  );
}

export default App;
