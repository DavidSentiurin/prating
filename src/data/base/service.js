import config from '../../config/index.json';
import axios from 'axios';
import cookie from 'js-cookie';
import { KEYS } from '../../constants';

class Service {
  request = null;

  constructor() {
    this.createRequest();
  }

  createRequest() {
    const token = cookie.get(KEYS.AUTH_TOKEN_KEY);

    if (token) {
      this.request = axios.create({
        baseURL: config.apiURL,
        headers: {
          'Authorization': `Token ${token}`
        }
      });

      return;
    }


    this.request = axios.create({
      baseURL: config.apiURL,
    });
  }
}

export const service = new Service();