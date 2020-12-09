import React, { useState } from "react";
import "../assets/login.css";
import AccountService from "../services/account.service";
export default function Login() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    // function validateForm() {
    //     return email.length > 0 && password.length > 0;
    // }
    const handleUserNameChange = (event) => {
        setUsername(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleRepeatPassword = (event) => {
        setRepeatPassword(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handleSubmitLogin = async (event) => {
        event.preventDefault();
        const res = await AccountService.login(userName, password);
        if (Boolean(res.token)) {
            window.location.href = "/caro";
        }
    }

    const handleSubmitRegister = async (event) => {
        event.preventDefault();
        if (password !== repeatPassword) {
            alert("Password is not match");
            return;
        }
        const res = await AccountService.register(userName, email, password);
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
                                <form>
                                    <div className="sign-up-form">
                                        <div className="group">
                                            <label for="user" className="label">Username</label>
                                            <input id="user" type="text" className="input" placeholder="Create your Username" onChange={handleUserNameChange} />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">Password</label>
                                            <input id="pass" type="password" className="input" data-type="password" placeholder="Create your password" onChange={handlePasswordChange} />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">Repeat Password</label>
                                            <input id="pass" type="password" className="input" data-type="password" placeholder="Repeat your password" onChange={handleRepeatPassword} />
                                        </div>
                                        <div className="group">
                                            <label for="pass" className="label">Email Address</label>
                                            <input id="pass" type="text" className="input" placeholder="Enter your email address" onChange={handleEmailChange} />
                                        </div>
                                        <div className="group"> <input type="submit" className="button" value="Sign Up" onSubmit={handleSubmitRegister} />
                                        </div>
                                        <div className="hr"></div>
                                        <div className="foot"> <label for="tab-1">Already Member?</label> </div>
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
