import axios from "axios";
import { CONFIG } from "./config";

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(CONFIG.AUTH_URL + "signin", {
        // .post(CONFIG.AUTH_URL_NEW + "login", {
        username,
        password,
        temp_data: ""
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(CONFIG.AUTH_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
