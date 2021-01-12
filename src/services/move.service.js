import authHeader from "../HTTPrequests/auth-header";
import Post from "../HTTPrequests/Post";
import {HOST} from "../constants/constant";
const API_URL = `${HOST}user/`;


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
