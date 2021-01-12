import React, { useEffect, useState } from "react";
import $ from "jquery";
import Post from "../HTTPrequests/Post";
const SERVER_HOST = "http://localhost:1337/";
function Forgot(props) {
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    var data = {};
    $("#form-email")
      .serializeArray()
      .map(function (x) {
        data[x.name] = x.value;
      });
    console.log(data);
    const res = await Post(`${SERVER_HOST}forgotpass`, data, {
      "Content-Type": "application/json",
    });
    console.log(res);
    if (res) {
      alert("OK! Check Mail!");
    } else {
      alert("bad newtwork or mistake email");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <h3>
                  <i className="fa fa-lock fa-4x"></i>
                </h3>
                <h2 className="text-center">Forgot Password?</h2>
                <p>You can reset your password here.</p>
                <div className="panel-body">
                  <form
                    id="form-email"
                    className="form"
                    onSubmit={handleSubmitLogin}
                  >
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <input
                          id="email"
                          name="email"
                          placeholder="email address"
                          className="form-control"
                          type="email"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        className="btn btn-lg btn-primary btn-block"
                        value="Reset Password"
                        type="submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
