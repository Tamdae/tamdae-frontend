import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";
import slug from 'slug'
import { CONFIG } from './config';

class NovelService {
  getNovelsContent() {
    return axios.get(CONFIG.API_URL + 'novels');
  }

  
  getNovelsBetween() {
    return axios.get(CONFIG.API_URL + 'novels');
  }

  getLastNovels(number: number) {
    return axios.post(CONFIG.API_URL + 'novels',{
      headers: {
        'content-type': 'application/json'
      },
      number: number
    });
  }

  create_novel(title: string, description: string) {
    const currentUser = AuthService.getCurrentUser();
    let title_slug = slug(title);
    const currentDatetime = new Date().toISOString();
    return axios.post(CONFIG.API_URL + "novel", {
      headers: {
        'content-type': 'application/json'
      },
      author_id: currentUser.id,
      datetime: currentDatetime,
      title,
      slug: title_slug,
      description
    });
  }

  async get_novel(id: any) {
    const response = axios.get(CONFIG.API_URL + "novel/"+id, {
      headers: {
        'content-type': 'application/json'
      },
    });
    // return it
    return response
  }

  getUserBoard() {
    return axios.get(CONFIG.API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(CONFIG.API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(CONFIG.API_URL + 'admin', { headers: authHeader() });
  }
}

export default new NovelService();
