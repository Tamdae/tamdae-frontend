import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8000/';

class NovelService {
  getNovelsContent() {
    return axios.get(API_URL + 'novels');
  }

  create_novel(title: string, description: string) {
    const currentUser = AuthService.getCurrentUser();
    return axios.post(API_URL + "novel", {
      headers: {
        'content-type': 'application/json'
      },
      author_id: currentUser.id,
      datetime: "",
      title,
      description
    });
  }

  async get_novel(id: any) {
    const response = axios.get(API_URL + "novel/"+id, {
      headers: {
        'content-type': 'application/json'
      },
    });
    // return it
    return response
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new NovelService();
