import postData from "../HTTPrequests/Post";
import authHeader from "../HTTPrequests/auth-header";
import Post from "../HTTPrequests/Post";
import {HOST} from "../constants/constant";
const API_URL = `${HOST}`;
//const API_URL = "http://localhost:1337/";

class AccountService {
  async login(username, password) {
    const res = await Post(
      API_URL + "login",
      {
        Username: username,
        Password: password,
      },
      { "Content-Type": "application/json" }
    );
    localStorage.setItem("user", JSON.stringify(res.token));
    // localStorage.setItem("token", res.token?.toString());
    localStorage.setItem("verify", res.IsVeryfied?.toString());
    return res;
  }

  logout() {
    localStorage.removeItem("user");
  }
  async register(data) {
    return await Post(API_URL + "register", data, {
      "Content-Type": "application/json",
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getCurrentUserInfo() {
    var tokens = this.getCurrentUser().split(".");
    const data = JSON.parse(atob(tokens[1]));
    return data;
  }

  async auth(token) {
    return await fetch(API_URL + "user/auth", { headers: authHeader(token) });
  }
}

export default new AccountService();
