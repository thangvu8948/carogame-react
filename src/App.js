import React, { useState, useEffect } from "react";
import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./components/homepage";
import Login from "./components/login";
import AccountService from "./services/account.service";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AccountService.getCurrentUser();
    console.log("a");
    if (user) {
      console.log(user);
      setCurrentUser(user);
    }
  }, []);

  return (
    //<Homepage/>
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={currentUser ? Homepage : Login} />
          <Route path="/caro" component={Homepage}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
