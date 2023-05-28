import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";

const API_URL = 'http://localhost:8000/';

class ChapterService {
  getChaptersContent() {
    return axios.get(API_URL + 'chapter');
  }

  create_chapter(title: string, content: string, novel_id: any) {
    const currentUser = AuthService.getCurrentUser();
    return axios.post(API_URL + "chapter", {
      headers: {
        'content-type': 'application/json'
      },
      author_id: currentUser.id,
      novel_id: novel_id,
      datetime: "",
      title,
      content
    });
  }

  async get_novel_chapters(id: any) {
    const response = axios.get(API_URL + "novel/"+id+"/chapters", {
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

export default new ChapterService();