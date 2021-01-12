import React, { useEffect, useState } from "react";
import AccountService from "../services/account.service";
import {HOST} from "../constants/constant";
const SERVER_HOST = HOST;
function Splash(props) {
  const [message, setMessage] = useState("Waiting Verify!");
  useEffect(async () => {
    if (Boolean(props.token)) {
      const body = await AccountService.auth(props.token);
      const ok = await body.json();
      if (ok) {
        localStorage.setItem("user", JSON.stringify(props.token.toString()));
        //console.log(AccountService.getCurrentUserInfo());
        window.location.href = "/";
      } else {
        // const str = atob(props.token);
        // const value = str.split("@");
        // setMessage(
        //   `Time out <a href="${SERVER_HOST}/resend/${value[1]}">Resend</a>`
        // );
      }
      //xac thuc-> luu xuong-> redirect
    }
  }, []);
  return <>{message}</>;
}

export default Splash;
