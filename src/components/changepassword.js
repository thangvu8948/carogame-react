import React, { useEffect, useState } from "react";
import $ from "jquery";
import Post from "../HTTPrequests/Post";
import { HOST } from "../constants/constant";
const SERVER_HOST = HOST;
function ChangePassword(props) {
  const value = atob(props.code).split("|");
  const [isValid, setIsValid] = useState(true);
  const handleChangePassword = async (event) => {
    event.preventDefault();
    var data = {};
    $("#pass-form")
      .serializeArray()
      .map(function (x) {
        data[x.name] = x.value;
      });
    if (!checkValid(data)) {
      setIsValid(false);
      return;
    }
    console.log(data);
    const res = await Post(`${SERVER_HOST}changepassword/${value[0]}`, data, {
      "Content-Type": "application/json",
    });
    console.log(res);
    if (res) {
      window.location.href = `/`;
    } else {
      alert("bad newtwork or mistake password");
    }
  };
  const checkValid = (data) => {
    if (data.newpass != "" && data.newpass == data.copass) {
      return true;
    }
    return false;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 col-md-offset-4" style={{
          margin: "0 auto",
          marginTop: "2rem"
        }}>
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <h3>
                  <i className="fa fa-lock fa-4x"></i>
                </h3>
                {/* <h2 className="text-center">Forgot Password?</h2> */}
                <p>You must place your password here.</p>
                <div className="panel-body">
                  <form
                    id="pass-form"
                    role="form"
                    className="form"
                    onSubmit={handleChangePassword}
                  >
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <input
                          id="newpass"
                          name="newpass"
                          placeholder="new password"
                          className="form-control"
                          type="password"
                        />
                      </div>
                      <div className="input-group">
                        <span className="input-group-addon"></span>
                        <input
                          id="copass"
                          name="copass"
                          placeholder="confirm password"
                          className="form-control"
                          type="password"
                        />
                      </div>
                    </div>
                    <div hidden={isValid} class="alert alert-danger" role="alert">
                      Password does not match or is empty
</div>
                    <div className="form-group">
                      <input
                        name="recover-submit"
                        className="btn btn-lg btn-primary btn-block"
                        value="Update"
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

export default ChangePassword;
