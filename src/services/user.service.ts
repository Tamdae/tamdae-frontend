import axios from 'axios';
import authHeader from './auth-header';
import { CONFIG } from './config';

class UserService {
  getPublicContent() {
    return axios.get(CONFIG.AUTH_URL + 'all');
  }

  getUserBoard() {
    return axios.get(CONFIG.AUTH_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(CONFIG.AUTH_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(CONFIG.AUTH_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
