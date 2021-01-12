import React, { useState } from "react";
import "../assets/login.css";
import AccountService from "../services/account.service";
import $ from "jquery";
import { Spinner } from "react-bootstrap";
const SERVER_HOST = "http://localhost:1337/";
export default function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const genders = ["Male", "Female", "Other"];
  const [gender, setGender] = useState(0);
  const [email, setEmail] = useState("");
  const [signInFailed, setSignInFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // function validateForm() {
  //     return email.length > 0 && password.length > 0;
  // }
  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const res = await AccountService.login(userName, password);
    console.log(res);
    if (Boolean(res.token)) {
      setSignInFailed(false);
      const tokens = res.token.split(".");
      const data = JSON.parse(atob(tokens[1]));
      window.location.reload();
    }else {
      setSignInFailed(true);
    }
    if (Boolean(res.IsVeryfied)) {
      window.location.href = `/notify/${res.IsVeryfied}`;
    } else {
    }
    setIsLoading(false);

  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    var data = {};
    $("#signupform")
      .serializeArray()
      .map(function (x) {
        data[x.name] = x.value;
      });
    console.log(data);
    const res = await AccountService.register(data);
    if (res) {
      alert("Sign Up Successfull");
      window.location.href = `/notify/${res}`;
    }
    setIsLoading(false);
  };
  const changeGenderHandler = (e) => {
    setGender(e.target.selectedIndex);
  };
  return (
    <div className="row">
      <div className="container">
        <div className="card" style={{ display: "block", margin: "0 auto", top: "100px", maxWidth: "80%", left: "0px" }}>
          <div className="login-box">
            <div className="login-snip">
              <input
                id="tab-1"
                type="radio"
                name="tab"
                className="sign-in"
                checked
              />
              <label for="tab-1" className="tab">
                Login
              </label>
              <input id="tab-2" type="radio" name="tab" className="sign-up" />
              <label for="tab-2" className="tab">
                Sign Up
              </label>
              <div className="login-space">
                <form onSubmit={handleSubmitLogin}>
                  <div className="login">
                    <div className="group">
                      <label for="user" className="label">
                        Username
                      </label>
                      <input
                        id="user"
                        onChange={handleUserNameChange}
                        type="text"
                        className="input"
                        placeholder="Enter your username"
                      />
                    </div>

                    <div className="group">
                      <label for="pass" className="label">
                        Password
                      </label>
                      <input
                        id="pass"
                        onChange={handlePasswordChange}
                        type="password"
                        className="input"
                        data-type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    {/* <div className="group">
                                        <input id="check" type="checkbox" className="check"  />
                                        <label for="check">
                                            <span className="icon"></span>
                                                
                                                </label>
                                    </div> */}
                    <div className="group" >
                      <button className="btn btn-lg btn-primary btn-block"
                        value="Sign In"
                        type="submit">
                        Sign In
                          <Spinner
                          hidden={!isLoading}
                          as="span"
                          className="mx-2 my-1"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </button>
                      <div hidden={!signInFailed} class="alert alert-danger my-2" style={{textAlign:"center"}} role="alert">
                        Password or Username is not correct
</div>
                      {/* <input type="submit" className="button" value="Sign In" /> */}
                    </div>
                    <div className="group my-4" style={{ textAlign: "center" }}>
                      <a
                        href={`${SERVER_HOST}auth/facebook`}
                        class="link_button"
                      >
                        Facebook
                      </a>
                    </div>
                    <div className="group my-4" style={{ textAlign: "center" }}>
                      <a href={`${SERVER_HOST}auth/google`} class="link_button">
                        Google
                      </a>
                    </div>
                    <div className="hr"></div>
                    <div className="foot">
                      {" "}
                      <a href="/forgot">Forgot Password?</a>{" "}
                    </div>
                  </div>
                </form>
                <form id="signupform" onSubmit={handleSubmitRegister}>
                  <div className="sign-up-form">
                    <div className="group">
                      <label for="user" className="label">
                        Username
                      </label>
                      <input
                        name="newuser"
                        type="text"
                        // onChange={handleNewUserNameChange}
                        className="input"
                        placeholder="Create your Username"
                      />
                    </div>
                    <div className="group">
                      <label for="email" className="label">
                        Email
                      </label>
                      <input
                        name="email"
                        id="email"
                        //onChange={handleEmailChange}
                        type="email"
                        className="input"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="group">
                      <label for="pass" className="label">
                        Password
                      </label>
                      <input
                        name="newpass"
                        // onChange={handleNewPasswordChange}
                        type="password"
                        className="input"
                        data-type="password"
                        placeholder="Create your password"
                      />
                    </div>
                    <div className="group">
                      <label for="pass" className="label">
                        Repeat Password
                      </label>
                      <input
                        name="repass"
                        type="password"
                        className="input"
                        // onChange={handleRePasswordChange}
                        data-type="password"
                        placeholder="Repeat your password"
                      />
                    </div>
                    <div className="group">
                      <label for="gender" className="label">
                        Gender
                      </label>
                      <select
                       style={{height:"auto"}}
                        className="input custom-select"
                        id="inputGroupSelect01"
                        onChange={changeGenderHandler}
                      >
                        {genders.map((type, index) => {
                          return (
                            <option
                              key={index}
                              value={type}
                              selected={index == gender}
                            >
                              {type}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    {/* <div className="group">
                                        <label for="pass" className="label">Email Address</label>
                                        <input 
                                        id="pass" 
                                        type="text" 
                                        className="input" 
                                        placeholder="Enter your email address" />
                                    </div> */}
                    <div className="group">
                      {" "}
                      <button className="btn btn-lg btn-primary btn-block"
                        value="Sign In"
                        type="submit">
                        Sign Up
                          <Spinner
                          hidden={!isLoading}
                          as="span"
                          className="mx-2 my-1"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </button>
                      {/* <input type="submit" className="button" value="Sign Up" /> */}
                    </div>
                    <div className="hr"></div>
                    <div className="foot">
                      <label for="tab-1">Already Member?</label>{" "}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
