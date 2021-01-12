import React, { useEffect, useState } from "react";
import $ from "jquery";
import Post from "../HTTPrequests/Post";
import { HOST } from "../constants/constant";
import { Spinner } from "react-bootstrap"
const SERVER_HOST = HOST;
function Forgot(props) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
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
      setIsFailed(false);
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
      setIsFailed(true);
    }
    setIsLoading(false);
  };
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
                      <button className="btn btn-lg btn-primary btn-block"
                        value="Reset Password"
                        type="submit">
                        Reset Password
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
                    </div>

                    <div hidden={!isSuccess} class="alert alert-success" role="alert">
                      OK! Check Mail!
                      </div>

                    <div hidden={!isFailed} class="alert alert-danger" role="alert">
                      Bad Network or Email is not exist
                      </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Forgot;
