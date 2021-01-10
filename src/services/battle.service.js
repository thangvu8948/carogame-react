import authHeader from "../HTTPrequests/auth-header";
import Post from "../HTTPrequests/Post";
const API_URL = "http://localhost:1337/user/";

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
  // async auth() {
  //     return await fetch(API_URL + 'auth', { headers: authHeader() });
  // }
}

export default new BattleService();
