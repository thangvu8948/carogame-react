import postData from "../HTTPrequests/Post";
import authHeader from "../HTTPrequests/auth-header";
import Post from "../HTTPrequests/Post";
const API_URL = "http://localhost:1337/";

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
    return res;
  }

  logout() {
    localStorage.removeItem("user");
  }

  async register(name, password, repassword) {
    return await Post(
      API_URL + "register",
      {
        Username: name,
        Password: password,
        RePassword: repassword,
      },
      { "Content-Type": "application/json" }
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  getCurrentUserInfo() {
    var tokens = this.getCurrentUser().split(".");
    const data = JSON.parse(atob(tokens[1]));
    return data;
  }

  // async auth() {
  //     return await fetch(API_URL + 'auth', { headers: authHeader() });
  // }
}

export default new AccountService();
