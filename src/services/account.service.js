import postData from '../HTTPrequests/Post';
import authHeader from '../HTTPrequests/auth-header';
import Post from '../HTTPrequests/Post';
const API_URL = "http://localhost:1337/";

class AccountService {

    async login(username, password) {
        const res= await Post(API_URL + "login", {
            "Username": username,
            "Password": password
        }, { 'Content-Type': 'application/json' });
        localStorage.setItem("token", res.token);
        return res;
    }

    logout() {
        localStorage.removeItem("token");
    }

    async register(name, email, password) {
        return await Post(API_URL + "register",
            {
                'Username': name,
                'Email': email,
                'Password': password
            },
            { 'Content-Type': 'application/json' }
        );
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('token'));;
    }

    // async auth() {
    //     return await fetch(API_URL + 'auth', { headers: authHeader() });
    // }
}

export default new AccountService();