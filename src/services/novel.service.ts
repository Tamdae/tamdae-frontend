import axios from 'axios';
import authHeader from './auth-header';
import AuthService from "./auth.service";
import slug from 'slug'
import { CONFIG } from './config';

class NovelService {
  getNovelsContent() {
    return axios.get(CONFIG.API_URL + 'novels', {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'anovelsite.com', // Replace '*' with the appropriate domain or specify multiple domains
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Specify the HTTP methods allowed by your server
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Specify the allowed request headers
      }
    });
  }


  getNovelsBetween() {
    return axios.get(CONFIG.API_URL + 'novels');
  }

  getLastNovels(number: number) {
    return axios.post(CONFIG.API_URL + 'novels', {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'anovelsite.com', // Replace '*' with the appropriate domain or specify multiple domains
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Specify the HTTP methods allowed by your server
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Specify the allowed request headers
      }
    });
  }

  create_novel(title: string, description: string) {
    const currentUser = AuthService.getCurrentUser();
    let title_slug = slug(title);
    const currentDatetime = new Date().toISOString();
    return axios.post(CONFIG.API_URL + "novel", {
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': 'anovelsite.com', // Replace '*' with the appropriate domain or specify multiple domains
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Specify the HTTP methods allowed by your server
        'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Specify the allowed request headers
      },
      author_id: currentUser.id,
      datetime: currentDatetime,
      title,
      slug: title_slug,
      description
    });
  }

  async get_novel(id: any) {
    const response = axios.get(CONFIG.API_URL + "novel/" + id, {
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
