import React, { useState } from "react";
import "../assets/login.css";
import AccountService from "../services/account.service";
import $ from 'jquery';
export default function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    // function validateForm() {
    //     return email.length > 0 && password.length > 0;
    // }
    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const res = await AccountService.login(userName, password);
        if (Boolean(res.token)) {
            const tokens = res.token.split(".");
            const data = JSON.parse(atob(tokens[1]));
            window.location.reload();

        }
    }
    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        var data = {};
        $('#signupform').serializeArray().map(function (x) { data[x.name] = x.value; });
        console.log(data);
        const res = await AccountService.register(data.newuser, data.newpass, data.repass);
        if (res) {
            alert("Sign Up Successfull");
        }
    }
    return (
        <div className="row">
            <div className="col-md-6 mx-auto p-0">
                <div className="card">
                    <div className="login-box">
                        <div className="login-snip">
                            <input id="tab-1" type="radio" name="tab" className="sign-in" checked />
                            <label for="tab-1" className="tab">Login</label>
                            <input id="tab-2" type="radio" name="tab" className="sign-up" />
                            <label for="tab-2" className="tab">Sign Up</label>
                            <div className="login-space">
                                <form onSubmit={handleSubmitLogin}>
                                    <div className="login">
                                        <div className="group">
                                            <label for="user" className="label">Username</label>
                                            <input id="user"
                                                onChange={handleUserNameChange}
                                                type="text"
                                                className="input"
                                                placeholder="Enter your username"
                                            />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">Password</label>
                                            <input
                                                id="pass"
                                                onChange={handlePasswordChange}
                                                type="password"
                                                className="input"
                                                data-type="password"
                                                placeholder="Enter your password" />
                                        </div>
                                        {/* <div className="group">
                                        <input id="check" type="checkbox" className="check"  />
                                        <label for="check">
                                            <span className="icon"></span>
                                                
                                                </label>
                                    </div> */}
                                        <div className="group">
                                            <input type="submit" className="button" value="Sign In" />
                                        </div>
                                        <div className="hr"></div>
                                        <div className="foot"> <a href="#">Forgot Password?</a> </div>
                                    </div>
                                </form>
                                <form id="signupform" onSubmit={handleSubmitRegister}>
                                    <div className="sign-up-form">
                                        <div className="group">
                                            <label for="user" className="label">Username</label>
                                            <input name="newuser"
                                                type="text"
                                                // onChange={handleNewUserNameChange}
                                                className="input"
                                                placeholder="Create your Username" />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">Password</label>
                                            <input
                                                name="newpass"
                                                // onChange={handleNewPasswordChange}
                                                type="password"
                                                className="input"
                                                data-type="password"
                                                placeholder="Create your password" />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">Repeat Password</label>
                                            <input
                                                name="repass"
                                                type="password"
                                                className="input"
                                                // onChange={handleRePasswordChange}
                                                data-type="password"
                                                placeholder="Repeat your password" />
                                        </div>
                                        {/* <div className="group">
                                        <label for="pass" className="label">Email Address</label>
                                        <input 
                                        id="pass" 
                                        type="text" 
                                        className="input" 
                                        placeholder="Enter your email address" />
                                    </div> */}
                                        <div className="group"> <input type="submit" className="button" value="Sign Up" />
                                        </div>
                                        <div className="hr"></div>
                                        <div className="foot">
                                            <label for="tab-1">Already Member?</label> </div>
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