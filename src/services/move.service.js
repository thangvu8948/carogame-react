import authHeader from "../HTTPrequests/auth-header";
import Post from "../HTTPrequests/Post";
const API_URL = "http://localhost:1337/user/";

class MoveService {
  async getMoves(bid) {
    const res = await fetch(API_URL + `/battles/${bid}/moves`, {
      headers: authHeader(),
    });
    return res;
  }

  // async auth() {
  //     return await fetch(API_URL + 'auth', { headers: authHeader() });
  // }
}

export default new MoveService();
