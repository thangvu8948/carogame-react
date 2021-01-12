import React, { useEffect, useState } from "react";
import Post from "../HTTPrequests/Post";
const SERVER_HOST = "http://localhost:1337/";
function Notifycation(props) {
  const [data, setData] = useState(null);
  const [timeout, setTimeOut] = useState(false);
  const [disable, setDisable] = useState(false);
  useEffect(async () => {
    if (Boolean(props.data)) {
      setTimeOut(props.data[0] == "x" ? false : true);
      const str = atob(props.data.substring(1));
      const value = str.split("|");
      setData(value);
    }
  }, []);
  const handleResend = async () => {
    const res = await Post(
      SERVER_HOST + `resend/${data[1]}`,
      {
        email: data[2],
      },
      { "Content-Type": "application/json" }
    );
    console.log(res);
    setDisable(res);
  };
  return (
    <div class="row">
      <div class="col-md-12">
        <div class="main-verification-input-wrap">
          <ul>
            {!timeout ? (
              <li>If you did not recieve the verification email then</li>
            ) : (
              <li>Time out 10 minutes to active email</li>
            )}
          </ul>
          <div class="main-verification-input fl-wrap">
            <button
              disabled={disable}
              class="main-verification-button"
              onClick={handleResend}
            >
              Resend
            </button>
            <button
              class="main-verification-button"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifycation;
