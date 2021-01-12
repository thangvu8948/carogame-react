import authHeader from "../HTTPrequests/auth-header";
import Post from "../HTTPrequests/Post";
const API_URL = "http://localhost:1337/user/";

class UserService {
  async getUserBy(id) {
    const res = await fetch(API_URL + `${id}/info`, {
      headers: authHeader(),
    });
    return res;
  }
  async getUserByAccountId(id) {
    const res = await fetch(API_URL + `account/${id}`, {
      headers: authHeader(),
    });
    return res;
  }
  async ChangeAvatar(id, avatar) {
    const res = await Post(
      API_URL + `${id}/avatar`,
      {
        avatar: avatar,
      },

      authHeader()
    );
    return res;
  }

  async UpdateProfile(id, accId, name, dob, email, gender) {
    const res = await Post(
      API_URL + `${id}/profile`,
      {Name: name, DOB: dob, Email: email, ID: accId, Gender: gender},
      authHeader()
    );
    return res;
  }

  async getAllUser() {
    const res = await fetch(API_URL + "alluser", { headers: authHeader() });
    return res;
  }
  
  // async auth() {
  //     return await fetch(API_URL + 'auth', { headers: authHeader() });
  // }
}

export default new UserService();
