import authHeader from "../HTTPrequests/auth-header";
import Post from "../HTTPrequests/Post";
import {HOST} from "../constants/constant";
const API_URL = `${HOST}user/`;

class BattleService {
  async getRecentBattles(uid) {
    const res = await fetch(API_URL + `${uid}/recentfive`, {
      headers: authHeader(),
    });
    return res;
  }
  async getBattles(uid) {
    const res = await fetch(API_URL + `/${uid}/battles`, {
      headers: authHeader(),
    });
    return res;
  }
  async getBattle(id) {
    const res = await fetch(API_URL + `${id}/battle`, {
      headers: authHeader(),
    });
    return res;
  }
  // async auth() {
  //     return await fetch(API_URL + 'auth', { headers: authHeader() });
  // }
}

export default new BattleService();
